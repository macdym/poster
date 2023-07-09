using FluentValidation;
using MediatR;
using poster.persistance.Categories.Repositories.Interfaces;

namespace poster.application.Categories.Commands
{
    public class DeleteCategory
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
            private readonly ICategoryRepository _categoryRepository;

            public Handler(ICategoryRepository categoryRepository)
            {
                _categoryRepository = categoryRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _categoryRepository.DeleteAsync(request.Id);
            }
        }
    }
}
