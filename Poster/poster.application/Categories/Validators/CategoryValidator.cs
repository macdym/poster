using FluentValidation;
using poster.application.Categories.DTOs;

namespace poster.application.Categories.Validators
{
    public class CategoryValidator : AbstractValidator<CategoryDTO>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(10);
        }
    }
}
