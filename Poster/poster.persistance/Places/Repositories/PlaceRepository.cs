using Microsoft.EntityFrameworkCore;
using poster.domain;
using poster.persistance.Places.Repositories.Interfaces;

namespace poster.persistance.Places.Repositories
{
    public class PlaceRepository : IPlaceRepository
    {
        private readonly DataContext _dataContext;

        public PlaceRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Place>> GetAllAsync()
        {
            return await _dataContext.Places.AsNoTracking()
                .Include(x => x.City)
                .ToListAsync();
        }
        public async Task<List<Place>> GetByCityId(int id)
        {
            return await _dataContext.Places.AsNoTracking()
                .Include(x => x.City)
                .Where(x => x.CityId == id)
                .ToListAsync();
        }


        public async Task<Place> GetByIdAsync(int id)
        {
            var place = await _dataContext.Places.AsNoTracking()
                .Include(x => x.City)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (place == null)
            {
                throw new Exception("Brak miejsca o podanym id.");
            }

            return place;
        }

        public async Task AddAsync(Place place)
        {
            await _dataContext.Places.AddAsync(place);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Place place)
        {
            await GetByIdAsync(place.Id);
            _dataContext.Places.Update(place);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var toDelete = await GetByIdAsync(id);
            _dataContext.Places.Remove(toDelete);
            await _dataContext.SaveChangesAsync();
        }
    }
}
