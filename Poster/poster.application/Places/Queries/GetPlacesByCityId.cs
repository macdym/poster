using AutoMapper;
using MediatR;
using poster.application.Places.DTOs;
using poster.persistance.Places.Repositories.Interfaces;

namespace poster.application.Places.Queries
{
    public class GetPlacesByCityId
    {
        public class Query : IRequest<List<PlaceDTO>> {

            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<PlaceDTO>>
        {
            private readonly IPlaceRepository _placeRepository;
            private readonly IMapper _mapper;

            public Handler(IPlaceRepository placeRepository, IMapper mapper)
            {
                _placeRepository = placeRepository;
                _mapper = mapper;
            }

            public async Task<List<PlaceDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var places = await _placeRepository.GetByCityId(request.Id);
                return _mapper.Map<List<PlaceDTO>>(places);
            }
        }
    }
}
