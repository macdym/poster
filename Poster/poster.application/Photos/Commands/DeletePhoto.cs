using MediatR;
using poster.application.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Photos.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUsersRepository _usersRepository;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUsersRepository usersRepository,
                IPhotoAccessor photoAccessor,
                IUserAccessor userAccessor)
            {
                _usersRepository = usersRepository;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo.IsMain)
                {
                    throw new Exception("Nie można usunąć głównego zdjęcia.");
                }

                var result = await _photoAccessor.DeletePhoto(photo.Id);

                await _usersRepository.DeleteUserPhotoAsync(photo);
            }
        }
    }
}
