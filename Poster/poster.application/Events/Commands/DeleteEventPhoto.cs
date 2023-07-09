using MediatR;
using poster.application.Interfaces;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Commands
{
    public class DeleteEventPhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public Guid EventId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(IEventRepository eventRepository,
                IPhotoAccessor photoAccessor)
            {
                _eventRepository = eventRepository;
                _photoAccessor = photoAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.EventId);

                var photo = @event.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo.IsMain)
                {
                    throw new Exception("Nie można usunąć głównego zdjęcia.");
                }

                var result = await _photoAccessor.DeletePhoto(photo.Id);

                await _eventRepository.DeleteEventPhotoAsync(photo);
            }
        }
    }
}
