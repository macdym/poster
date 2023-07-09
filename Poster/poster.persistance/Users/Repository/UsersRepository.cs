using Microsoft.EntityFrameworkCore;
using poster.domain;
using poster.persistance.Users.Repository.Interfaces;

namespace poster.persistance.Users.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _dataContext;

        public UsersRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task DeleteAsync(string id)
        {
            var toDelete = await GetByIdAsync(id);
            toDelete.IsActive = false;
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            await GetByIdAsync(user.Id);
            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateUserPhotoAsync(Photo photo)
        {
            var photoDb =await _dataContext.Photos.FirstOrDefaultAsync(x => x.Id == photo.Id);
            if(photoDb != null)
            {
                photoDb.IsMain = photo.IsMain;
                await _dataContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Photo was not found.");
            }
        }

        public async Task DeleteUserPhotoAsync(Photo photo)
        {
            var photoDb = await _dataContext.Photos.FirstOrDefaultAsync(x => x.Id == photo.Id);
            if(photoDb != null)
            {
                _dataContext.Photos.Remove(photoDb);
                await _dataContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Photo was not found.");
            }
        }

        public async Task AddUserPhoto(Photo photo)
        {
            await _dataContext.Photos.AddAsync(photo);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<User> GetByIdAsync(string id)
        {
            var user = await _dataContext.Users
                .AsNoTracking()
                .Include(x => x.Events)
                .ThenInclude(x => x.Event)
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                throw new Exception("Brak uytkownika o podanym id.");
            }

            return user;
        }

        public async Task<User> GetByUserNameAsync(string userName)
        {
            var user = await _dataContext.Users
                .AsNoTracking()
                .Include(x => x.Events)
                .ThenInclude(x => x.Event)
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null)
            {
                throw new Exception("Brak użytkownika o podanej nazwie.");
            }

            return user;
        }
    }
}
