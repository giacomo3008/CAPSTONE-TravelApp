using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TravelApi.Services
{
    public class CityService
    {
        private readonly ApplicationDbContext _context;

        public CityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<City>?> GetAllCitiesAsync()
        {
            return await _context.Cities.Include(c => c.Country).Include(c => c.ExperienceType).ToListAsync();
        }

        public async Task<City?> GetCityByNameAsync(string name)
        {
            return await _context.Cities.Include(c => c.Country)
            .Include(c => c.ExperienceType)
            .Include(c => c.ListingDescriptions)
                .ThenInclude(ld => ld.Listing)
            .Include(c => c.ListingDescriptions)
                .ThenInclude(ld => ld.PropertyType)
            .FirstOrDefaultAsync(c => c.Name == name);
        }
    }
}
