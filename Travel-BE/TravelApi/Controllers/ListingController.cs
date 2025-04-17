using TravelApi.Data;
using TravelApi.DTOs.Listings;
using TravelApi.Models;
using TravelApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ListingController : ControllerBase
    {
        private readonly ListingService _listingService;

        public ListingController(ListingService listingService)
        {
            _listingService = listingService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllListings()
        {
            var listings = await _listingService.GetAllListingsAsync();

            var listingsDto = listings.Select(l => new ListingDto()
            {
                Id = l.Id,
                HotelName = l.HotelName,
                ImgUrls = l.ImgUrls,
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

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetListingById(Guid id)
        {
            var listing = await _listingService.GetListingByIdAsync(id);

            var listingDto = new ListingDto()
            {
                Id = listing.Id,
                HotelName = listing.HotelName,
                ImgUrls = listing.ImgUrls,
                Description = new ListingDescriptionDto()
                {
                    Id = listing.Description.Id,
                    Description = listing.Description.Description,
                    Beds = listing.Description.Beds,
                    Capacity = listing.Description.Capacity,
                    PricePerNight = listing.Description.PricePerNight,
                    PropertyType = new PropertyTypeDto()
                    {
                        Id = listing.Description.PropertyType.Id,
                        Name = listing.Description.PropertyType.Name,
                    },
                    City = new CityDto()
                    {
                        Id = listing.Description.City.Id,
                        Name = listing.Description.City.Name,
                        Description = listing.Description.City.Description,
                        Country = new CountryDto()
                        {
                            Id = listing.Description.City.Country.Id,
                            Name = listing.Description.City.Country.Name,
                            ImgUrl = listing.Description.City.Country.ImgUrl,
                        },
                        ExperienceType = new ExperienceTypeDto()
                        {
                            Id = listing.Description.City.ExperienceType.Id,
                            Name = listing.Description.City.ExperienceType.Name,
                            Icon = listing.Description.City.ExperienceType.Icon,
                        }
                    }
                }
            };

            return Ok(listingDto);
        }

        [HttpPost]
        public async Task<IActionResult> addListing(ListingRequestDto listingRequestDto)
        {
            var result = await _listingService.AddListingAsync(listingRequestDto, User);

            if (!result)
            {
                return BadRequest(new { message = "Something went wrong" });
            }
            return Ok(new { message = "Prodotto aggiunto correttamente!" });
        }

        [HttpPost("favorites/{listingId:Guid}")]
        [Authorize]
        public async Task<IActionResult> AddFavorite(Guid listingId)
        {
            var result = await _listingService.AddListingToFavoritesAsync(listingId, User);
            if (!result)
                return BadRequest("Impossibile aggiungere ai preferiti.");

            return Ok("Listing aggiunto ai preferiti!");
        }



        [HttpGet("favorites")]
        [Authorize]
        public async Task<IActionResult> GetFavorites()
        {

            var favorites = await _listingService.GetFavoritesAsync(User);

            var listingsDto = favorites.Select(f => f.Listing).Select(l => new ListingDto()
            {
                Id = l.Id,
                HotelName = l.HotelName,
                ImgUrls = l.ImgUrls,
            });

            return Ok(listingsDto);
        }
    }
}
