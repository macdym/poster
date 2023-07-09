using poster.domain;

namespace poster.persistance.Places.Repositories.Interfaces
{
    public interface IPlaceRepository
    {
        Task<List<Place>> GetAllAsync();
        Task<List<Place>> GetByCityId(int id);
        Task<Place> GetByIdAsync(int id);
        Task AddAsync(Place place);
        Task UpdateAsync(Place place);
        Task DeleteAsync(int id);
    }
}
