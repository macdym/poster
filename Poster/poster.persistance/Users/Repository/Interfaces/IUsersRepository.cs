using poster.domain;

namespace poster.persistance.Users.Repository.Interfaces
{
    public interface IUsersRepository
    {
        Task<User> GetByUserNameAsync(string userName);
        Task<User> GetByIdAsync(string id);
        Task DeleteAsync(string id);
        Task UpdateAsync(User user);
        Task AddUserPhoto(Photo photo);
        Task DeleteUserPhotoAsync(Photo photo);
        Task UpdateUserPhotoAsync(Photo photo);
    }
}
