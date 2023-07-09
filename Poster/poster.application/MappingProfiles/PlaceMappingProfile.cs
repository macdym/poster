using AutoMapper;
using poster.application.Places.DTOs;
using poster.domain;

namespace poster.application.MappingProfiles
{
    public class PlaceMappingProfile : Profile
    {
        public PlaceMappingProfile()
        {
            CreateMap<PlaceDTO, Place>()
                .ForMember(dest => dest.City, opt => opt.Ignore());

            CreateMap<Place, PlaceDTO>()
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(dest => dest.CityId, opt => opt.MapFrom(src => src.City.Id));
        }
    }
}
