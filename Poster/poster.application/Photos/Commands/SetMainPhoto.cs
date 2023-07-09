using MediatR;
using poster.application.Interfaces;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Photos.Commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public bool Background { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUsersRepository _usersRepository;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUsersRepository usersRepository, IUserAccessor userAccessor)
            {
                _usersRepository = usersRepository;
                _userAccessor = userAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                var currentMain = user.Photos.Where(x => x.IsBackgroundPhoto == request.Background).FirstOrDefault(x => x.IsMain);

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    await _usersRepository.UpdateUserPhotoAsync(currentMain);
                }

                photo.IsMain = true;

                await _usersRepository.UpdateUserPhotoAsync(photo);
            }
        }
    }
}
