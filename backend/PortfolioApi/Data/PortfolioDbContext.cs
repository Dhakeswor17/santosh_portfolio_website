using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Skill> Skills { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.ImageUrl).IsRequired();
            entity.Property(e => e.Technologies).IsRequired();
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Level).IsRequired();
        });

        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().HasData(
            new Project
            {
                Id = 1,
                Title = "Data Center Infrastructure Automation",
                Description = "Developed automation scripts for server deployment and network configuration in large-scale data center environments. Reduced deployment time by 40% and minimized human error.",
                ImageUrl = "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/4c21638db175ad02b5fc66c46c68486633cec27c3788c915b792294b67300223.png",
                Technologies = new[] { "Python", "Bash", "Linux", "Network Automation" },
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = 2,
                Title = "Network Monitoring Dashboard",
                Description = "Built a real-time network monitoring dashboard for tracking data center performance metrics, system health, and incident alerts. Integrated with multiple data sources for comprehensive visibility.",
                ImageUrl = "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/f2c56b726d38cdfccb6bbb9eba396241d5d178d36b78b0b7f365892d672ba159.png",
                Technologies = new[] { "React", "TypeScript", "Node.js", "PostgreSQL" },
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = 3,
                Title = "Hardware Lifecycle Management System",
                Description = "Created a full-stack application to track server hardware lifecycle, maintenance schedules, and asset management. Improved operational efficiency and preventive maintenance planning.",
                ImageUrl = "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/c1750c90b3deb7c014fce746335daa20e6f30d44da47ca8af0b4bcdd592a56dc.png",
                Technologies = new[] { "C#", "ASP.NET Core", "PostgreSQL", "React" },
                CreatedAt = DateTime.UtcNow
            }
        );

        modelBuilder.Entity<Skill>().HasData(
            new Skill { Id = 1, Name = "C#", Category = "Programming Languages", Level = 85 },
            new Skill { Id = 2, Name = "JavaScript", Category = "Programming Languages", Level = 90 },
            new Skill { Id = 3, Name = "TypeScript", Category = "Programming Languages", Level = 88 },
            new Skill { Id = 4, Name = "Python", Category = "Programming Languages", Level = 85 },
            new Skill { Id = 5, Name = "Java", Category = "Programming Languages", Level = 70 },
            new Skill { Id = 6, Name = "React", Category = "Frontend", Level = 90 },
            new Skill { Id = 7, Name = "Node.js", Category = "Backend", Level = 85 },
            new Skill { Id = 8, Name = "ASP.NET Core", Category = "Backend", Level = 82 },
            new Skill { Id = 9, Name = "PostgreSQL", Category = "Database", Level = 85 },
            new Skill { Id = 10, Name = "Linux", Category = "Infrastructure", Level = 92 },
            new Skill { Id = 11, Name = "Networking", Category = "Infrastructure", Level = 95 },
            new Skill { Id = 12, Name = "Docker", Category = "DevOps", Level = 80 },
            new Skill { Id = 13, Name = "Git", Category = "DevOps", Level = 88 }
        );
    }
}
