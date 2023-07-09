using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using poster.api.Services;
using poster.application.Photos.DTOs;
using poster.application.Users.DTOs;
using poster.application.Users.Validators;
using poster.domain;
using System.Security.Claims;
using System.Text.Json;

namespace poster.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, TokenService tokenService, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _configuration = configuration;
        }

        /// <summary>
        /// Logowanie użytkownika
        /// </summary>
        /// <param name = "registerUserDTO" >
        /// Dane formularza logowania - obiekt LoginUserDTO.
        /// </param>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginUserDTO loginUserDTO)
        {
            var user = await _userManager.Users
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginUserDTO.Email);

            if (user == null) return Unauthorized("Wprowadziłeś niepoprawny email lub hasło.");

            if (!user.IsActive)
            {
                return BadRequest("Twoje konto jest nieaktywne.");
            }

            var result = await _userManager.CheckPasswordAsync(user, loginUserDTO.Password);

            var userRole = await _userManager.GetRolesAsync(user);

            var userPhotos = _mapper.Map<List<PhotoDTO>>(user.Photos);

            if (result)
            {
                return new UserDTO
                {
                    Token = _tokenService.CreateToken(user, userRole.FirstOrDefault()),
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Image = user.Photos?.FirstOrDefault(x => x.IsMain && !x.IsBackgroundPhoto)?.Url,
                    BackgroundImage = user.Photos?.FirstOrDefault(x => x.IsMain && x.IsBackgroundPhoto)?.Url,
                    Photos = userPhotos,
                    IsActive = user.IsActive,
                    Email = user.Email,
                    Role = userRole.FirstOrDefault(),
                };
            }

            return Unauthorized("Wprowadziłeś niepoprawny email lub hasło.");
        }

        /// <summary>
        /// Rejestracja użytkownika
        /// </summary>
        /// <param name = "registerUserDTO" >
        /// Dane formularza rejestracyjnego - obiekt RegisterUserDTO.
        /// </param>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterUserDTO registerUserDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerUserDTO.Username))
            {
                return BadRequest("Użytkownik o podanej nazwie już istnieje.");
            }
            if (await _userManager.Users.AnyAsync(x => x.Email == registerUserDTO.Email))
            {
                return BadRequest("Podany adres email jest zajęty.");
            }

            var user = new User
            {
                UserName = registerUserDTO.Username,
                Email = registerUserDTO.Email,
                DisplayName = registerUserDTO.DisplayName,
                IsActive = true,
            };

            var result = await _userManager.CreateAsync(user, registerUserDTO.Password);
            await _userManager.AddToRoleAsync(user, "USER");

            if (result.Succeeded)
            {
                return new UserDTO
                {
                    Token = _tokenService.CreateToken(user, "USER"),
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsActive = user.IsActive,
                    Role = "USER"
                };
            }

            return BadRequest(result.Errors);
        }

        /// <summary>
        /// Pobieranie bierzącego użytkownika
        /// </summary>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var userRole = await _userManager.GetRolesAsync(user);

            var userPhotos = _mapper.Map<List<PhotoDTO>>(user.Photos);

            return new UserDTO
            {
                Token = _tokenService.CreateToken(user, userRole.FirstOrDefault()),
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = user.Photos?.FirstOrDefault(x => x.IsMain && !x.IsBackgroundPhoto)?.Url,
                BackgroundImage = user.Photos?.FirstOrDefault(x => x.IsMain && x.IsBackgroundPhoto)?.Url,
                Photos = userPhotos,
                IsActive = user.IsActive,
                Email = user.Email,
                Role = userRole.FirstOrDefault()
            };
        }

        /// <summary>
        /// Dezaktywacja użytkownika
        /// </summary>
        /// <param name = "username" >
        /// Username użytkownika.
        /// </param>
        [Authorize(Policy = "IsCurrentUserOrAdmin")]
        [HttpPut("{username}/deactivate")]
        public async Task<IActionResult> Deactivate(string username, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (!await _userManager.IsInRoleAsync(user, "ADMIN"))
            {
                user.IsActive = false;
                await _userManager.UpdateAsync(user);
            }
            else
            {
                return BadRequest("Nie można dezaktywować konta ADMIN");
            }

            return Ok();
        }

        /// <summary>
        /// Aktywacja użytkownika
        /// </summary>
        /// <param name = "username" >
        /// Username użytkownika.
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut("{username}/activate")]
        public async Task<IActionResult> Activate(string username, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByNameAsync(username);

            user.IsActive = true;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        /// <summary>
        /// Zmiana hasła użytkownika
        /// </summary>
        /// <param name = "dto" >
        /// Dane formularza zmiany hasła - ChangePasswordDTO.
        /// </param>
        [Authorize(Policy = "IsCurrentUserOrAdmin")]
        [HttpPut("{username}/changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO dto, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);

            var currentPasswordResult = await _userManager.CheckPasswordAsync(user, dto.CurrentPassword);

            if (currentPasswordResult)
            {
                var validator = new ChangePasswordValidator();
                var validationResult = await validator.ValidateAsync(dto);
                if (validationResult.IsValid)
                {
                    await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
                }
                else
                {
                    return BadRequest(validationResult.Errors.FirstOrDefault()?.ErrorMessage);
                }
            }
            else
            {
                return BadRequest("Wprowadziłeś niepoprawne bierzące hasło");
            }


            return Ok();
        }

        /// <summary>
        /// Resetowanie hasła użytkownika
        /// </summary>
        /// <param name = "username" >
        /// Name użytkownika
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut("{username}/reset-password")]
        public async Task<IActionResult> ResetPassword(string username, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByNameAsync(username);

            await _userManager.RemovePasswordAsync(user);
            await _userManager.AddPasswordAsync(user, _configuration["DefaultPassword"]);

            return Ok();
        }

        /// <summary>
        /// Aktualizacja roli użytkownika
        /// </summary>
        /// <param name = "username" >
        /// Name użytkownika
        /// </param>
        /// <param name = "dto" >
        /// Nowa rola użytkownika
        /// </param>
        [Authorize(Policy = "IsAdmin")]
        [HttpPut("{username}/update-role")]
        public async Task<IActionResult> UpdateRole(string username, UpdateRoleDTO dto, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user.UserName == "Admin") return BadRequest("Nie można zmienić roli Administratora systemu");

            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
            await _userManager.AddToRoleAsync(user, dto.Role);

            return Ok();
        }
    }
}
