using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using poster.persistance.Events.Repositories.Interfaces;
using System.Security.Claims;

namespace poster.infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IEventRepository _aktywnoscRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(IEventRepository aktywnoscRepository, IHttpContextAccessor httpContextAccessor)
        {
            _aktywnoscRepository = aktywnoscRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var user = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (user == null)
                return Task.CompletedTask;

            var aktywnosc = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());
            var aktywnoscUser = _aktywnoscRepository.GetEventUserAsync(user, aktywnosc).Result;

            if (aktywnoscUser == null)
                return Task.CompletedTask;

            if (aktywnoscUser.IsHost)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
