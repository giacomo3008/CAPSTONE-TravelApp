using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class CartItemDto
    {
        public required Guid Id { get; set; }
        public required ListingDto Listing { get; set; }
        public required int NumberOfPeople { get; set; }
        public required DateOnly StartDate { get; set; }
        public required DateOnly EndDate { get; set; }
    }
}
