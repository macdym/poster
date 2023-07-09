using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poster.application.Places.Commands;
using poster.application.Places.DTOs;
using poster.application.Places.Queries;

namespace poster.api.Controllers
{
    public class PlaceController : BaseController
    {
        public PlaceController()
        {

        }

        /// <summary>
        /// Pobieranie wszystkich miejsc
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<PlaceDTO>>> GetAll(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new GetAllPlaces.Query(), cancellationToken);
        }

        /// <summary>
        /// Pobieranie miejsca
        /// </summary>
        /// <param name="id">
        /// Int id miejsca.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceDTO>> Get(int id, CancellationToken cancellationToken)
        {
            try
            {
                return await Mediator.Send(new GetPlaceById.Query { Id = id }, cancellationToken);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Pobieranie miejsc po id miasta
        /// </summary>
        /// <param name="id">
        /// Int id miasta.
        /// </param>
        [HttpGet("miasto/{id}")]
        public async Task<ActionResult<List<PlaceDTO>>> GetByMiastoId(int id, CancellationToken cancellationToken)
        {
            try
            {
                return await Mediator.Send(new GetPlacesByCityId.Query { Id = id }, cancellationToken);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Tworzenie nowego miejsca
        /// </summary>
        /// <param name="dto">
        /// Obiekt PlaceDTO zawierajacy pola nowego obiektu Place.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<IActionResult> Create(PlaceDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new CreatePlace.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Aktualizowanie miejsca
        /// </summary>
        /// <param name="dto">
        /// Obiekt PlaceDTO zawierajacy pola zaktualizowanego obiektu Place.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut]
        public async Task<IActionResult> Update(PlaceDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new UpdatePlace.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Usuwanie miejsca
        /// </summary>
        /// <param name="id">
        /// Int id miejsca.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            await Mediator.Send(new DeletePlace.Command { Id = id }, cancellationToken);
            return Ok();
        }
    }
}
