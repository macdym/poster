using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using poster.application.GlobalChatMessages.DTOs;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.application.GlobalChatMessages.Commands
{
    public class AddGlobalChatMessage
    {
        public class Command : IRequest<GlobalChatMessageDTO>
        {
            public string Body { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, GlobalChatMessageDTO>
        {
            private readonly IUsersRepository _usersRepository;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly DataContext _ctx;

            public Handler(
                IUsersRepository usersRepository,
                IUserAccessor userAccessor,
                IMapper mapper,
                DataContext ctx)
            {
                _usersRepository = usersRepository;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _ctx = ctx;
            }

            public async Task<GlobalChatMessageDTO> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _usersRepository.GetByUserNameAsync(_userAccessor.GetUsername());

                var message = new GlobalChatMessage
                {
                    UserId = user.Id,
                    Body = request.Body
                };

                var result = await _ctx.GlobalChatMessages.AddAsync(message);
                await _ctx.SaveChangesAsync();

                var resultMessage = await _ctx.GlobalChatMessages.Include(x => x.User.Photos).FirstOrDefaultAsync(x => x.Id == result.Entity.Id);

                return _mapper.Map<GlobalChatMessageDTO>(resultMessage);
            }
        }
    }
}
