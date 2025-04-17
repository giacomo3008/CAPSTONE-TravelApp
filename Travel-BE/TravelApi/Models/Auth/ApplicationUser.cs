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

    public Guid CartItemId { get; set; }

    [ForeignKey("CartItemId")]
    public CartItem? CartItem { get; set; }

    public ICollection<ApplicationUserRole> UserRoles { get; set; }

    public ICollection<UserListing>? UserListings { get; set; }

    public ICollection<UserListingFavorites>? UserListingsFavorites { get; set; }


}