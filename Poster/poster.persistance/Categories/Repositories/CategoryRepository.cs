using Microsoft.EntityFrameworkCore;
using poster.domain;
using poster.persistance.Categories.Repositories.Interfaces;

namespace poster.persistance.Categories.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _dataContext;

        public CategoryRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _dataContext.Categories.AsNoTracking()
                .ToListAsync();
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            var miejsce = await _dataContext.Categories.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (miejsce == null)
            {
                throw new Exception("Brak kategorii o podanym id.");
            }

            return miejsce;
        }

        public async Task AddAsync(Category kategoria)
        {
            await _dataContext.Categories.AddAsync(kategoria);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category kategoria)
        {
            await GetByIdAsync(kategoria.Id);
            _dataContext.Categories.Update(kategoria);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var toDelete = await GetByIdAsync(id);
            _dataContext.Categories.Remove(toDelete);
            await _dataContext.SaveChangesAsync();
        }
    }
}
