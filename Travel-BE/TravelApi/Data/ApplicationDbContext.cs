using Microsoft.EntityFrameworkCore;
using TravelApi.Models;
using TravelApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TravelApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
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


        //Auth
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<ApplicationRole> ApplicationRoles { get; set; }

        public DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }

        public DbSet<UserListing> UserListings { get; set; }

        public DbSet<UserListingFavorites> UserListingsFavorites { get; set; }

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

            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(a => a.ApplicationUser).WithMany(u => u.UserRoles).HasForeignKey(a => a.UserId);

            modelBuilder.Entity<ApplicationUserRole>().HasOne(a => a.ApplicationRole).WithMany(r => r.UserRoles).HasForeignKey(a => a.RoleId);

            modelBuilder.Entity<UserListing>().HasOne(ul => ul.User).WithMany(u => u.UserListings).HasForeignKey(a => a.UserId);

            modelBuilder.Entity<UserListing>().HasOne(ul => ul.Listing).WithMany(u => u.UserListings).HasForeignKey(a => a.ListingId);

            modelBuilder.Entity<UserListingFavorites>().HasOne(ul => ul.User).WithMany(u => u.UserListingsFavorites).HasForeignKey(a => a.UserId);

            modelBuilder.Entity<UserListingFavorites>().HasOne(ul => ul.Listing).WithMany(u => u.UserListingsFavorites).HasForeignKey(a => a.ListingId);
        }
    }
}
