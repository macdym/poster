using AutoMapper;
using FluentValidation;
using MediatR;
using poster.application.Categories.DTOs;
using poster.application.Categories.Validators;
using poster.domain;
using poster.persistance.Categories.Repositories.Interfaces;

namespace poster.application.Categories.Commands
{
    public class UpdateCategory
    {
        public class Command : IRequest
        {
            public CategoryDTO Dto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Dto).SetValidator(new CategoryValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ICategoryRepository _categoryRepository;
            private readonly IMapper _mapper;

            public Handler(ICategoryRepository categoryRepository, IMapper mapper)
            {
                _categoryRepository = categoryRepository;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var category = _mapper.Map<Category>(request.Dto);
                await _categoryRepository.UpdateAsync(category);
            }
        }
    }
}
