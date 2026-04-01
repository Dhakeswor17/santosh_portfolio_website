using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BarbershopController : ControllerBase
{
    private static readonly List<Barbershop> _barbershops = new List<Barbershop>
    {
        new Barbershop
        {
            Id = 1,
            Name = "Classic Cuts Barber",
            Address = "Kauppakeskus Sello, Leppävaarankatu 3-9, Espoo",
            Latitude = 60.2178,
            Longitude = 24.8095,
            Rating = 4.5,
            ReviewCount = 142,
            Phone = "+358 40 123 4567",
            PriceRange = "€€",
            Services = new[] { "Haircut", "Beard Trim", "Hot Towel Shave" },
            OpeningHours = "Mon-Fri: 9:00-19:00, Sat: 10:00-16:00",
            ImageUrl = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400"
        },
        new Barbershop
        {
            Id = 2,
            Name = "Helsinki Barber Shop",
            Address = "Mannerheimintie 5, Helsinki",
            Latitude = 60.1699,
            Longitude = 24.9384,
            Rating = 4.8,
            ReviewCount = 218,
            Phone = "+358 40 234 5678",
            PriceRange = "€€€",
            Services = new[] { "Premium Haircut", "Beard Grooming", "Hair Coloring" },
            OpeningHours = "Mon-Sat: 10:00-20:00",
            ImageUrl = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400"
        },
        new Barbershop
        {
            Id = 3,
            Name = "Otaniemi Style Studio",
            Address = "Otakaari 24, Espoo",
            Latitude = 60.1867,
            Longitude = 24.8287,
            Rating = 4.3,
            ReviewCount = 89,
            Phone = "+358 40 345 6789",
            PriceRange = "€",
            Services = new[] { "Basic Haircut", "Student Discount" },
            OpeningHours = "Tue-Sat: 11:00-18:00",
            ImageUrl = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400"
        },
        new Barbershop
        {
            Id = 4,
            Name = "Gentleman's Grooming",
            Address = "Iso Omena, Piispansilta 11, Espoo",
            Latitude = 60.1615,
            Longitude = 24.7388,
            Rating = 4.7,
            ReviewCount = 167,
            Phone = "+358 40 456 7890",
            PriceRange = "€€€",
            Services = new[] { "Luxury Haircut", "Royal Shave", "Facial Treatment" },
            OpeningHours = "Mon-Sun: 10:00-21:00",
            ImageUrl = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400"
        },
        new Barbershop
        {
            Id = 5,
            Name = "Kamppi Cuts",
            Address = "Kamppi Center, Urho Kekkosen katu 1, Helsinki",
            Latitude = 60.1687,
            Longitude = 24.9319,
            Rating = 4.4,
            ReviewCount = 201,
            Phone = "+358 40 567 8901",
            PriceRange = "€€",
            Services = new[] { "Modern Haircut", "Beard Styling", "Hair Wash" },
            OpeningHours = "Mon-Fri: 9:00-20:00, Sat-Sun: 10:00-18:00",
            ImageUrl = "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400"
        },
        new Barbershop
        {
            Id = 6,
            Name = "Tapiola Barber House",
            Address = "Länsituulenkuja 3, Espoo",
            Latitude = 60.1758,
            Longitude = 24.8051,
            Rating = 4.6,
            ReviewCount = 134,
            Phone = "+358 40 678 9012",
            PriceRange = "€€",
            Services = new[] { "Classic Cut", "Fade", "Beard Trim" },
            OpeningHours = "Tue-Sat: 10:00-19:00",
            ImageUrl = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400"
        }
    };

    [HttpGet]
    public ActionResult<List<Barbershop>> GetAllBarbershops()
    {
        return _barbershops;
    }

    [HttpPost("search")]
    public ActionResult<List<Barbershop>> SearchNearby([FromBody] BarbershopSearchRequest request)
    {
        var nearbyShops = _barbershops
            .Select(shop => new
            {
                Shop = shop,
                Distance = CalculateDistance(request.Latitude, request.Longitude, shop.Latitude, shop.Longitude)
            })
            .Where(x => x.Distance <= request.RadiusKm)
            .OrderBy(x => x.Distance)
            .Select(x => x.Shop)
            .ToList();

        return nearbyShops;
    }

    [HttpGet("{id}")]
    public ActionResult<Barbershop> GetBarbershop(int id)
    {
        var shop = _barbershops.FirstOrDefault(b => b.Id == id);
        if (shop == null)
        {
            return NotFound();
        }
        return shop;
    }

    private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        const double R = 6371;
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return R * c;
    }

    private double ToRadians(double deg)
    {
        return deg * (Math.PI / 180);
    }
}
