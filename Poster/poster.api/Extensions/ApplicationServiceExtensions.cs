using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using poster.application.Events.Commands;
using poster.application.Events.Queries;
using poster.application.Interfaces;
using poster.application.MappingProfiles;
using poster.infrastructure.Photos;
using poster.infrastructure.Security;
using poster.persistance;
using poster.persistance.Events.Repositories;
using poster.persistance.Events.Repositories.Interfaces;
using poster.persistance.Categories.Repositories;
using poster.persistance.Categories.Repositories.Interfaces;
using poster.persistance.Cities.Respositories;
using poster.persistance.Cities.Respositories.Interfaces;
using poster.persistance.Places.Repositories;
using poster.persistance.Places.Repositories.Interfaces;
using poster.persistance.Users.Repository;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblyContaining<GetAllEvents.Handler>();
            });

            services.AddAutoMapper(typeof(EventMappingProfile).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<CreateEvent>();
            services.AddHttpContextAccessor();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();

            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IPlaceRepository, PlaceRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IUserAccessor, UserAccessor>();

            return services;
        }
    }
}
