using AutoMapper;
using poster.application.Photos.DTOs;
using poster.domain;

namespace poster.application.MappingProfiles
{
    public class PhotoMappingProfile : Profile
    {
        public PhotoMappingProfile()
        {
            CreateMap<Photo, PhotoDTO>();
            CreateMap<PhotoDTO, Photo>();
        }
    }
}
