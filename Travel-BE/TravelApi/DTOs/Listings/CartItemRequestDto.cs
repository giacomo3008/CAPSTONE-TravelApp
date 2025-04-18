using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class CartItemRequestDto
    {
        public required int NumberOfPeople { get; set; }
        public required DateOnly StartDate { get; set; }
        public required DateOnly EndDate { get; set; }
    }
}
