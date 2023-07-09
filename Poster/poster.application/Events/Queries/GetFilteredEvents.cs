using AutoMapper;
using MediatR;
using poster.application.Events.DTOs;
using poster.application.Interfaces;
using poster.persistance.Events.Repositories.Interfaces;

namespace poster.application.Events.Queries
{
    public class GetFilteredEvents
    {

        public class Query : IRequest<List<EventDTO>>
        {
            public EventFilterDTO Dto { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<EventDTO>>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(IEventRepository eventRepository, IMapper mapper, IUserAccessor userAccessor)
            {
                _eventRepository = eventRepository;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }


            public async Task<List<EventDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _eventRepository.GetAllAsync();
                var eventDTOs = _mapper.Map<List<EventDTO>>(events);
                return Filter(request.Dto, eventDTOs);
            }

            private List<EventDTO> Filter(EventFilterDTO filters, IEnumerable<EventDTO> events)
            {
                events = events.Where(x => x.IsActive == filters.Active);

                if (!string.IsNullOrEmpty(filters.Field) && !string.IsNullOrEmpty(filters.Value?.Trim()))
                {
                    var value = filters.Value;
                    switch (filters.Field)
                    {

                        case "tytul":
                            events = events.Where(x => !string.IsNullOrEmpty(x.Title) && x.Title.Contains(value, StringComparison.InvariantCultureIgnoreCase));
                            break;
                        case "kategoria":
                            events = events.Where(x => !string.IsNullOrEmpty(x.Category) && x.Category.Contains(value, StringComparison.InvariantCultureIgnoreCase));
                            break;
                        case "miasto":
                            events = events.Where(x => !string.IsNullOrEmpty(x.City) && x.City.Contains(value, StringComparison.InvariantCultureIgnoreCase));
                            break;
                        case "miejsce":
                            events = events.Where(x => !string.IsNullOrEmpty(x.Place) && x.Place.Contains(value, StringComparison.InvariantCultureIgnoreCase));
                            break;
                        case "organizator":
                            events = events.Where(x => x.Vendor != null && x.Vendor.UserName.Contains(value, StringComparison.InvariantCultureIgnoreCase));
                            break;
                        default: break;
                    }
                }
                if (!string.IsNullOrEmpty(filters.Filter))
                {
                    switch (filters.Filter)
                    {
                        case "my":
                            events = events.Where(x => x.Vendor != null &&
                                x.Vendor.UserName.Contains(_userAccessor.GetUsername(), StringComparison.InvariantCultureIgnoreCase));
                            break;
                        case "joined":
                            var groupedActivities = events.GroupBy(x => new { Aktywnosc = x, Users = x.Users.Select(x => x.UserName) });
                            var filteredActivities = groupedActivities.Where(x =>
                                x.Key.Users.Any(user => string.Equals(user, _userAccessor.GetUsername(), StringComparison.InvariantCultureIgnoreCase)));

                            events = filteredActivities.Select(x => x.Key.Aktywnosc);
                            break;
                        default: break;
                    }
                }
                if (filters.From.HasValue)
                {
                    events = events.Where(x => x.Date >= filters.From.Value);
                }
                if (filters.To.HasValue)
                {
                    events = events.Where(x => x.Date <= filters.To.Value);
                }

                return events.ToList();
            }
        }
    }
}
