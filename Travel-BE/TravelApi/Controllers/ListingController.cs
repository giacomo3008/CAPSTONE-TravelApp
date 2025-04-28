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

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllListings()
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id:Guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetListingById(Guid id)
        {
            try
            {
                var listing = await _listingService.GetListingByIdAsync(id);

                if (listing == null)
                {
                    return NotFound();
                }

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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> addListing(ListingRequestDto listingRequestDto)
        {
            try
            {
                var result = await _listingService.AddListingAsync(listingRequestDto, User);

                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Prodotto aggiunto correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetListingsByUser()
        {
            try
            {
                var listings = await _listingService.GetListingByUserAsync(User);

                var listingsDto = listings.Select(li => li.Listing).Select(l => new ListingDto()
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavorites()
        {
            try
            {
                var favorites = await _listingService.GetFavoritesAsync(User);

                var listingsDto = favorites.Select(f => f.Listing).Select(l => new ListingDto()
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{listingId:Guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserByListing(Guid listingId)
        {
            try
            {
                var user = await _listingService.GetUserByListingAsync(listingId);

                if (user == null)
                {
                    return NotFound("user non trovato");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("favorites/{listingId:Guid}")]
        public async Task<IActionResult> AddFavorite(Guid listingId)
        {
            try
            {
                var result = await _listingService.AddListingToFavoritesAsync(listingId, User);
                if (!result)
                    return BadRequest("Impossibile aggiungere ai preferiti.");

                return Ok("Listing aggiunto ai preferiti!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("general/{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GeneralDeleteListing(Guid id)
        {
            try
            {
                var result = await _listingService.DeleteListingAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Prodotto eliminato correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("user/{id:Guid}")]
        public async Task<IActionResult> UserDeleteListing(Guid id)
        {
            try
            {
                var result = await _listingService.DeleteListingAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Prodotto eliminato correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("favorite/{id:Guid}")]
        public async Task<IActionResult> DeleteFavorite(Guid id)
        {
            try
            {
                var result = await _listingService.DeleteFavoriteAsync(id, User);

                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Prodotto eliminato correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cart/{id:Guid}")]
        public async Task<IActionResult> AddToCart(Guid id, CartItemRequestDto cartItemRequestDto)
        {
            try
            {
                var result = await _listingService.AddToCartAsync(id, User, cartItemRequestDto);
                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Prodotto aggiunto al carrello correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            try
            {
                var cartItems = await _listingService.GetCartAsync(User);
                if (cartItems == null)
                {
                    return NotFound("Carrello vuoto");
                }

                var cartItemsDto = cartItems.Select(cartItem => new CartItemDto()
                {
                    NumberOfPeople = cartItem.NumberOfPeople,
                    StartDate = cartItem.StartDate,
                    EndDate = cartItem.EndDate,
                    Listing = new ListingDto()
                    {
                        Id = cartItem.Listing.Id,
                        HotelName = cartItem.Listing.HotelName,
                        ImgUrls = cartItem.Listing.ImgUrls,
                        Description = new ListingDescriptionDto()
                        {
                            Id = cartItem.Listing.Description.Id,
                            Description = cartItem.Listing.Description.Description,
                            PricePerNight = cartItem.Listing.Description.PricePerNight,
                            City = new CityDto
                            {
                                Id = cartItem.Listing.Description.City.Id,
                                Name = cartItem.Listing.Description.City.Name,
                            }
                        }
                    }
                }).ToList();

                return Ok(cartItemsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("cart")]
        public async Task<IActionResult> DeleteCart([FromQuery] Guid id)
        {
            try
            {
                var result = await _listingService.DeleteCartAsync(User, id);
                if (!result)
                {
                    return BadRequest(new { message = "Something went wrong" });
                }
                return Ok(new { message = "Carrello svuotato correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("property-type")]
        public async Task<IActionResult> getPropertyType()
        {
            try
            {
                var propertyTypes = await _listingService.getPropertyTypeAsync();

                var propertyTypeDto = propertyTypes.Select(p => new PropertyTypeDto()
                {
                    Id = p.Id,
                    Name = p.Name,
                });

                return Ok(propertyTypeDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> UpdateListing(Guid id, ListingRequestDto updateListingDto)
        {
            try
            {
                var result = await _listingService.UpdateListingAsync(id, updateListingDto);
                if (!result)
                    return BadRequest(new { message = "Aggiornamento non riuscito" });

                return Ok(new { message = "Listing aggiornato correttamente!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
