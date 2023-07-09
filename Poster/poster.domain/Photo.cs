namespace poster.domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public bool IsBackgroundPhoto { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid? EventId { get; set; }
        public Event Event { get; set; }
    }
}
