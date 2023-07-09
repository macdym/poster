using MediatR;
using Microsoft.AspNetCore.SignalR;
using poster.application.Comments.Commands;
using poster.application.Comments.Queries;

namespace poster.api.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(AddComment.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.EventId.ToString()).SendAsync("ReceiveComment", comment);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var aktywnoscId = httpContext.Request.Query["aktywnoscId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, aktywnoscId);

            var result = await _mediator.Send(new GetAllComments.Query { EventId = Guid.Parse(aktywnoscId) });

            await Clients.Caller.SendAsync("LoadComments", result);
        }
    }
}
