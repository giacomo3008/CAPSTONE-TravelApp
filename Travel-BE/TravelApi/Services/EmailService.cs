using FluentEmail.Core;
using TravelApi.DTOs.Email;
using TravelApi.Data;
using Microsoft.EntityFrameworkCore;

namespace TravelApi.Services;

public class EmailService
{
    private readonly IFluentEmail _fluentEmail;
    private readonly ILogger<ListingService> _logger;

    private readonly ApplicationDbContext _context;


    public EmailService(ApplicationDbContext context, IFluentEmail fluentEmail, ILogger<ListingService> logger)
    {
        _fluentEmail = fluentEmail;
        _logger = logger;
        _context = context;
    }

    private async Task<bool> SaveAsync()
    {
        try
        {
            var rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected > 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il salvataggio dei dati nel database.");
            return false;
        }
    }

    public async Task<bool> SendEmail(BookingDto bookingDto)
    {
        try
        {
            var result = await _fluentEmail
                .To(bookingDto.RecipientEmail)
                .Subject("Booking Summary")
                .UsingTemplateFromFile("Views/Templates/EmailTemplate.cshtml", bookingDto)
                .SendAsync();

            _logger.LogInformation("--------------------RESULT------------------------------:  " + result.Successful);
            if (result.Successful)
            {
                var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == bookingDto.CartItemId);
                cartItem.isBooked = true;
                return await SaveAsync();
            }
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante l'invio dell'email.");
            return false;
        }
    }

}