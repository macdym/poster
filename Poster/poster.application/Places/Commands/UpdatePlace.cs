using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Places.DTOs;
using poster.application.Places.Validators;
using poster.domain;
using poster.persistance.Places.Repositories.Interfaces;

namespace poster.application.Places.Commands
{
    public class UpdatePlace
    {
        public class Command : IRequest
        {
            public PlaceDTO Dto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Dto).SetValidator(new PlaceValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IPlaceRepository _placeRepository;
            private readonly IMapper _mapper;

            public Handler(IPlaceRepository placeRepository, IMapper mapper)
            {
                _placeRepository = placeRepository;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var place = _mapper.Map<Place>(request.Dto);
                await _placeRepository.UpdateAsync(place);
            }
        }
    }
}
