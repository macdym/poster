using poster.application.Events.DTOs;
using poster.application.Photos.DTOs;
using poster.domain;

namespace poster.application.Users.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public string BackgroundImage { get; set; }
        public string Email { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }
        public ICollection<EventDTO> Aktywnosci { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; }
    }
}
