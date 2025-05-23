using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class PropertyType
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [InverseProperty("PropertyType")]
        public ICollection<ListingDescription> ListingDescriptions { get; set; }
    }

}
