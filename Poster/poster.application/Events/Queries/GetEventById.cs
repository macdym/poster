using AutoMapper;
using MediatR;
using poster.application.Events.DTOs;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Queries
{
    public class GetEventById
    {
        public class Query : IRequest<EventDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, EventDTO>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;

            public Handler(IEventRepository eventRepository, IMapper mapper)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
            }


            public async Task<EventDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.Id);
                return _mapper.Map<EventDTO>(@event);
            }
        }
    }
}
