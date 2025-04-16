using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class City
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Description { get; set; }

        // Country
        [Required]
        public Guid CountryId { get; set; }

        [ForeignKey("CountryId")]
        public Country Country { get; set; }


        // Experience Type (e.g., Cultural, Adventure...)
        [Required]
        public Guid ExperienceTypeId { get; set; }

        [ForeignKey("ExperienceTypeId")]
        public ExperienceType ExperienceType { get; set; }


        [InverseProperty("City")]
        public ICollection<ListingDescription> ListingDescriptions { get; set; }
    }

}
