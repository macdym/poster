using AutoMapper;
using MediatR;
using poster.application.Cities.DTOs;
using poster.persistance.Cities.Respositories.Interfaces;

namespace poster.application.Cities.Queries
{
    public class GetCityById
    {
        public class Query : IRequest<CityDTO>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CityDTO>
        {
            private readonly ICityRepository _citiesRepository;
            private readonly IMapper _mapper;

            public Handler(ICityRepository cityRepository, IMapper mapper)
            {
                _citiesRepository = cityRepository;
                _mapper = mapper;
            }

            public async Task<CityDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var city = await _citiesRepository.GetByIdAsync(request.Id);
                return _mapper.Map<CityDTO>(city);
            }
        }
    }
}
