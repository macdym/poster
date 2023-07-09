using AutoMapper;
using poster.application.Comments.DTOs;
using poster.application.Events.DTOs;
using poster.application.GlobalChatMessages.DTOs;
using poster.application.Users.DTOs;
using poster.domain;

namespace poster.application.MappingProfiles
{
    public class EventMappingProfile : Profile
    {
        public EventMappingProfile()
        {
            CreateMap<CreateEventDTO, Event>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()));

            CreateMap<Event, EventDTO>()
                .ForMember(dest => dest.Vendor, opt => opt.MapFrom(src => src.Users.FirstOrDefault(x => x.IsHost).User))
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.Users.Select(x => x.User)))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Place, opt => opt.MapFrom(src => src.Place.Street + ", " + src.Place.Name + ", " + src.Place.Building));

            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src =>
                    src.Photos.Where(x => !x.IsBackgroundPhoto).FirstOrDefault(x => x.IsMain) != null ?
                    src.Photos.Where(x => !x.IsBackgroundPhoto).FirstOrDefault(x => x.IsMain).Url :
                    null))
                .ForMember(dest => dest.BackgroundImage, opt => opt.MapFrom(src =>
                    src.Photos.Where(x => x.IsBackgroundPhoto).FirstOrDefault(x => x.IsMain) != null ?
                    src.Photos.Where(x => x.IsBackgroundPhoto).FirstOrDefault(x => x.IsMain).Url :
                    null))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.Followers.Count))
                .ForMember(dest => dest.FollowingsCount, opt => opt.MapFrom(src => src.Followings.Count));

            CreateMap<EventUser, UserDTO>();
            CreateMap<EventUser, EventDTO>();
            CreateMap<Comment, CommentDTO>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.User.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<GlobalChatMessage, GlobalChatMessageDTO>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.User.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<UpdateEventDTO, Event>();
        }
    }
}
