using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelApi.Models
{
    public class Country
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? ImgUrl { get; set; }

        [InverseProperty("Country")]
        public ICollection<City>? Cities { get; set; }
    }

}
