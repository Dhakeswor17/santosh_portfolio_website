using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PortfolioApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Technologies = table.Column<string[]>(type: "text[]", nullable: false),
                    GithubUrl = table.Column<string>(type: "text", nullable: true),
                    LiveUrl = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "CreatedAt", "Description", "GithubUrl", "ImageUrl", "LiveUrl", "Technologies", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 3, 30, 8, 5, 35, 63, DateTimeKind.Utc).AddTicks(7225), "Developed automation scripts for server deployment and network configuration in large-scale data center environments. Reduced deployment time by 40% and minimized human error.", null, "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/4c21638db175ad02b5fc66c46c68486633cec27c3788c915b792294b67300223.png", null, new[] { "Python", "Bash", "Linux", "Network Automation" }, "Data Center Infrastructure Automation" },
                    { 2, new DateTime(2026, 3, 30, 8, 5, 35, 63, DateTimeKind.Utc).AddTicks(7231), "Built a real-time network monitoring dashboard for tracking data center performance metrics, system health, and incident alerts. Integrated with multiple data sources for comprehensive visibility.", null, "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/f2c56b726d38cdfccb6bbb9eba396241d5d178d36b78b0b7f365892d672ba159.png", null, new[] { "React", "TypeScript", "Node.js", "PostgreSQL" }, "Network Monitoring Dashboard" },
                    { 3, new DateTime(2026, 3, 30, 8, 5, 35, 63, DateTimeKind.Utc).AddTicks(7234), "Created a full-stack application to track server hardware lifecycle, maintenance schedules, and asset management. Improved operational efficiency and preventive maintenance planning.", null, "https://static.prod-images.emergentagent.com/jobs/6873ee99-1441-48fe-ae88-ccaafe02c125/images/c1750c90b3deb7c014fce746335daa20e6f30d44da47ca8af0b4bcdd592a56dc.png", null, new[] { "C#", "ASP.NET Core", "PostgreSQL", "React" }, "Hardware Lifecycle Management System" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "Category", "Level", "Name" },
                values: new object[,]
                {
                    { 1, "Programming Languages", 85, "C#" },
                    { 2, "Programming Languages", 90, "JavaScript" },
                    { 3, "Programming Languages", 88, "TypeScript" },
                    { 4, "Programming Languages", 85, "Python" },
                    { 5, "Programming Languages", 70, "Java" },
                    { 6, "Frontend", 90, "React" },
                    { 7, "Backend", 85, "Node.js" },
                    { 8, "Backend", 82, "ASP.NET Core" },
                    { 9, "Database", 85, "PostgreSQL" },
                    { 10, "Infrastructure", 92, "Linux" },
                    { 11, "Infrastructure", 95, "Networking" },
                    { 12, "DevOps", 80, "Docker" },
                    { 13, "DevOps", 88, "Git" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Skills");
        }
    }
}
