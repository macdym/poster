namespace poster.application.Events.DTOs
{
    public class EventFilterDTO
    {
        public string Field { get; set; }
        public string Value { get; set; }
        public string Filter { get; set; }
        public bool Active { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
