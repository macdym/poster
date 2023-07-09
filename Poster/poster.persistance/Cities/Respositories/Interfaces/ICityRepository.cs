using poster.domain;

namespace poster.persistance.Cities.Respositories.Interfaces
{
    public interface ICityRepository
    {
        Task<List<City>> GetAllAsync();
        Task<City> GetByIdAsync(int id);
        Task AddAsync(City city);
        Task UpdateAsync(City city);
        Task DeleteAsync(int id);
    }
}
