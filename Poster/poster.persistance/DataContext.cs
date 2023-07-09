using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using poster.domain;

namespace poster.persistance
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<EventUser> EventUser { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<GlobalChatMessage> GlobalChatMessages { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region UserFollowing

            modelBuilder.Entity<UserFollowing>()
                .HasKey(uf => new { uf.ObserverId, uf.TargetId });

            modelBuilder.Entity<UserFollowing>()
                .HasOne(uf => uf.Observer)
                .WithMany(u => u.Followings)
                .HasForeignKey(uf => uf.ObserverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserFollowing>()
                .HasOne(uf => uf.Target)
                .WithMany(u => u.Followers)
                .HasForeignKey(uf => uf.TargetId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Followings)
                .WithOne(uf => uf.Observer)
                .HasForeignKey(uf => uf.ObserverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithOne(uf => uf.Target)
                .HasForeignKey(uf => uf.TargetId)
                .OnDelete(DeleteBehavior.NoAction);

            #endregion

            #region Comment
            modelBuilder.Entity<Comment>()
                .HasOne(u => u.Event)
                .WithMany(a => a.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            #endregion

            #region Place
            modelBuilder.Entity<Place>()
                .HasOne(m => m.City)
                .WithMany(m => m.Places)
                .HasForeignKey(m => m.CityId)
                .OnDelete(DeleteBehavior.Cascade);
            #endregion

            #region EventUser
            modelBuilder.Entity<EventUser>(x => x.HasKey(au => new { au.UserId, au.EventId }));

            modelBuilder.Entity<EventUser>()
                .HasOne(u => u.User)
                .WithMany(u => u.Events)
                .HasForeignKey(au => au.UserId);

            modelBuilder.Entity<EventUser>()
                .HasOne(u => u.Event)
                .WithMany(u => u.Users)
                .HasForeignKey(au => au.EventId);
            #endregion

        }
    }
}
