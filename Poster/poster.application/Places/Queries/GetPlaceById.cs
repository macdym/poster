using AutoMapper;
using MediatR;
using poster.application.Places.DTOs;
using poster.persistance.Places.Repositories.Interfaces;

namespace poster.application.Places.Queries
{
    public class GetPlaceById
    {
        public class Query : IRequest<PlaceDTO>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PlaceDTO>
        {
            private readonly IPlaceRepository _placeRepository;
            private readonly IMapper _mapper;

            public Handler(IPlaceRepository placeRepository, IMapper mapper)
            {
                _placeRepository = placeRepository;
                _mapper = mapper;
            }


            public async Task<PlaceDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var place = await _placeRepository.GetByIdAsync(request.Id);
                return _mapper.Map<PlaceDTO>(place);
            }
        }
    }
}
