namespace poster.application.Events.DTOs
{
    public class UpdateEventDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int? CityId { get; set; }
        public int? PlaceId { get; set; }
    }
}
