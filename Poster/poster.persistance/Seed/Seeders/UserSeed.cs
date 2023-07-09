using poster.domain;

namespace poster.persistance.Seed.Seeders
{
    public static class UserSeed
    {

        public static List<User> Get() => new()
        {
            new User{DisplayName = "Admin", UserName= "Admin", Email = "maciej.dyminski@yahoo.com", IsActive = true},
            new User{DisplayName = "User", UserName= "User", Email = "madyminski@wsb-nlu.edu.pl", IsActive = true}
        };
    }
}
