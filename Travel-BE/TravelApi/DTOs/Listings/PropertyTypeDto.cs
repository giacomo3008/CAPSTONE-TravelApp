using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TravelApi.Models;

namespace TravelApi.DTOs.Listings
{
    public class PropertyTypeDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}