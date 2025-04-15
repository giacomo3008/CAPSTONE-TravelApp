using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class ListingDescription
    {
        [Key]
        public Guid Id { get; set; }

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

        // Country
        [Required]
        public Guid CountryId { get; set; }

        [ForeignKey("CountryId")]
        public Country Country { get; set; }

        // Continent
        [Required]
        public Guid ContinentId { get; set; }

        [ForeignKey("ContinentId")]
        public Continent Continent { get; set; }

        // Experience Type (e.g., Cultural, Adventure...)
        [Required]
        public Guid ExperienceTypeId { get; set; }

        [ForeignKey("ExperienceTypeId")]
        public ExperienceType ExperienceType { get; set; }

    }
}
