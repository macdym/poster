namespace poster.application.Places.DTOs
{
    public class PlaceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string Building { get; set; }
        public int? CityId { get; set; }
        public string City { get; set; }
    }
}
