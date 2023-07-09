using MediatR;
using Microsoft.AspNetCore.Http;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance.Users.Repository.Interfaces;
using System.Security.Cryptography.X509Certificates;

namespace poster.application.Photos.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest
        {
            public IFormFile File { get; set; }
            public bool IsBackgroundPhoto { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly IUsersRepository _usersRepository;

            public Handler(IPhotoAccessor photoAccessor,
                IUserAccessor userAccessor,
                IUsersRepository usersRepository)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _usersRepository = usersRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var photoUplouadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUplouadResult.Url,
                    Id = photoUplouadResult.PublicId,
                    UserId = user.Id,
                    IsBackgroundPhoto = request.IsBackgroundPhoto
                };

                if (!user.Photos.Any(x => x.IsMain && !x.IsBackgroundPhoto) && !request.IsBackgroundPhoto) photo.IsMain = true;
                else
                if (!user.Photos.Any(x => x.IsMain && x.IsBackgroundPhoto) && request.IsBackgroundPhoto) photo.IsMain = true;

                await _usersRepository.AddUserPhoto(photo);
            }
        }
    }
}
