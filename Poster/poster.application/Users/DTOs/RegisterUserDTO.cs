using System.ComponentModel.DataAnnotations;

namespace poster.application.Users.DTOs
{
    public class RegisterUserDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Niepoprawny adres email.")]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$", ErrorMessage = "Hasło musi być skomplikowane.")]
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
    }
}
