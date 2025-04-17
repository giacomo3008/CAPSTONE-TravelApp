using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TravelApi.DTOs.Listings;
using TravelApi.Models.Auth;
using Microsoft.AspNetCore.Identity;

namespace TravelApi.Services
{
    public class ListingService
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;

        public ListingService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private async Task<bool> SaveAsync()
        {
            var rowsAffected = await _context.SaveChangesAsync();

            if (rowsAffected > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<List<Listing>?> GetAllListingsAsync()
        {
            return await _context.Listings.Include(l => l.Description)
                                                .ThenInclude(d => d.PropertyType)
                                            .Include(l => l.Description)
                                                .ThenInclude(d => d.City)
                                                    .ThenInclude(c => c.Country)
                                            .Include(l => l.Description)
                                                .ThenInclude(d => d.City)
                                                    .ThenInclude(c => c.ExperienceType)
                                            .ToListAsync();
        }

        public async Task<Listing?> GetListingByIdAsync(Guid id)
        {
            return await _context.Listings.Include(l => l.Description)
                                                .ThenInclude(d => d.PropertyType)
                                            .Include(l => l.Description)
                                                .ThenInclude(d => d.City)
                                                    .ThenInclude(c => c.Country)
                                            .Include(l => l.Description)
                                                .ThenInclude(d => d.City)
                                                    .ThenInclude(c => c.ExperienceType).FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<bool> AddListingAsync(ListingRequestDto listingRequestDto, ClaimsPrincipal userPrincipal)
        {
            // Trova l'utente usando l'email contenuta nei Claims
            var user = await _userManager.FindByEmailAsync(userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value);
            if (user == null)
            {
                return false; // L'utente non è stato trovato
            }

            // Trova la città e il tipo di proprietà che l'utente ha selezionato tramite Dto
            var city = await _context.Cities
                .FirstOrDefaultAsync(c => c.Name == listingRequestDto.City);
            if (city == null)
            {
                return false; // La città non è stata trovata
            }

            var propertyType = await _context.PropertyTypes
                .FirstOrDefaultAsync(pt => pt.Name == listingRequestDto.PropertyType);
            if (propertyType == null)
            {
                return false; // Tipo di proprietà non trovato
            }

            // Crea la ListingDescription
            var listingDescription = new ListingDescription
            {
                Id = Guid.NewGuid(),
                Description = listingRequestDto.Description,
                Beds = listingRequestDto.Beds,
                Capacity = listingRequestDto.Capacity,
                PricePerNight = listingRequestDto.PricePerNight,
                PropertyTypeId = propertyType.Id,
                CityId = city.Id
            };

            // Aggiungi la ListingDescription al contesto per salvarla
            _context.ListingDescriptions.Add(listingDescription);
            if (!await SaveAsync())
            {
                return false;
            }

            // Ora crea la Listing
            var listing = new Listing
            {
                Id = Guid.NewGuid(),
                HotelName = listingRequestDto.HotelName,
                ImgUrls = listingRequestDto.ImgUrls ?? new List<string>(), //Se la variabile è null, allora restituisce il valore che sta a destra dell'operatore. In caso contrario, restituisce il valore a sinistra.
                DescriptionId = listingDescription.Id, // Associa la ListingDescription
            };

            // Aggiungi la Listing al contesto
            _context.Listings.Add(listing);
            if (!await SaveAsync())
            {
                return false;
            }

            // Aggiungi la relazione User-Listing
            var userListing = new UserListing
            {
                UserId = user.Id,
                ListingId = listing.Id
            };
            _context.UserListings.Add(userListing);
            if (!await SaveAsync())
            {
                return false;
            }

            return true;
        }

        public async Task<bool> AddListingToFavoritesAsync(Guid listingId, ClaimsPrincipal userPrincipal)
        {
            var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (userEmail == null) return false;

            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null) return false;

            var listing = await _context.Listings.FindAsync(listingId);
            if (listing == null) return false;

            // Verifica che non sia già nei preferiti
            bool alreadyFavorited = await _context.UserListingsFavorites
                .AnyAsync(f => f.UserId == user.Id && f.ListingId == listingId);

            if (alreadyFavorited) return false;

            var favorite = new UserListingFavorites
            {
                UserId = user.Id,
                ListingId = listing.Id
            };

            _context.UserListingsFavorites.Add(favorite);
            if (!await SaveAsync())
            {
                return false;
            }

            return true;
        }

        public async Task<ICollection<UserListingFavorites>?> GetFavoritesAsync(ClaimsPrincipal userPrincipal)
        {
            var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            var user = await _userManager.Users
                    .Include(u => u.UserListingsFavorites)
                        .ThenInclude(ulf => ulf.Listing)
                    .FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return null; // L'utente non è stato trovato
            }

            return user.UserListingsFavorites;
        }

    }
}
