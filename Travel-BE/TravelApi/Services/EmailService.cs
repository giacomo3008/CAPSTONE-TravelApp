using FluentEmail.Core;
using TravelApi.DTOs.Email;

namespace TravelApi.Services;

public class EmailService
{
    private readonly IFluentEmail _fluentEmail;
    private readonly ILogger<ListingService> _logger;


    public EmailService(IFluentEmail fluentEmail, ILogger<ListingService> logger)
    {
        _fluentEmail = fluentEmail;
        _logger = logger;
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
            return result.Successful;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante l'invio dell'email.");
            return false;
        }
    }

}