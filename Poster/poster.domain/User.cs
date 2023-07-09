using Microsoft.AspNetCore.Identity;

namespace poster.domain
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<EventUser> Events { get; set; } = new List<EventUser>();
        public ICollection<Comment> Coments { get; set; }
        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
    }
}
