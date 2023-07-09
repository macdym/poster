using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poster.application.Categories.Commands;
using poster.application.Categories.DTOs;
using poster.application.Categories.Queries;

namespace poster.api.Controllers
{
    public class CategoryController : BaseController
    {
        public CategoryController()
        {
            
        }

        /// <summary>
        /// Pobieranie wszystkich kategorii
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetAll(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new GetAllCategories.Query(), cancellationToken);
        }

        /// <summary>
        /// Pobieranie kategorii
        /// </summary>
        /// <param name="id">
        /// Int id kategorii.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> Get(int id, CancellationToken cancellationToken)
        {
            try
            {
                return await Mediator.Send(new GetCategoryById.Query { Id = id }, cancellationToken);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Tworzenie nowej kategorii
        /// </summary>
        /// <param name="dto">
        /// Obiekt CategoryDTO zawierajacy pola nowego obiektu Kategoriia.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<IActionResult> Create(CategoryDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new CreateCategory.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Aktualizowanie kategorii
        /// </summary>
        /// <param name="dto">
        /// Obiekt CategoryDTO zawierajacy pola zaktualizowanego obiektu Category.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut]
        public async Task<IActionResult> Update(CategoryDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new UpdateCategory.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Usuwanie kategorii
        /// </summary>
        /// <param name="id">
        /// Int id kategorii.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            await Mediator.Send(new DeleteCategory.Command { Id = id }, cancellationToken);
            return Ok();
        }
    }
}
