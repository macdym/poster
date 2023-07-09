using AutoMapper;
using MediatR;
using poster.application.Interfaces;
using poster.application.Users.DTOs;
using poster.domain;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.Users.Commands
{
    public class UpdateUser
    {
        public class Command : IRequest
        {
            public UpdateUserDTO DTO { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUsersRepository _usersRepository;
            private readonly IMapper _mapper;

            public Handler(IUsersRepository usersRepository, IMapper mapper)
            {
                _usersRepository = usersRepository;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetByUserNameAsync(request.DTO.UserName);

                user.DisplayName = request.DTO.DisplayName;
                user.Bio = request.DTO.Bio;
                user.Email = request.DTO.Email;

                await _usersRepository.UpdateAsync(user);
            }
        }
    }
}
