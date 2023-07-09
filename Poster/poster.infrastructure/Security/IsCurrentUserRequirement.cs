using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace poster.infrastructure.Security
{
    public class IsCurrentUserRequirement : IAuthorizationRequirement
    {

    }

    public class IsCurrentUserRequirementHandler : AuthorizationHandler<IsCurrentUserRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsCurrentUserRequirementHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCurrentUserRequirement requirement)
        {
            var user = context.User.FindFirstValue(ClaimTypes.Name);

            if (user == null)
                return Task.CompletedTask;

            var username = _httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "username").Value?.ToString();

            if (user == username)
                context.Succeed(requirement);

            if (context.User.IsInRole("ADMIN"))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
