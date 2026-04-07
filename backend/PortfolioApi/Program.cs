using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Railway provides DATABASE_URL in postgres:// format, convert to Npgsql format
string connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? "";
if (connectionString.StartsWith("postgresql://") || connectionString.StartsWith("postgres://"))
{
    var uri = new Uri(connectionString);
    var userInfo = uri.UserInfo.Split(':');
    connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
}
else if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Host=localhost;Database=portfolio_db;Username=portfolio_user;Password=portfolio_pass";
}

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS") ?? "*";
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (corsOrigins == "*")
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        }
        else
        {
            policy.WithOrigins(corsOrigins.Split(','))
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    try
    {
        db.Database.EnsureCreated();
    }
    catch
    {
        // Database already exists, skip
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

// Railway sets PORT env var
var port = Environment.GetEnvironmentVariable("PORT") ?? "8001";
app.Run($"http://0.0.0.0:{port}");