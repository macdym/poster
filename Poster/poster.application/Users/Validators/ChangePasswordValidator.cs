using FluentValidation;
using poster.application.Events.DTOs;
using poster.application.Users.DTOs;

namespace poster.application.Users.Validators
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordDTO>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty().WithMessage("Bierzące hasło jest wymagane.");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("Nowe hasło jest wymagane.")
                .MinimumLength(6).WithMessage("Nowe hasło jest za krótkie.")
                .NotEqual(x => x.CurrentPassword).WithMessage("Nowe hasło musi się różnić od poprzedniego.");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty().WithMessage("Potwierdzenie hasła jest wymagane.")
                .Equal(x => x.NewPassword).WithMessage("Hasła do siebie nie pasują.");
        }
    }
}
