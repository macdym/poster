using System.ComponentModel.DataAnnotations;

namespace poster.application.Users.DTOs
{
    public class LoginUserDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
