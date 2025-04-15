using System.ComponentModel.DataAnnotations;

namespace TravelApi.DTOs
{
    public class TravelApi
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [StringLength(25)]
        public required string Name { get; set; }
        [Required]
        [StringLength(25)]
        public required string City { get; set; }
    }
}
