using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using poster.application.Users.Commands;
using poster.application.Users.DTOs;
using poster.domain;

namespace poster.api.Controllers
{
    public class UsersController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UsersController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }


        /// <summary>
        /// Pobieranie wszystkich użytkowników
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetAll(CancellationToken cancellationToken = default)
        {
            var usersDb = await _userManager
                .Users
                .Include(x => x.Photos)
                .ToListAsync();

            var users = _mapper.Map<List<UserDTO>>(usersDb);

            foreach (var user in users)
            {
                var role = await _userManager.GetRolesAsync(usersDb.FirstOrDefault(x => x.UserName == user.UserName));
                user.Role = role.FirstOrDefault();

            }

            return users;
        }

        /// <summary>
        /// Pobieranie użytkownika
        /// </summary>
        /// <param name="username">
        /// Username nazwa użytkownika.
        /// </param>
        [HttpGet("{username}")]
        public async Task<ActionResult<UserDTO>> Get(string username, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.Users
                .Include(x => x.Photos)
                .Include(x => x.Events)
                .ThenInclude(x => x.Event)
                .Include(x => x.Followers)
                .ThenInclude(x => x.Observer)
                .Include(x => x.Followings)
                .FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
            {
                return NotFound("Brak użytkownika o wskazanej nazwie");
            }

            var result = _mapper.Map<UserDTO>(user);
            var role = await _userManager.GetRolesAsync(user);
            result.Role = role.FirstOrDefault();
            result.Following = user.Followers.Any(x => x.Observer.UserName == User.Identity.Name);

            return result;
        }

        /// <summary>
        /// Aktualizowanie użytkownika
        /// </summary>
        /// <param name = "user" >
        /// Obiekt UpdateUserDTO zawierajacy pola zaktualizowanego obiektu User.
        /// </param>
        [Authorize(Policy = "IsCurrentUserOrAdmin")]
        [HttpPut("{username}/update-profile")]
        public async Task<IActionResult> Update(UpdateUserDTO user, CancellationToken cancellationToken = default)
        {
            await Mediator.Send(new UpdateUser.Command { DTO = user }, cancellationToken);
            return Ok();
        }
    }
}
