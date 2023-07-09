using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poster.application.Events.Commands;
using poster.application.Photos.Commands;
using poster.application.Photos.DTOs;

namespace poster.api.Controllers
{
    public class PhotosController : BaseController
    {

        /// <summary>
        /// Dodawanie zdjęcia użytkownika
        /// </summary>
        /// </param>
        [HttpPost("user")]
        public async Task<IActionResult> Add([FromForm] AddPhoto.Command command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        /// <summary>
        /// Usuwanie zdjęcia
        /// </summary>
        /// <param name="id">
        /// Id zdjecia do usunięcia.
        /// </param>
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhotoDTO>> Delete(string id, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new DeletePhoto.Command() { Id = id }, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Zmiana zdjęcia głównego
        /// </summary>
        /// <param name="id">
        /// Id zdjecia głownego.
        /// </param>
        [HttpPost("{id}/set-main")]
        public async Task<ActionResult<PhotoDTO>> SetMain(string id, bool background, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new SetMainPhoto.Command() { Id = id, Background = background }, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Dodawanie zdjęcia aktywnosci
        /// </summary>
        [HttpPost("aktywnosc")]
        public async Task<IActionResult> Add([FromForm] AddEventPhoto.Command command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        /// <summary>
        /// Usuwanie zdjęcia aktywnosci
        /// </summary>
        /// <param name="id">
        /// Id zdjecia do usunięcia.
        /// </param>
        [HttpDelete("{id}/aktywnosc/{aktywnoscId}")]
        public async Task<ActionResult<PhotoDTO>> Delete(string id, Guid aktywnoscId, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new DeleteEventPhoto.Command() { Id = id, EventId = aktywnoscId }, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Zmiana zdjęcia głównego aktywnosci
        /// </summary>
        /// <param name="id">
        /// Id zdjecia głownego.
        /// </param>
        [HttpPost("{id}/set-main-aktywnosc/{aktywnoscId}")]
        public async Task<ActionResult<PhotoDTO>> SetMain(string id, Guid aktywnoscId, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new SetMainEventPhoto.Command() { Id = id, EventId = aktywnoscId }, cancellationToken);

            return Ok();
        }
    }
}
