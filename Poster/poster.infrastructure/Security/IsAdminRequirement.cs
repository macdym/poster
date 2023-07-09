using Microsoft.AspNetCore.Authorization;

namespace poster.infrastructure.Security
{
    public class IsAdminRequirement : IAuthorizationRequirement
    {
    }

    public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
        {            
            if (context.User.IsInRole("ADMIN"))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
