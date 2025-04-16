using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class ListingDescriptionDto
    {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Beds { get; set; }
        public int Capacity { get; set; }
        public double PricePerNight { get; set; }
        public PropertyTypeDto PropertyType { get; set; }
        public CityDto City { get; set; }

        public ListingDto? Listing { get; set; }
    }
}
