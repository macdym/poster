using MediatR;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Events.Commands
{
    public class UpdateEventUser
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IUsersRepository _usersRepository;
            private readonly IEventRepository _eventRepository;

            public Handler(
                IUserAccessor userAccessor,
                IUsersRepository usersRepository,
                IEventRepository aktywnoscRepository)
            {
                _userAccessor = userAccessor;
                _usersRepository = usersRepository;
                _eventRepository = aktywnoscRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.Id);

                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var hostUserName = @event.Users.FirstOrDefault(x => x.IsHost)?.User?.UserName;

                var userEvent = @event.Users.FirstOrDefault(x => x.User.UserName == user.UserName);

                if (userEvent != null && hostUserName == user.UserName)
                {
                    @event.IsActive = !@event.IsActive;

                    await _eventRepository.UpdateAsync(@event);
                }

                if (userEvent != null && hostUserName != user.UserName)
                {
                    await _eventRepository.DeleteEventUserAsync(userEvent);
                }

                if (userEvent == null)
                {
                    userEvent = new EventUser
                    {
                        UserId = user.Id,
                        EventId = @event.Id,
                        IsHost = false
                    };

                    await _eventRepository.AddEventUserAsync(userEvent);
                }
            }
        }
    }
}
