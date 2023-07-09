using MediatR;
using Microsoft.EntityFrameworkCore;
using poster.application.Interfaces;
using poster.domain;
using poster.persistance;

namespace poster.application.Followers.Commands
{
    public class FollowToggler
    {
        public class Command : IRequest
        {
            public string TargetUserName { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var userObserver = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var target = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUserName);

                if (target == null) return;

                var following = await _dataContext.UserFollowings.FindAsync(userObserver.Id, target.Id);

                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = userObserver,
                        Target = target
                    };

                    _dataContext.UserFollowings.Add(following);
                }
                else
                {
                    _dataContext.UserFollowings.Remove(following);
                }

                await _dataContext.SaveChangesAsync();
            }
        }
    }
}
