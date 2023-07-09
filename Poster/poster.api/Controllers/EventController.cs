using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poster.application.Events.Commands;
using poster.application.Events.DTOs;
using poster.application.Events.Queries;

namespace poster.api.Controllers
{

    public class EventController : BaseController
    {
        public EventController()
        {
        }


        /// <summary>
        /// Pobieranie wszystkich wydarzeń
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<EventDTO>>> GetAll(CancellationToken cancellationToken = default)
        {
            return await Mediator.Send(new GetAllEvents.Query(), cancellationToken);
        }

        /// <summary>
        /// Pobieranie wydarzeń
        /// </summary>
        /// <param name="id">
        /// Guid id wydarzenia.
        /// </param>
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDTO>> Get(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                return await Mediator.Send(new GetEventById.Query { Id = id }, cancellationToken);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Pobieranie wydarzeń użytkownika
        /// </summary>
        /// <param name="username">
        /// Name użytkownika
        /// </param>
        [HttpGet("{username}/byuser")]
        public async Task<ActionResult<List<EventDTO>>> Get(string username, CancellationToken cancellationToken = default)
        {
            var events = await Mediator.Send(new GetAllEvents.Query(), cancellationToken);

            return events.Where(x => x.Users.Any(u => u.UserName == username)).ToList();
        }

        /// <summary>
        /// Filtrowanie events
        /// </summary>
        /// <param name="dto">
        /// Obiekt EventFilterDTO zawierajacy filtry.
        /// </param>
        /// 
        [Route("filter")]
        [HttpGet]
        public async Task<ActionResult<List<EventDTO>>> Get([FromQuery] EventFilterDTO dto, CancellationToken cancellationToken = default)
        {
            return await Mediator.Send(new GetFilteredEvents.Query { Dto = dto }, cancellationToken);
        }

        /// <summary>
        /// Tworzenie nowego wydarzenia
        /// </summary>
        /// <param name="dto">
        /// Obiekt CreateEventDTO zawierajacy pola nowego obiektu Event.
        /// </param>
        [HttpPost]
        public async Task<ActionResult<Guid>> Create(CreateEventDTO dto, CancellationToken cancellationToken = default)
        {
            var eventId = await Mediator.Send(new CreateEvent.Command { Dto = dto }, cancellationToken);
            return Ok(eventId);
        }

        /// <summary>
        /// Zapisywanie się do wydarzenia
        /// </summary>
        /// <param name="id">
        /// Id Events.
        /// </param>
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new UpdateEventUser.Command { Id = id }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Aktualizowanie wydarzenia
        /// </summary>
        /// <param name="event">
        /// Obiekt UpdateEventDTO zawierajacy pola zaktualizowanego obiektu Event.
        /// </param>
        [Authorize(Policy = "IsHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateEventDTO @event, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new UpdateEvent.Command { Dto = @event }, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Usuwanie wydarzenia
        /// </summary>
        /// <param name="id">
        /// Guid id wydarzenia.
        /// </param>
        [Authorize(Policy = "IsHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new DeleteEvent.Command { Id = id }, cancellationToken);
            return Ok();
        }
    }
}
