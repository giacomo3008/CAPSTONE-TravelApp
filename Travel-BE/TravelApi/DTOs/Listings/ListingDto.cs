using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.DTOs.Account;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class ListingDto
    {

        public Guid Id { get; set; }
        public required string HotelName { get; set; }
        public List<string>? ImgUrls { get; set; }
        public ListingDescriptionDto Description { get; set; }
        public UserInfoDto? User { get; set; }

        public bool? isUserListingFavorites { get; set; }
    }
}
