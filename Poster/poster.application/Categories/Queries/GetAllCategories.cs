using AutoMapper;
using MediatR;
using poster.application.Categories.DTOs;
using poster.persistance.Categories.Repositories.Interfaces;

namespace poster.application.Categories.Queries
{
    public class GetAllCategories
    {
        public class Query : IRequest<List<CategoryDTO>> { }

        public class Handler : IRequestHandler<Query, List<CategoryDTO>>
        {
            private readonly ICategoryRepository _categoryRepository;
            private readonly IMapper _mapper;

            public Handler(ICategoryRepository categoryRepository, IMapper mapper)
            {
                _categoryRepository = categoryRepository;
                _mapper = mapper;
            }

            public async Task<List<CategoryDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _categoryRepository.GetAllAsync();
                return _mapper.Map<List<CategoryDTO>>(categories);
            }
        }
    }
}
