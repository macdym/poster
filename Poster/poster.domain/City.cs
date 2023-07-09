namespace poster.domain
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Place> Places { get; set; }
    }
}
