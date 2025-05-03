using System.Text;
using TravelApi.Data;
using TravelApi.Services;
using Microsoft.EntityFrameworkCore;
using TravelApi.Models.Auth;
using TravelApi.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using FluentEmail.MailKitSmtp;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<Jwt>(builder.Configuration.GetSection(nameof(Jwt)));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddFluentEmail(builder.Configuration.GetSection("MailSettings").GetValue<string>("FromDefault"))
    .AddRazorRenderer()
    .AddMailKitSender(new SmtpClientOptions()
    {
        Server = builder.Configuration.GetSection("MailSettings").GetValue<string>("Server"),
        Port = builder.Configuration.GetSection("MailSettings").GetValue<int>("Port"),
        User = builder.Configuration.GetSection("MailSettings").GetValue<string>("Username"),
        Password = builder.Configuration.GetSection("MailSettings").GetValue<string>("Password"),
        UseSsl = builder.Configuration.GetSection("MailSettings").GetValue<bool>("UseSsl"),
        RequiresAuthentication = builder.Configuration.GetSection("MailSettings").GetValue<bool>("RequiresAuthentication"),
    });
builder.Services.AddScoped<EmailService>();

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
        {
            // Imposta se l'account deve essere confermato via email prima di poter accedere
            options.SignIn.RequireConfirmedAccount =
                builder.Configuration.GetSection("Identity").GetValue<bool>("RequireConfirmedAccount");

            // Imposta la lunghezza minima della password
            options.Password.RequiredLength =
                builder.Configuration.GetSection("Identity").GetValue<int>("RequiredLength");

            // Richiede che la password contenga almeno un numero
            options.Password.RequireDigit =
                builder.Configuration.GetSection("Identity").GetValue<bool>("RequireDigit");

            // Richiede almeno una lettera minuscola nella password
            options.Password.RequireLowercase =
                builder.Configuration.GetSection("Identity").GetValue<bool>("RequireLowercase");

            // Richiede almeno un carattere speciale nella password
            options.Password.RequireNonAlphanumeric =
                builder.Configuration.GetSection("Identity").GetValue<bool>("RequireNonAlphanumeric");

            // Richiede almeno una lettera maiuscola nella password
            options.Password.RequireUppercase =
                builder.Configuration.GetSection("Identity").GetValue<bool>("RequireUppercase");
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            // Indica se il sistema deve validare l'issuer (chi ha generato il token).
            ValidateIssuer = true,

            // Indica se il sistema deve validare l'audience (chi può usare il token).
            ValidateAudience = true,

            // Indica se il sistema deve verificare che il token non sia scaduto.
            ValidateLifetime = true,

            ClockSkew = TimeSpan.Zero,

            // Indica se il sistema deve validare la chiave di firma usata per generare il token.
            ValidateIssuerSigningKey = true,

            // Imposta l'issuer valido (deve corrispondere a quello usato per generare il token).
            ValidIssuer = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Issuer"),

            // Imposta l'audience valida (deve corrispondere a quella prevista per il token).
            ValidAudience = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Audience"),

            // Specifica la chiave segreta usata per firmare il token (deve corrispondere a quella usata per la generazione).
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("SecurityKey")))
        };
    });

builder.Services.AddScoped<ListingService>();
builder.Services.AddScoped<CityService>();

builder.Services.AddScoped<UserManager<ApplicationUser>>();
builder.Services.AddScoped<SignInManager<ApplicationUser>>();
builder.Services.AddScoped<RoleManager<ApplicationRole>>();

var app = builder.Build();

app.UseCors(x =>
    x.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/travel", async (string demo, ApplicationDbContext context) =>
{
    var result = await context.Listings.ToListAsync();

    return Results.Ok(new
    {
        message = "success!",
        customers = result
    });
});

app.Run();

