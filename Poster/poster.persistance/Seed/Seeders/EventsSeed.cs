using poster.domain;

namespace poster.persistance.Seed.Seeders
{
    public static class EventsSeed
    {
        public static List<Event> Get() => new()
        {
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Warsztaty z UX Design",
                Date = new DateTime(2023, 06, 20, 9, 0, 0),
                Description = "Warsztaty dla początkujących z zakresu projektowania interfejsów użytkownika.",
                Category= new Category { Name = "Spotkania networkingowe" },
                 IsActive = true
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Koncert muzyki klasycznej",
                Date = new DateTime(2023, 07, 05, 19, 30, 0),
                Description = "Koncert muzyki klasycznej z udziałem czołowych polskich artystów.",
                Category = new Category { Name = "Warsztaty" },
                 IsActive = true
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Wystawa sztuki współczesnej",
                Date = new DateTime(2023, 07, 12, 10, 0, 0),
                Description = "Wystawa dzieł współczesnych artystów, m.in. malarstwa, rzeźby i instalacji.",
                Category = new Category { Name = "Warsztaty" },
                 IsActive = true
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Spacer po Parku Łazienkowskim",
                Date = new DateTime(2023, 08, 10, 15, 0, 0),
                Description = "Spacer po pięknym parku z licznymi zabytkami i stawami.",
                Category = new Category { Name = "Rekreacja na świeżym powietrzu" },
                IsActive = true,
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Festiwal Filmowy",
                Date = new DateTime(2023, 09, 05, 18, 0, 0),
                Description = "Wielotygodniowy festiwal filmowy z projekcjami filmów z całego świata.",
                Category = new Category { Name = "Wydarzenia kulturalne" },
                 IsActive = true
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Koncert Rockowy",
                Date = new DateTime(2023, 09, 15, 20, 0, 0),
                Description = "Występ znanych zespołów rockowych w towarzystwie energicznej publiczności.",
                Category = new Category { Name = "Koncerty" },
                 IsActive = true
            }
        };
    }
}
