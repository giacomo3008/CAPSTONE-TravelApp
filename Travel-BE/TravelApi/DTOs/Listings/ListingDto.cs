using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class ListingDto
    {

        public Guid Id { get; set; }
        public required string HotelName { get; set; }
        public List<string>? ImgUrls { get; set; }
        public ListingDescriptionDto Description { get; set; }
    }
}
