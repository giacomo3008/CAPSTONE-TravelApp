using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class ListingDescription
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Description { get; set; }

        [Required]
        [Range(1, 50)]
        public int Beds { get; set; }

        [Required]
        [Range(1, 100)]
        public int Capacity { get; set; }

        [Required]
        [Range(1, 50000)]
        public double PricePerNight { get; set; }

        // Property Type (e.g., Apartment, Villa...)
        [Required]
        public Guid PropertyTypeId { get; set; }

        [ForeignKey("PropertyTypeId")]
        public PropertyType PropertyType { get; set; }

        // City
        [Required]
        public Guid CityId { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }

        public Listing Listing { get; set; }

    }
}
