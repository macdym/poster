using FluentValidation;
using MediatR;
using poster.persistance.Cities.Respositories.Interfaces;

namespace poster.application.Cities.Commands
{
    public class DeleteCity
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

            private readonly ICityRepository _citiesRepository;

            public Handler(ICityRepository citiesRepository)
            {
                _citiesRepository = citiesRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _citiesRepository.DeleteAsync(request.Id);
            }
        }
    }
}
