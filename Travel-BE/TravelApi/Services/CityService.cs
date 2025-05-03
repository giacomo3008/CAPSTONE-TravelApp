using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TravelApi.DTOs.Listings;

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

        public async Task<bool> AddCityAsync(ListingRequestDto listingRequestDto)
        {
            try
            {
                Country country;
                City cityToAdd;
                var cityExist = await _context.Cities.FirstOrDefaultAsync(c => c.Name == listingRequestDto.City);
                if (cityExist != null)
                {
                    return false;
                }

                if (!string.IsNullOrWhiteSpace(listingRequestDto.CountryName))
                {
                    var resultCountryAdded = await AddNewCountryAsync(listingRequestDto);
                    if (!resultCountryAdded)
                    {
                        return false;
                    }
                    else
                    {
                        country = await _context.Countries.FirstOrDefaultAsync(c => c.Name == listingRequestDto.CountryName);
                        if (country == null)
                        {
                            return false;
                        }

                        var experienceType = await _context.ExperienceTypes.FirstOrDefaultAsync(et => et.Name == listingRequestDto.ExperienceType);
                        if (experienceType == null)
                        {
                            return false;
                        }
                        cityToAdd = new City()
                        {
                            Id = Guid.NewGuid(),
                            Name = listingRequestDto.City,
                            Description = listingRequestDto.CityDescription,
                            CountryId = country.Id,
                            ExperienceTypeId = experienceType.Id,
                        };

                    }
                }
                else
                {
                    country = await _context.Countries.FirstOrDefaultAsync(c => c.Name == listingRequestDto.Country);
                    if (country == null)
                    {
                        return false;
                    }

                    var experienceType = await _context.ExperienceTypes.FirstOrDefaultAsync(et => et.Name == listingRequestDto.ExperienceType);
                    if (experienceType == null)
                    {
                        return false;
                    }
                    cityToAdd = new City()
                    {
                        Id = Guid.NewGuid(),
                        Name = listingRequestDto.City,
                        Description = listingRequestDto.CityDescription,
                        CountryId = country.Id,
                        ExperienceTypeId = experienceType.Id,
                    };
                }

                _context.Cities.Add(cityToAdd);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la creazione della città");
                return false;
            }
        }

        public async Task<bool> AddNewCountryAsync(ListingRequestDto listingRequestDto)
        {
            try
            {
                var countryExist = await _context.Countries.FirstOrDefaultAsync(c => c.Name == listingRequestDto.CountryName);
                if (countryExist != null)
                {
                    return false;
                }
                var countryToAdd = new Country()
                {
                    Id = Guid.NewGuid(),
                    Name = listingRequestDto.CountryName,
                    ImgUrl = listingRequestDto?.CountryImg,
                };

                _context.Countries.Add(countryToAdd);
                return await SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la creazione del Country");
                return false;
            }
        }
    }
}
