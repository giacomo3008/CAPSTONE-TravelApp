using TravelApi.Data;
using TravelApi.DTOs.Listings;
using TravelApi.DTOs.Cities;
using TravelApi.Models;
using TravelApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly CityService _cityService;

        private readonly ILogger<CityController> _logger;

        public CityController(CityService cityService, ILogger<CityController> logger)
        {
            _cityService = cityService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await _cityService.GetAllCitiesAsync();

            var citiesDto = cities.Select(c => new CityDto()
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                Country = new CountryDto()
                {
                    Id = c.Country.Id,
                    Name = c.Country.Name,
                    ImgUrl = c.Country.ImgUrl,
                },
                ExperienceType = new ExperienceTypeDto()
                {
                    Id = c.ExperienceType.Id,
                    Name = c.ExperienceType.Name,
                    Icon = c.ExperienceType.Icon,
                }
            }
            );

            return Ok(citiesDto);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCityByName(string name)
        {
            var city = await _cityService.GetCityByNameAsync(name);

            if (city == null) return NotFound();

            var cityDto = new CityRequestDto()
            {
                Id = city.Id,
                Name = city.Name,
                Description = city.Description,
                Country = new CountryDto()
                {
                    Id = city.Country.Id,
                    Name = city.Country.Name,
                    ImgUrl = city.Country.ImgUrl,
                },
                ExperienceType = new ExperienceTypeDto()
                {
                    Id = city.ExperienceType.Id,
                    Name = city.ExperienceType.Name,
                    Icon = city.ExperienceType.Icon,
                },
                ListingDescriptions = city.ListingDescriptions.Select(ld => new ListingDescriptionDto()
                {
                    Id = ld.Id,
                    Description = ld.Description,
                    Beds = ld.Beds,
                    Capacity = ld.Capacity,
                    PricePerNight = ld.PricePerNight,
                    PropertyType = new PropertyTypeDto()
                    {
                        Id = ld.PropertyType.Id,
                        Name = ld.PropertyType.Name,
                    },
                    Listing = new ListingDto()
                    {
                        Id = ld.Listing.Id,
                        HotelName = ld.Listing.HotelName,
                        ImgUrls = ld.Listing.ImgUrls,
                    }
                }).ToList()
            };

            return Ok(cityDto);
        }
    }
}
