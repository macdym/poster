using AutoMapper;
using MediatR;
using poster.application.Cities.DTOs;
using poster.persistance.Cities.Respositories.Interfaces;

namespace poster.application.Cities.Queries
{
    public class GetAllCities
    {
        public class Query : IRequest<List<CityDTO>> { }

        public class Handler : IRequestHandler<Query, List<CityDTO>>
        {
            private readonly ICityRepository _cityRepository;
            private readonly IMapper _mapper;

            public Handler(ICityRepository cityRepository, IMapper mapper)
            {
                _cityRepository = cityRepository;
                _mapper = mapper;
            }

            public async Task<List<CityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cities = await _cityRepository.GetAllAsync();
                return _mapper.Map<List<CityDTO>>(cities);
            }
        }
    }
}
