using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poster.application.Cities.Commands;
using poster.application.Cities.DTOs;
using poster.application.Cities.Queries;

namespace poster.api.Controllers
{
    public class CityController : BaseController
    {
        public CityController()
        {

        }

        /// <summary>
        /// Pobieranie wszystkich miast
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<CityDTO>>> GetAll(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new GetAllCities.Query(), cancellationToken);
        }

        /// <summary>
        /// Pobieranie miasta
        /// </summary>
        /// <param name="id">
        /// Int id miasta.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CityDTO>> Get(int id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new GetCityById.Query { Id = id }, cancellationToken);
        }

        /// <summary>
        /// Tworzenie nowego miasta
        /// </summary>
        /// <param name="dto">
        /// Obiekt CityDTO zawierajacy pola nowego obiektu City.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<IActionResult> Create(CityDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new CreateCity.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Aktualizowanie miasta
        /// </summary>
        /// <param name="dto">
        /// Obiekt CityDTO zawierajacy pola zaktualizowanego obiektu City.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut]
        public async Task<IActionResult> Update(CityDTO dto, CancellationToken cancellationToken)
        {
            await Mediator.Send(new UpdateCity.Command { Dto = dto }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Usuwanie miasta
        /// </summary>
        /// <param name="id">
        /// Int id miasta.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            await Mediator.Send(new DeleteCity.Command { Id = id }, cancellationToken);
            return Ok();
        }
    }
}
