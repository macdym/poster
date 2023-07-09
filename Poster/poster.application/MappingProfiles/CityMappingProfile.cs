using AutoMapper;
using poster.application.Cities.DTOs;
using poster.domain;

namespace poster.application.MappingProfiles
{
    public class CityMappingProfile : Profile
    {
        public CityMappingProfile()
        {
            CreateMap<CityDTO, City>();
            CreateMap<City, CityDTO>();
        }
    }
}
