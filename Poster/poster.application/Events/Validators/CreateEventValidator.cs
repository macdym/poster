using FluentValidation;
using poster.application.Events.DTOs;

namespace poster.application.Events.Validators
{
    public class CreateEventValidator : AbstractValidator<CreateEventDTO>
    {
        public CreateEventValidator()
        {
            RuleFor(x => x.Title).NotEmpty().NotNull().MinimumLength(10);
            RuleFor(x => x.Description).NotEmpty().NotNull().MinimumLength(10);
            RuleFor(x => x.CityId).NotEmpty().NotNull();
            RuleFor(x => x.PlaceId).NotEmpty().NotNull();
            RuleFor(x => x.Date).NotEmpty().NotNull();
            RuleFor(x => x.CategoryId).NotEmpty().NotNull();
            RuleFor(x => x.Date).NotEmpty().NotNull();
        }
    }
}
