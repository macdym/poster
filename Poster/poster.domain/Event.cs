namespace poster.domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public ICollection<EventUser> Users { get; set; } = new List<EventUser>();
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        public int? PlaceId { get; set; }
        public Place Place { get; set; }
        public int? CityId { get; set; }
        public City City { get; set; }
    }
}
