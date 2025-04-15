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
    }

}
