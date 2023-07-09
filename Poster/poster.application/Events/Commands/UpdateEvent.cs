using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Events.DTOs;
using poster.application.Events.Validators;
using poster.domain;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Commands
{
    public class UpdateEvent
    {
        public class Command : IRequest
        {
            public UpdateEventDTO Dto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Dto).SetValidator(new UpdateEventValidator());
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
                var @event = _mapper.Map<Event>(request.Dto);
                @event.IsActive = true;
                await _eventRepository.UpdateAsync(@event);
            }
        }
    }
}
