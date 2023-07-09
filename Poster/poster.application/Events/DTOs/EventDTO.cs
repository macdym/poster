using poster.application.Photos.DTOs;
using poster.application.Users.DTOs;

namespace poster.application.Events.DTOs
{
    public class EventDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int? CategoryId { get; set; }
        public string Category { get; set; }
        public int? CityId { get; set; }
        public string City { get; set; }
        public int? PlaceId { get; set; }
        public string Place { get; set; }
        public UserDTO Vendor { get; set; }
        public ICollection<UserDTO> Users { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }
    }
}
