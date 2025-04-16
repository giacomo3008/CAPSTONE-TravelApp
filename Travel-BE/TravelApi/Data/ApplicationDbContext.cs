using Microsoft.EntityFrameworkCore;
using TravelApi.Models;

namespace TravelApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Listings e relazionati
        public DbSet<Listing> Listings { get; set; }
        public DbSet<ListingDescription> ListingDescriptions { get; set; }

        // Luoghi
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }

        // Tipologie
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<ExperienceType> ExperienceTypes { get; set; }

        // Carrello
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Listing - ListingDescription: One-to-One
            modelBuilder.Entity<Listing>()
                .HasOne(l => l.Description)
                .WithOne(d => d.Listing)
                .HasForeignKey<Listing>(l => l.DescriptionId)
                .OnDelete(DeleteBehavior.Cascade);

            // ListingDescription - PropertyType: Many-to-One
            modelBuilder.Entity<ListingDescription>()
                .HasOne(ld => ld.PropertyType)
                .WithMany(pt => pt.ListingDescriptions)
                .HasForeignKey(ld => ld.PropertyTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            // ListingDescription - City: Many-to-One
            modelBuilder.Entity<ListingDescription>()
                .HasOne(ld => ld.City)
                .WithMany(c => c.ListingDescriptions)
                .HasForeignKey(ld => ld.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            // City - Country: Many-to-One
            modelBuilder.Entity<City>()
                .HasOne(c => c.Country)
                .WithMany(cn => cn.Cities)
                .HasForeignKey(c => c.CountryId)
                .OnDelete(DeleteBehavior.Restrict);

            // City - ExperienceType: Many-to-One
            modelBuilder.Entity<City>()
                .HasOne(c => c.ExperienceType)
                .WithMany(et => et.Cities)
                .HasForeignKey(c => c.ExperienceTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            // CartItem → Listing (molti-a-uno)
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Listing)
                .WithMany(l => l.CartItems)
                .HasForeignKey(ci => ci.ListingId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
