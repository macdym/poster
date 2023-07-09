using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Cities.DTOs;
using poster.application.Cities.Validators;
using poster.domain;
using poster.persistance.Cities.Respositories.Interfaces;

namespace poster.application.Cities.Commands
{
    public class CreateCity
    {
        public class Command : IRequest
        {
            public CityDTO Dto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Dto).SetValidator(new CityValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ICityRepository _citiesRepository;
            private readonly IMapper _mapper;

            public Handler(ICityRepository citiesRepository, IMapper mapper)
            {
                _citiesRepository = citiesRepository;
                _mapper = mapper;
            }


            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var city = _mapper.Map<City>(request.Dto);
                await _citiesRepository.AddAsync(city);
            }
        }
    }
}
