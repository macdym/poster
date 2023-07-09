using AutoMapper;
using poster.application.Categories.DTOs;
using poster.domain;

namespace poster.application.MappingProfiles
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<CategoryDTO, Category>();
            CreateMap<Category, CategoryDTO>();
        }
    }
}
