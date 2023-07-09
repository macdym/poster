using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Events.DTOs;
using poster.application.Events.Validators;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Events.Commands
{
    public class CreateEvent
    {
        public class Command : IRequest<Guid>
        {
            public CreateEventDTO Dto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Dto).SetValidator(new CreateEventValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly IUsersRepository _usersRepository;

            public Handler(
                IEventRepository eventRepository,
                IMapper mapper,
                IUserAccessor userAccessor,
                IUsersRepository usersRepository)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _usersRepository = usersRepository;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());
                var @event = _mapper.Map<Event>(request.Dto);
                @event.IsActive = true;

                var eventUser = new EventUser
                {
                    UserId = user.Id,
                    EventId = @event.Id,
                    IsHost = true
                };

                @event.Users.Add(eventUser);

                return await _eventRepository.AddAsync(@event);
            }
        }
    }
}
