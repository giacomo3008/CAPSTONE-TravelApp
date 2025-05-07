using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelApi.DTOs.Account;
using TravelApi.Models.Auth;
using TravelApi.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using TravelApi.Helpers;


namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Jwt _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private readonly ILogger<ListingController> _logger;


        public AccountController(IOptions<Jwt> jwtOptions, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager, ILogger<ListingController> logger)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("validate")]
        public async Task<IActionResult> ValidateToken()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
                return Unauthorized("Utente non autenticato.");


            return Ok(new { status = "valid" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerRequestDto.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already in use.");
            }

            var roleExist = await _roleManager.RoleExistsAsync("User");
            if (!roleExist)
            {
                return BadRequest("non esiste il ruolo user");
            }

            var newUser = new ApplicationUser
            {
                Email = registerRequestDto.Email,
                UserName = registerRequestDto.Email,
                FirstName = registerRequestDto.FirstName,
                LastName = registerRequestDto.LastName,
                ColorProfile = HelperFunctions.GenerateRandomColor(),
            };

            var result = await _userManager.CreateAsync(newUser, registerRequestDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description)); // Mostra errori dettagliati
            }

            // Assicurati che l'utente sia stato salvato nel database prima di aggiungere il ruolo
            var user = await _userManager.FindByEmailAsync(registerRequestDto.Email);
            if (user == null)
            {
                return BadRequest("User creation failed.");
            }

            IdentityResult addRoleResult;
            if (registerRequestDto.Email == "giacomorigo7@gmail.com")
            {
                addRoleResult = await _userManager.AddToRoleAsync(user, "Admin");
            }
            else if (registerRequestDto.Email == "giacomorigo007@gmail.com")
            {
                await _userManager.AddToRoleAsync(user, "User");
                addRoleResult = await _userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
                addRoleResult = await _userManager.AddToRoleAsync(user, "User");
            }

            if (!addRoleResult.Succeeded)
            {
                return BadRequest(addRoleResult.Errors);
            }

            return Ok(new { message = "User registered successfully" });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);
            if (user == null)
            {
                return BadRequest();
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginRequestDto.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Email o password non validi." });
            }

            var roles = await _signInManager.UserManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim("firstName", user.FirstName));
            claims.Add(new Claim("lastName", user.LastName));
            claims.Add(new Claim("createdAt", user.CreatedAt.ToString("o")));
            claims.Add(new Claim("colorString", user.ColorProfile));
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new TokenResponse()
            {
                Token = tokenString,
                Expires = expiry
            });
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("Utente non autenticato.");

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
                return NotFound("Utente non trovato.");

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Utente eliminato");
        }

        [HttpDelete("{email}")]
        [Authorize]
        public async Task<IActionResult> DeleteAccountByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound("Utente non trovato.");

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Utente eliminato");
        }


        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _userManager.Users.Include(u => u.Listings).ToList();

            var userInfoList = new List<UserInfoDto>();

            foreach (var user in users)
            {
                var roles = await _signInManager.UserManager.GetRolesAsync(user);
                var listingsCount = user.Listings?.Count ?? 0; //se non ci sono listings associate ritorna 0

                userInfoList.Add(new UserInfoDto
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    CreatedAt = user.CreatedAt,
                    ColorString = user.ColorProfile,
                    Roles = roles.ToList(),
                    ListingsCount = listingsCount
                });
            }

            return Ok(userInfoList);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserInfo(string email)
        {
            var user = await _userManager.Users.Include(u => u.Listings).FirstOrDefaultAsync(u => u.Email == email);

            var roles = await _signInManager.UserManager.GetRolesAsync(user);
            var listingsCount = user.Listings?.Count ?? 0; //se non ci sono listings associate ritorna 0

            var userInfo = new UserInfoDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CreatedAt = user.CreatedAt,
                ColorString = user.ColorProfile,
                Roles = roles.ToList(),
                ListingsCount = listingsCount
            };
            return Ok(userInfo);
        }

    }
}
