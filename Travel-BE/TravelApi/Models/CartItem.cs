using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class CartItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ListingId { get; set; }

        [ForeignKey(nameof(ListingId))]
        public Listing Listing { get; set; }

        [Required]
        [Range(1, 20)]
        public int NumberOfPeople { get; set; }

        // [Required]
        // public DateOnly StartDate { get; set; }

        // [Required]
        // public DateOnly EndDate { get; set; }
    }
}
