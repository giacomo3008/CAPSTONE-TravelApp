namespace TravelApi.DTOs.Account
{
    public class UserInfoDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> Roles { get; set; }
        public int ListingsCount { get; set; }
    }
}