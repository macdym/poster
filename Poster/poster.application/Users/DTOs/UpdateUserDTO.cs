using System.ComponentModel.DataAnnotations;

namespace poster.application.Users.DTOs
{
    public class UpdateUserDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Bio { get; set; }
    }
}
