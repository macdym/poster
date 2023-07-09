using Microsoft.AspNetCore.Identity;
using poster.domain;
using poster.persistance.Seed.Seeders;
using System.Security.Claims;

namespace poster.persistance.Seed
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                await roleManager.CreateAsync(new IdentityRole("ADMIN"));
                await roleManager.CreateAsync(new IdentityRole("USER"));
            }
            if (!userManager.Users.Any())
            {
                var users = UserSeed.Get();

                foreach (var u in users)
                {
                    await userManager.CreateAsync(u, "Pa$$word123!");
                    await userManager.AddToRoleAsync(u, (u.UserName == "Admin" ? "ADMIN" : "USER"));
                }
            }
            if (!context.Cities.Any())
            {
                var miasta = CitiesSeed.Get();
                await context.Cities.AddRangeAsync(miasta);
                await context.SaveChangesAsync();
            }
            if (!context.Events.Any())
            {
                var aktywnosci = EventsSeed.Get();

                foreach (var a in aktywnosci)
                {
                    a.Users.Add(new EventUser()
                    {
                        Event = a,
                        IsHost = true,
                        User = await userManager.FindByNameAsync("Admin")
                    });
                }

                await context.Events.AddRangeAsync(aktywnosci);
                await context.SaveChangesAsync();
            }
        }
    }
}
