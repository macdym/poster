using AutoMapper;
using MediatR;
using poster.application.Categories.DTOs;
using poster.persistance.Categories.Repositories.Interfaces;

namespace poster.application.Categories.Queries
{
    public class GetCategoryById
    {
        public class Query : IRequest<CategoryDTO>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CategoryDTO>
        {
            private readonly ICategoryRepository _categoryRepository;
            private readonly IMapper _mapper;

            public Handler(ICategoryRepository categoryRepository, IMapper mapper)
            {
                _categoryRepository = categoryRepository;
                _mapper = mapper;
            }

            public async Task<CategoryDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _categoryRepository.GetByIdAsync(request.Id);
                return _mapper.Map<CategoryDTO>(category);
            }
        }
    }
}
