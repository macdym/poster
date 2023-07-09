namespace poster.domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
    }
}
