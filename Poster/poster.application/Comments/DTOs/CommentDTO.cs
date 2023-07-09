﻿namespace poster.application.Comments.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string Body { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}
