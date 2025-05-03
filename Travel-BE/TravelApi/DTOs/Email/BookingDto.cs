using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Email
{
    public class BookingDto
    {
        public required string RecipientEmail { get; set; }
        public required string HotelName { get; set; }
        public string? ImgUrl { get; set; }
        public required string Description { get; set; }
        public required int Beds { get; set; }
        public required int NumberOfPeople { get; set; }
        public required string StartDate { get; set; }
        public required string EndDate { get; set; }
        public required double TotPrice { get; set; }
        public required string City { get; set; }
        public required string PropertyType { get; set; }
        public string Country { get; set; }
        public string ExperienceType { get; set; }
        public string? HostName { get; set; }
    }
}
