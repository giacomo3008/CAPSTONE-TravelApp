using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace TravelApi.Models.Auth;

public class UserListingFavorites
{
    [Key]
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public Guid ListingId { get; set; }

    [ForeignKey(nameof(ListingId))]
    [InverseProperty("UserListingsFavorites")]
    public Listing Listing { get; set; }
    [ForeignKey(nameof(UserId))]
    public ApplicationUser User { get; set; }
}
