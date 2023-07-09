using System.ComponentModel.DataAnnotations;

namespace poster.application.Users.DTOs
{
    public class ChangePasswordDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$", ErrorMessage = "Hasło musi być skomplikowane.")]
        public string NewPassword { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
    }
}
