using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class ExperienceTypeDto
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public string? Icon { get; set; }

    }
}