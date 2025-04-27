using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace TravelApi.Services
{
    public class CityService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CityService> _logger;

        public CityService(ApplicationDbContext context, ILogger<CityService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<City>?> GetAllCitiesAsync()
        {
            try
            {
                return await _context.Cities.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero di tutte le città.");
                return null;
            }
        }

        public async Task<List<City>?> GetSuggestedCitiesAsync()
        {
            try
            {
                var suggestedCities = new List<string> { "Pechino", "Roma", "Barcellona", "Parigi", "Londra", "Kyoto" };

                var cities = await _context.Cities
                    .Include(c => c.Country)
                    .Include(c => c.ExperienceType)
                    .Where(c => suggestedCities.Contains(c.Name))
                    .ToListAsync();

                var ordered = suggestedCities
                    .SelectMany(name => cities.Where(c => c.Name == name))
                    .ToList();

                return ordered;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero delle città suggerite.");
                return null;
            }
        }

        public async Task<City?> GetCityByNameAsync(string name, int? budget)
        {
            try
            {
                var city = await _context.Cities.Include(c => c.Country)
                        .Include(c => c.ExperienceType)
                        .Include(c => c.ListingDescriptions)
                            .ThenInclude(ld => ld.Listing)
                                .ThenInclude(l => l.UserListingsFavorites)
                        .Include(c => c.ListingDescriptions)
                            .ThenInclude(ld => ld.PropertyType)
                        .Where(c => c.Name == name)
                        .FirstOrDefaultAsync();

                if (city != null && budget.HasValue)
                {
                    city.ListingDescriptions = city.ListingDescriptions
                        .Where(ld => ld.PricePerNight <= budget.Value)
                        .ToList();
                }

                return city;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero della città con nome {CityName}.", name);
                return null;
            }
        }
    }
}
