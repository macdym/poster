using poster.domain;

namespace poster.persistance.Events.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllAsync();
        Task<Event> GetByIdAsync(Guid id);
        Task<EventUser> GetEventUserAsync(string userId, Guid eventId);
        Task DeleteEventUserAsync(EventUser eventUser);
        Task AddEventUserAsync(EventUser eventUser);
        Task AddEventPhoto(Photo photo);
        Task DeleteEventPhotoAsync(Photo photo);
        Task UpdateEventPhotoAsync(Photo photo);
        Task<Guid> AddAsync(Event @event);
        Task UpdateAsync(Event @event);
        Task DeleteAsync(Guid id);
        Task<Comment> AddCommentAsync(Comment comment);
        Task<List<Comment>> GetEventComments(Guid id);
    }
}
