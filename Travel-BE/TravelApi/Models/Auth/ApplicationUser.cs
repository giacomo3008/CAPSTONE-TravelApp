using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models.Auth;

public class ApplicationUser : IdentityUser
{
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<CartItem>? CartItems { get; set; }

    public ICollection<ApplicationUserRole> UserRoles { get; set; }

    public ICollection<UserListing>? UserListings { get; set; }

    public ICollection<UserListingFavorites>? UserListingsFavorites { get; set; }


}