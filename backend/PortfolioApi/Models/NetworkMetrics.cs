namespace PortfolioApi.Models;

public class NetworkMetrics
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public double CpuUsage { get; set; }
    public double MemoryUsage { get; set; }
    public double NetworkThroughput { get; set; }
    public int ActiveConnections { get; set; }
    public double ResponseTime { get; set; }
}

public class SystemStatus
{
    public required string NodeName { get; set; }
    public required string Status { get; set; }
    public double Uptime { get; set; }
    public double CpuUsage { get; set; }
    public double MemoryUsage { get; set; }
    public DateTime LastChecked { get; set; } = DateTime.UtcNow;
}

public class Alert
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Severity { get; set; }
    public required string Message { get; set; }
    public required string Source { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public bool Acknowledged { get; set; } = false;
}
