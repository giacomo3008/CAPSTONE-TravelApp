using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class ExperienceType
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? Icon { get; set; }

        [InverseProperty("ExperienceType")]
        public ICollection<City>? Cities { get; set; }

    }


}
