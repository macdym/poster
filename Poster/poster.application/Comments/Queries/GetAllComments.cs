using AutoMapper;
using MediatR;
using poster.application.Events.DTOs;
using poster.application.Comments.DTOs;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Comments.Queries
{
    public class GetAllComments
    {
        public class Query : IRequest<List<CommentDTO>>
        {
            public Guid EventId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<CommentDTO>>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;

            public Handler(IEventRepository eventRepository, IMapper mapper)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
            }

            public async Task<List<CommentDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _eventRepository.GetEventComments(request.EventId);

                return _mapper.Map<List<CommentDTO>>(comments)
                    .OrderBy(x => x.CreateDate).ToList();
            }
        }
    }
}
