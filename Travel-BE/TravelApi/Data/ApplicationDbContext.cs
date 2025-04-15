using TravelApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TravelApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Listing> Listings { get; set; }
    }
}
