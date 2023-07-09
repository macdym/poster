using FluentValidation;
using poster.application.Places.DTOs;

namespace poster.application.Places.Validators
{
    public class PlaceValidator : AbstractValidator<PlaceDTO>
    {
        public PlaceValidator()
        {
            RuleFor(x => x.Street).NotEmpty().NotNull().MinimumLength(3);
            RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(3);
            RuleFor(x => x.CityId).NotEmpty().NotNull();
        }
    }
}
