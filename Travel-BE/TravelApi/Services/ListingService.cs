using TravelApi.Data;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TravelApi.Services
{
    public class ListingService
    {
        private readonly ApplicationDbContext _context;

        public ListingService(ApplicationDbContext context)
        {
            _context = context;
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
    }
}
