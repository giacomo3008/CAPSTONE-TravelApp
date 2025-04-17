using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class ListingRequestDto
    {
        public required string HotelName { get; set; }
        public List<string>? ImgUrls { get; set; }
        public required string Description { get; set; }
        public required int Beds { get; set; }
        public required int Capacity { get; set; }
        public required double PricePerNight { get; set; }
        public required string City { get; set; }
        public required string PropertyType { get; set; }
        public string? CityDescription { get; set; }
        public string? Country { get; set; }
        public string? ExperienceType { get; set; }
    }
}
