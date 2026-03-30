namespace PortfolioApi.Models;

public class Project
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
    public string[] Technologies { get; set; } = Array.Empty<string>();
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
