using MediatR;
using poster.application.Interfaces;
using poster.persistance.Events.Repositories.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Events.Commands
{
    public class SetMainEventPhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public Guid EventId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IEventRepository _eventRepository;

            public Handler(IEventRepository eventRepository)
            {
                _eventRepository = eventRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.EventId);

                var photo = @event.Photos.FirstOrDefault(x => x.Id == request.Id);

                var currentMain = @event.Photos.FirstOrDefault(x => x.IsMain);

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    await _eventRepository.UpdateEventPhotoAsync(currentMain);
                }

                photo.IsMain = true;

                await _eventRepository.UpdateEventPhotoAsync(photo);
            }
        }
    }
}