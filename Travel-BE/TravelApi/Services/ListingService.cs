using TravelApi.Data;
// using TravelApi.DTOs.Customer;
using TravelApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TravelApi.Services
{
    public class TravelApi
    {
        private readonly ApplicationDbContext _context;

        public TravelApi(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
