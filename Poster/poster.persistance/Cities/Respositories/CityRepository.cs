using Microsoft.EntityFrameworkCore;
using poster.domain;
using poster.persistance.Cities.Respositories.Interfaces;

namespace poster.persistance.Cities.Respositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _dataContext;

        public CityRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<City>> GetAllAsync()
        {
            return await _dataContext.Cities.AsNoTracking()
                .Include(x => x.Places)
                .ToListAsync();
        }

        public async Task<City> GetByIdAsync(int id)
        {
            var city = await _dataContext.Cities.AsNoTracking()
                .Include(x => x.Places)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (city == null)
            {
                throw new Exception("Brak miasta o podanym id.");
            }

            return city;
        }

        public async Task AddAsync(City city)
        {
            await _dataContext.Cities.AddAsync(city);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(City city)
        {
            await GetByIdAsync(city.Id);
            _dataContext.Cities.Update(city);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var toDelete = await GetByIdAsync(id);
            _dataContext.Cities.Remove(toDelete);
            await _dataContext.SaveChangesAsync();
        }
    }
}
