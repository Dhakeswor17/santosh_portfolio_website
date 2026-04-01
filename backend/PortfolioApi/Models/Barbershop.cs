namespace PortfolioApi.Models;

public class Barbershop
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public string? Phone { get; set; }
    public required string PriceRange { get; set; }
    public string[] Services { get; set; } = Array.Empty<string>();
    public string? OpeningHours { get; set; }
    public string? ImageUrl { get; set; }
}

public class BarbershopSearchRequest
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double RadiusKm { get; set; } = 5.0;
}
