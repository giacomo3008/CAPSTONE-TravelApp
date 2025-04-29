using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TravelApi.DTOs.Listings;
using TravelApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TravelApi.Services
{
    public class ListingService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<ListingService> _logger;

        public ListingService(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ILogger<ListingService> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        private async Task<bool> SaveAsync()
        {
            try
            {
                var rowsAffected = await _context.SaveChangesAsync();
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il salvataggio dei dati nel database.");
                return false;
            }
        }

        public async Task<List<Listing>?> GetAllListingsAsync()
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero di tutte le listing.");
                return null;
            }
        }

        public async Task<Listing?> GetListingByIdAsync(Guid id)
        {
            try
            {
                return await _context.Listings.Include(l => l.Description)
                                              .ThenInclude(d => d.PropertyType)
                                          .Include(l => l.Description)
                                              .ThenInclude(d => d.City)
                                                  .ThenInclude(c => c.Country)
                                          .Include(l => l.Description)
                                              .ThenInclude(d => d.City)
                                                  .ThenInclude(c => c.ExperienceType)
                                          .FirstOrDefaultAsync(l => l.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero della listing per id {ListingId}.", id);
                return null;
            }
        }

        public async Task<bool> AddListingAsync(ListingRequestDto listingRequestDto, ClaimsPrincipal userPrincipal)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value);
                if (user == null) return false;

                var city = await _context.Cities.FirstOrDefaultAsync(c => c.Name == listingRequestDto.City);
                if (city == null) return false;

                var propertyType = await _context.PropertyTypes.FirstOrDefaultAsync(pt => pt.Name == listingRequestDto.PropertyType);
                if (propertyType == null) return false;

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

                _context.ListingDescriptions.Add(listingDescription);
                if (!await SaveAsync()) return false;

                var listing = new Listing
                {
                    Id = Guid.NewGuid(),
                    HotelName = listingRequestDto.HotelName,
                    ImgUrls = listingRequestDto.ImgUrls ?? new List<string>(),
                    DescriptionId = listingDescription.Id
                };

                _context.Listings.Add(listing);
                if (!await SaveAsync()) return false;

                var userListing = new UserListing
                {
                    UserId = user.Id,
                    ListingId = listing.Id
                };

                _context.UserListings.Add(userListing);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'aggiunta di una nuova listing.");
                return false;
            }
        }

        public async Task<bool> AddListingToFavoritesAsync(Guid listingId, ClaimsPrincipal userPrincipal)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (userEmail == null) return false;
                _logger.LogInformation("Email trovata");

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
                if (user == null) return false;
                _logger.LogInformation("User trovato");

                var listing = await _context.Listings.FindAsync(listingId);
                if (listing == null) return false;
                _logger.LogInformation("Listing trovata");

                bool alreadyFavorited = await _context.UserListingsFavorites.AnyAsync(f => f.UserId == user.Id && f.ListingId == listingId);
                if (alreadyFavorited)
                {
                    _logger.LogInformation("Listing già presente nei favorites");
                    return false;
                }

                var favorite = new UserListingFavorites
                {
                    UserId = user.Id,
                    ListingId = listing.Id
                };
                _logger.LogInformation("creata istanza UserListingFavorite");

                _context.UserListingsFavorites.Add(favorite);
                _logger.LogInformation("Aggiunta favorite");
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'aggiunta della listing ai preferiti.");
                return false;
            }
        }

        public async Task<ICollection<UserListing>?> GetListingByUserAsync(ClaimsPrincipal userPrincipal)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                var user = await _userManager.Users
                        .Include(u => u.UserListings)
                            .ThenInclude(ul => ul.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.PropertyType)
                        .Include(u => u.UserListings)
                            .ThenInclude(ul => ul.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.City)
                                        .ThenInclude(c => c.ExperienceType)
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                return user?.UserListings;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero delle listing per utente.");
                return null;
            }
        }

        public async Task<ICollection<UserListingFavorites>?> GetFavoritesAsync(ClaimsPrincipal userPrincipal)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                var user = await _userManager.Users
                        .Include(u => u.UserListingsFavorites)
                            .ThenInclude(ulf => ulf.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.PropertyType)
                        .Include(u => u.UserListingsFavorites)
                            .ThenInclude(ulf => ulf.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.City)
                                        .ThenInclude(c => c.ExperienceType)
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                return user?.UserListingsFavorites;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero dei preferiti dell'utente.");
                return null;
            }
        }

        public async Task<ApplicationUser?> GetUserByListingAsync(Guid id)
        {
            try
            {
                return await _context.UserListings
                    .Where(ul => ul.ListingId == id)
                    .Include(ul => ul.User)
                    .Select(ul => ul.User)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero dell'utente per la listing {ListingId}.", id);
                return null;
            }
        }

        public async Task<bool> DeleteListingAsync(Guid id)
        {
            try
            {
                var listing = await GetListingByIdAsync(id);
                var listingDescription = listing.Description;
                if (listing == null) return false;

                _context.ListingDescriptions.Remove(listingDescription);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'eliminazione della listing {ListingId}.", id);
                return false;
            }
        }

        public async Task<bool> DeleteFavoriteAsync(Guid id, ClaimsPrincipal userPrincipal)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (userEmail == null) return false;

                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null) return false;

                var favoriteToDelete = await _context.UserListingsFavorites
                    .FirstOrDefaultAsync(ulf => ulf.UserId == user.Id && ulf.ListingId == id);

                if (favoriteToDelete == null) return false;

                _context.UserListingsFavorites.Remove(favoriteToDelete);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'eliminazione del preferito.");
                return false;
            }
        }

        public async Task<bool> AddToCartAsync(Guid id, ClaimsPrincipal userPrincipal, CartItemRequestDto cartItemRequestDto)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (userEmail == null) return false;

                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null) return false;

                var cartItem = new CartItem
                {
                    Id = Guid.NewGuid(),
                    ListingId = id,
                    NumberOfPeople = cartItemRequestDto.NumberOfPeople,
                    StartDate = cartItemRequestDto.StartDate,
                    EndDate = cartItemRequestDto.EndDate,
                    UserId = user.Id
                };

                _context.CartItems.Add(cartItem);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'aggiunta di una listing al carrello.");
                return false;
            }
        }

        public async Task<ICollection<CartItem?>> GetCartAsync(ClaimsPrincipal userPrincipal)
        {
            try
            {
                var userEmail = userPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                var user = await _userManager.Users
                        .Include(u => u.CartItems)
                            .ThenInclude(ci => ci.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.City)
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                return user?.CartItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero del carrello.");
                return null;
            }
        }

        public async Task<CartItem?> GetCartItemAsync(Guid id)
        {
            try
            {
                return await _context.CartItems
                            .Include(ci => ci.Listing)
                                .ThenInclude(l => l.Description)
                                    .ThenInclude(d => d.PropertyType)
                            .FirstOrDefaultAsync(ci => ci.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero del carrello.");
                return null;
            }
        }

        public async Task<bool> DeleteCartAsync(ClaimsPrincipal user, Guid cartItemId)
        {
            try
            {
                var userEmail = user.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail)) return false;

                var currentUser = await _userManager.Users
                    .Include(u => u.CartItems)
                    .FirstOrDefaultAsync(u => u.Email == userEmail);

                if (currentUser == null)
                {
                    return false;
                }

                var cartItem = currentUser.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
                if (cartItem == null)
                {
                    return false;
                }

                _context.CartItems.Remove(cartItem);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'eliminazione del carrello.");
                return false;
            }
        }

        public async Task<ICollection<PropertyType>?> getPropertyTypeAsync()
        {
            try
            {
                return await _context.PropertyTypes.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero dei tipi di proprietà.");
                return null;
            }
        }

        public async Task<bool> UpdateListingAsync(Guid id, ListingRequestDto updateDto)
        {
            try
            {
                var listing = await _context.Listings
                    .Include(l => l.Description)
                    .FirstOrDefaultAsync(l => l.Id == id);

                if (listing == null) return false;

                var city = await _context.Cities.FirstOrDefaultAsync(c => c.Name == updateDto.City);
                var propertyType = await _context.PropertyTypes.FirstOrDefaultAsync(p => p.Name == updateDto.PropertyType);

                if (city == null || propertyType == null) return false;

                listing.HotelName = updateDto.HotelName;
                listing.ImgUrls = updateDto.ImgUrls;
                listing.Description.Description = updateDto.Description;
                listing.Description.Beds = updateDto.Beds;
                listing.Description.Capacity = updateDto.Capacity;
                listing.Description.PricePerNight = updateDto.PricePerNight;
                listing.Description.CityId = city.Id;
                listing.Description.PropertyTypeId = propertyType.Id;

                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante l'aggiornamento della listing {ListingId}.", id);
                return false;
            }
        }
    }
}
