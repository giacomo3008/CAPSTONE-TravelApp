using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public Guid DescriptionId { get; set; }

        [ForeignKey("DescriptionId")]
        public ListingDescription Description { get; set; }

    }
}
