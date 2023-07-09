using FluentValidation;
using poster.application.Cities.DTOs;

namespace poster.application.Cities.Validators
{
    public class CityValidator : AbstractValidator<CityDTO>
    {
        public CityValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty().MinimumLength(2);
        }
    }
}
