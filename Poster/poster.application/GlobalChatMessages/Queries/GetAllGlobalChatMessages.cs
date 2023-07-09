using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using poster.application.Comments.DTOs;
using poster.application.GlobalChatMessages.DTOs;
using poster.application.Interfaces;
using poster.persistance;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.GlobalChatMessages.Queries
{
    public class GetAllGlobalChatMessages
    {
        public class Query : IRequest<List<GlobalChatMessageDTO>>
        {
        }

        public class Handler : IRequestHandler<Query, List<GlobalChatMessageDTO>>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext ctx, IMapper mapper, IUserAccessor userAccessor)
            {
                _ctx = ctx;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<GlobalChatMessageDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _ctx.GlobalChatMessages.AsNoTracking()
                    .Include(x => x.User.Followers)
                    .Include(x => x.User.Photos)
                    .Where(x => x.User.Followers.Any(x => x.Observer.UserName == _userAccessor.GetUsername()) || x.User.UserName == _userAccessor.GetUsername())
                    .ToListAsync();

                var xd = _mapper.Map<List<GlobalChatMessageDTO>>(messages).ToList();

                return _mapper.Map<List<GlobalChatMessageDTO>>(messages)
                    .OrderBy(x => x.CreateDate).ToList();
            }
        }
    }
}
