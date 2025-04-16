using TravelApi.Data;
using TravelApi.DTOs.Listings;
using TravelApi.Models;
using TravelApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly ListingService _listingService;

        public ListingController(ListingService listingService)
        {
            _listingService = listingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllListings()
        {
            var listings = await _listingService.GetAllListingsAsync();

            var listingsDto = listings.Select(l => new ListingDto()
            {
                Id = l.Id,
                HotelName = l.HotelName,
                Description = new ListingDescriptionDto()
                {
                    Id = l.Description.Id,
                    Description = l.Description.Description,
                    Beds = l.Description.Beds,
                    Capacity = l.Description.Capacity,
                    PricePerNight = l.Description.PricePerNight,
                    PropertyType = new PropertyTypeDto()
                    {
                        Id = l.Description.PropertyType.Id,
                        Name = l.Description.PropertyType.Name,
                    },
                    City = new CityDto()
                    {
                        Id = l.Description.City.Id,
                        Name = l.Description.City.Name,
                        Description = l.Description.City.Description,
                        Country = new CountryDto()
                        {
                            Id = l.Description.City.Country.Id,
                            Name = l.Description.City.Country.Name,
                            ImgUrl = l.Description.City.Country.ImgUrl,
                        },
                        ExperienceType = new ExperienceTypeDto()
                        {
                            Id = l.Description.City.ExperienceType.Id,
                            Name = l.Description.City.ExperienceType.Name,
                            Icon = l.Description.City.ExperienceType.Icon,
                        }
                    }
                }
            });

            return Ok(listingsDto);
        }
    }
}
