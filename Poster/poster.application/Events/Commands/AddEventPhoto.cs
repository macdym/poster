using MediatR;
using Microsoft.AspNetCore.Http;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Commands
{
    public class AddEventPhoto
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IEventRepository _eventRepository;

            public Handler(IPhotoAccessor photoAccessor,
                IEventRepository eventRepository)
            {
                _photoAccessor = photoAccessor;
                _eventRepository = eventRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _eventRepository.GetByIdAsync(request.Id);

                var photoUplouadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUplouadResult.Url,
                    Id = photoUplouadResult.PublicId,
                    EventId = @event.Id,
                };

                if (!@event.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                await _eventRepository.AddEventPhoto(photo);
            }
        }
    }
}
