namespace poster.domain
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string Building { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}
