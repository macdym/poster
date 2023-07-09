using FluentValidation;
using MediatR;
using poster.persistance.Places.Repositories.Interfaces;

namespace poster.application.Places.Commands
{
    public class DeletePlace
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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

            private readonly IPlaceRepository _placesRepository;

            public Handler(IPlaceRepository placesRepository)
            {
                _placesRepository = placesRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _placesRepository.DeleteAsync(request.Id);
            }
        }
    }
}
