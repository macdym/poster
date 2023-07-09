using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using poster.application.Interfaces;
using poster.application.Users.DTOs;
using poster.persistance;

namespace poster.application.Followers.Queries
{
    public class GetFollowers
    {
        public class Query : IRequest<List<UserDTO>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<UserDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = new List<UserDTO>(); 

                switch(request.Predicate)
                {
                    case "followers":
                        users = await _dataContext.UserFollowings.Where(x => x.Target.UserName == request.Username)
                            .Select(x => x.Observer)
                            .ProjectTo<UserDTO>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername()})
                            .ToListAsync();
                        break;
                    case "following":
                        users = await _dataContext.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                            .Select(x => x.Target)
                            .ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                            .ToListAsync();
                        break;
                }

                return users;
            }
        }
    }
}
