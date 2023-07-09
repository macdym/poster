using AutoMapper;
using MediatR;
using poster.application.Events.DTOs;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Queries
{
    public class GetAllEvents
    {
        public class Query : IRequest<List<EventDTO>> { }

        public class Handler : IRequestHandler<Query, List<EventDTO>>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;

            public Handler(IEventRepository eventRepository, IMapper mapper)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
            }

            public async Task<List<EventDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _eventRepository.GetAllAsync();

                return _mapper.Map<List<EventDTO>>(events);
            }
        }
    }
}
