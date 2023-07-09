using Microsoft.AspNetCore.Mvc;
using poster.application.Followers.Commands;
using poster.application.Followers.Queries;
using poster.application.Users.DTOs;

namespace poster.api.Controllers
{
    public class FollowController : BaseController
    {
        [HttpPost("{username}")]
        public async Task<ActionResult> Follow(string username)
        {
            await Mediator.Send(new FollowToggler.Command { TargetUserName = username });

            return Ok();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<List<UserDTO>>> GetFollowings(string username, string predicate)
        {
            return await Mediator.Send(new GetFollowers.Query { Username = username, Predicate = predicate });
        }
    }
}
