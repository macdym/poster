using MediatR;
using Microsoft.AspNetCore.SignalR;
using poster.application.GlobalChatMessages.Commands;
using poster.application.GlobalChatMessages.Queries;

namespace poster.api.SignalR
{
    public class GlobalChatHub : Hub
    {
        private readonly IMediator _mediator;

        public GlobalChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(AddGlobalChatMessage.Command command)
        {
            var message = await _mediator.Send(command);

            await Clients.Caller.SendAsync("ReceiveGlobalChatMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            var result = await _mediator.Send(new GetAllGlobalChatMessages.Query());

            await Clients.Caller.SendAsync("LoadGlobalChatMessages", result);
        }
    }
}
