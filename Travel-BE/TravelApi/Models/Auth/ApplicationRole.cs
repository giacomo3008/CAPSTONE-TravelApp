using Microsoft.AspNetCore.Identity;

namespace TravelApi.Models.Auth;

public class ApplicationRole : IdentityRole
{
    public ICollection<ApplicationUserRole> UserRoles { get; set; }
}