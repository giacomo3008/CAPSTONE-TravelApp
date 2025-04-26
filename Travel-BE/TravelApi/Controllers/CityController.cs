using TravelApi.Data;
using TravelApi.DTOs.Listings;
using TravelApi.DTOs.Cities;
using TravelApi.Models;
using TravelApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
        public async Task<IActionResult> GetAllCities()
        {
            try
            {
                var cities = await _cityService.GetAllCitiesAsync();

                var citiesDto = cities.Select(c => new CityDto()
                {
                    Id = c.Id,
                    Name = c.Name,
                });

                _logger.LogInformation("Recuperate {Count} città totali.", cities.Count());
                return Ok(citiesDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero di tutte le città.");
                return StatusCode(500, "Errore interno del server.");
            }
        }

        [HttpGet("suggested")]
        public async Task<IActionResult> GetSuggestedCities()
        {
            try
            {
                var cities = await _cityService.GetSuggestedCitiesAsync();

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
                });

                _logger.LogInformation("Recuperate {Count} città suggerite.", cities.Count());
                return Ok(citiesDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero delle città suggerite.");
                return StatusCode(500, "Errore interno del server.");
            }
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCityByName(string name, [FromQuery] int? budget)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    _logger.LogWarning("Nome città non fornito nella richiesta.");
                    return BadRequest("Il nome della città è obbligatorio.");
                }

                var city = await _cityService.GetCityByNameAsync(name, budget);

                if (city == null)
                {
                    _logger.LogWarning("Città '{CityName}' non trovata.", name);
                    return NotFound($"Nessuna città trovata con nome: {name}");
                }

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

                _logger.LogInformation("Recuperata città: {CityName}", city.Name);
                return Ok(cityDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero della città con nome '{CityName}'.", name);
                return StatusCode(500, "Errore interno del server.");
            }
        }
    }
}
