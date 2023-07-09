using AutoMapper;
using FluentValidation;
using MediatR;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Commands
{
    public class DeleteEvent
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty().NotNull();
            }
        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;

            public Handler(IEventRepository eventRepository, IMapper mapper)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _eventRepository.DeleteAsync(request.Id);
            }
        }
    }
}
