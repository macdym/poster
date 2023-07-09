using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using poster.api.Services;
using poster.domain;
using poster.infrastructure.Security;
using poster.persistance;
using System.Text;

namespace poster.api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentitySevices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            }).AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };

                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path; ;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat") || path.StartsWithSegments("/globalchat")))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
                opt.AddPolicy("IsAdmin", policy =>
                {
                    policy.Requirements.Add(new IsAdminRequirement());
                });
                opt.AddPolicy("IsCurrentUserOrAdmin", policy =>
                {
                    policy.Requirements.Add(new IsCurrentUserRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            services.AddTransient<IAuthorizationHandler, IsAdminRequirementHandler>();
            services.AddTransient<IAuthorizationHandler, IsCurrentUserRequirementHandler>();

            services.AddScoped<TokenService>();

            return services;
        }
    }
}
