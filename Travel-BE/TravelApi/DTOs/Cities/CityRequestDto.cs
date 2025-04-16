using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;
using TravelApi.DTOs.Listings;

namespace TravelApi.DTOs.Cities
{
    public class CityRequestDto
    {
        public Guid? Id { get; set; }

        public required string Name { get; set; }

        public required string? Description { get; set; }

        public CountryDto? Country { get; set; }

        public ExperienceTypeDto? ExperienceType { get; set; }

        [InverseProperty("City")]
        public ICollection<ListingDescriptionDto>? ListingDescriptions { get; set; }

    }
}
