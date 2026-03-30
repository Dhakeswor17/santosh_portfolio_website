namespace PortfolioApi.Models;

public class Skill
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public int Level { get; set; }
}
