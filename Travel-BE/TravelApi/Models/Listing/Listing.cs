using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models.Auth;

namespace TravelApi.Models
{
    public class Listing
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string HotelName { get; set; }

        [Required]
        public List<string>? ImgUrls { get; set; }

        [Required]
        public Guid DescriptionId { get; set; }

        public string? UserId { get; set; }

        [ForeignKey("DescriptionId")]
        public ListingDescription Description { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser? User { get; set; }

        [InverseProperty("Listing")]
        public ICollection<CartItem> CartItems { get; set; }

        public ICollection<UserListingFavorites>? UserListingsFavorites { get; set; }
    }

}
