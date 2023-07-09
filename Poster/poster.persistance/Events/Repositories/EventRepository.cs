using Microsoft.EntityFrameworkCore;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.persistance.Events.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _dataContext;

        public EventRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Event>> GetAllAsync()
        {
            return await _dataContext.Events
                .AsNoTracking()
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Photos)
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Followers)
                .ThenInclude(x => x.Observer)
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Followings)
                .Include(x => x.Category)
                .Include(x => x.City)
                .Include(x => x.Place)
                .ToListAsync();
        }

        public async Task<Event> GetByIdAsync(Guid id)
        {
            var aktywnosc = await _dataContext.Events
                .AsNoTracking()
                .Include(x => x.Photos)
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Photos)
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Followers)
                .ThenInclude(x => x.Observer)
                .Include(x => x.Users.Where(u => u.User.IsActive))
                .ThenInclude(x => x.User.Followings)
                .Include(x => x.Category)
                .Include(x => x.City)
                .Include(x => x.Place)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (aktywnosc == null)
            {
                throw new Exception("Brak aktywności o podanym id.");
            }

            return aktywnosc;
        }

        public async Task<List<Comment>> GetEventComments(Guid id)
        {
            var comments = await _dataContext.Comments
                .Include(x => x.Event)
                .Include(x => x.User)
                .ThenInclude(x => x.Photos)
                .Where(x => x.EventId == id)
                .ToListAsync();

            return comments;
        }

        public async Task<EventUser> GetEventUserAsync(string userId, Guid aktywnoscId)
        {
            return await _dataContext.EventUser
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserId == userId && x.EventId == aktywnoscId);
        }

        public async Task<Guid> AddAsync(Event aktywnosc)
        {
            var result = await _dataContext.Events.AddAsync(aktywnosc);
            await _dataContext.SaveChangesAsync();
            return result.Entity.Id;
        }

        public async Task UpdateAsync(Event @event)
        {
            await GetByIdAsync(@event.Id);
            _dataContext.Events.Update(@event);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var toDelete = await GetByIdAsync(id);
            toDelete.IsActive = false;
            await _dataContext.SaveChangesAsync();
        }

        public async Task AddEventUserAsync(EventUser eventUser)
        {
            await _dataContext.EventUser.AddAsync(eventUser);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteEventUserAsync(EventUser eventUser)
        {
            _dataContext.EventUser.Remove(eventUser);
            await _dataContext.SaveChangesAsync();
        }

        public async Task AddEventPhoto(Photo photo)
        {
            await _dataContext.Photos.AddAsync(photo);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteEventPhotoAsync(Photo photo)
        {
            var photoDb = await _dataContext.Photos.FirstOrDefaultAsync(x => x.Id == photo.Id);
            if (photoDb != null)
            {
                _dataContext.Photos.Remove(photoDb);
                await _dataContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Photo was not found.");
            }
        }

        public async Task UpdateEventPhotoAsync(Photo photo)
        {
            var photoDb = await _dataContext.Photos.FirstOrDefaultAsync(x => x.Id == photo.Id);
            if (photoDb != null)
            {
                photoDb.IsMain = photo.IsMain;
                await _dataContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Photo was not found.");
            }
        }

        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            var enitity = await _dataContext.Comments.AddAsync(comment);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Comments
                .Include(x => x.User.Photos)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == enitity.Entity.Id);
        }
    }
}
