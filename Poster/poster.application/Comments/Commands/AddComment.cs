using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Comments.DTOs;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Comments.Commands
{
    public class AddComment
    {
        public class Command : IRequest<CommentDTO>
        {
            public string Body { get; set; }
            public Guid EventId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, CommentDTO>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IUsersRepository _usersRepository;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(IEventRepository eventRepository,
                IUsersRepository usersRepository,
                IUserAccessor userAccessor,
                IMapper mapper)
            {
                _eventRepository = eventRepository;
                _usersRepository = usersRepository;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<CommentDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.EventId);

                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var comment = new Comment
                {
                    UserId = user.Id,
                    EventId = @event.Id,
                    Body = request.Body
                };

                var result = await _eventRepository.AddCommentAsync(comment);

                return _mapper.Map<CommentDTO>(result);
            }
        }
    }
}
