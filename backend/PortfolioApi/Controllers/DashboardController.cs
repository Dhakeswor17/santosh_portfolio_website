using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private static readonly Random _random = new Random();
    private static readonly List<Alert> _alerts = new List<Alert>();
    private static DateTime _lastAlertGeneration = DateTime.UtcNow;

    [HttpGet("metrics")]
    public ActionResult<NetworkMetrics> GetCurrentMetrics()
    {
        var metrics = new NetworkMetrics
        {
            CpuUsage = Math.Round(30 + _random.NextDouble() * 40, 2),
            MemoryUsage = Math.Round(50 + _random.NextDouble() * 30, 2),
            NetworkThroughput = Math.Round(100 + _random.NextDouble() * 400, 2),
            ActiveConnections = _random.Next(50, 200),
            ResponseTime = Math.Round(10 + _random.NextDouble() * 50, 2)
        };

        return metrics;
    }

    [HttpGet("metrics/history")]
    public ActionResult<List<NetworkMetrics>> GetMetricsHistory([FromQuery] int count = 20)
    {
        var history = new List<NetworkMetrics>();
        var now = DateTime.UtcNow;

        for (int i = count - 1; i >= 0; i--)
        {
            var timestamp = now.AddMinutes(-i * 5);
            history.Add(new NetworkMetrics
            {
                Timestamp = timestamp,
                CpuUsage = Math.Round(30 + _random.NextDouble() * 40, 2),
                MemoryUsage = Math.Round(50 + _random.NextDouble() * 30, 2),
                NetworkThroughput = Math.Round(100 + _random.NextDouble() * 400, 2),
                ActiveConnections = _random.Next(50, 200),
                ResponseTime = Math.Round(10 + _random.NextDouble() * 50, 2)
            });
        }

        return history;
    }

    [HttpGet("systems")]
    public ActionResult<List<SystemStatus>> GetSystemStatus()
    {
        var systems = new List<SystemStatus>
        {
            new SystemStatus
            {
                NodeName = "DC-Node-01",
                Status = "healthy",
                Uptime = 99.98,
                CpuUsage = Math.Round(35 + _random.NextDouble() * 20, 2),
                MemoryUsage = Math.Round(55 + _random.NextDouble() * 15, 2)
            },
            new SystemStatus
            {
                NodeName = "DC-Node-02",
                Status = "healthy",
                Uptime = 99.95,
                CpuUsage = Math.Round(40 + _random.NextDouble() * 25, 2),
                MemoryUsage = Math.Round(60 + _random.NextDouble() * 20, 2)
            },
            new SystemStatus
            {
                NodeName = "DC-Node-03",
                Status = _random.NextDouble() > 0.7 ? "warning" : "healthy",
                Uptime = 99.92,
                CpuUsage = Math.Round(50 + _random.NextDouble() * 30, 2),
                MemoryUsage = Math.Round(65 + _random.NextDouble() * 20, 2)
            },
            new SystemStatus
            {
                NodeName = "DC-Node-04",
                Status = "healthy",
                Uptime = 99.99,
                CpuUsage = Math.Round(30 + _random.NextDouble() * 15, 2),
                MemoryUsage = Math.Round(50 + _random.NextDouble() * 15, 2)
            }
        };

        return systems;
    }

    [HttpGet("alerts")]
    public ActionResult<List<Alert>> GetAlerts()
    {
        if ((DateTime.UtcNow - _lastAlertGeneration).TotalSeconds > 30 && _random.NextDouble() > 0.5)
        {
            GenerateNewAlert();
            _lastAlertGeneration = DateTime.UtcNow;
        }

        return _alerts.OrderByDescending(a => a.Timestamp).Take(10).ToList();
    }

    [HttpPost("alerts/{id}/acknowledge")]
    public ActionResult AcknowledgeAlert(string id)
    {
        var alert = _alerts.FirstOrDefault(a => a.Id == id);
        if (alert != null)
        {
            alert.Acknowledged = true;
            return Ok();
        }
        return NotFound();
    }

    private void GenerateNewAlert()
    {
        var severities = new[] { "critical", "warning", "info" };
        var messages = new[]
        {
            "High CPU usage detected on DC-Node-03",
            "Network latency spike detected",
            "Memory usage approaching threshold",
            "Unusual traffic pattern detected",
            "Connection pool nearing capacity",
            "Disk I/O performance degraded"
        };
        var sources = new[] { "DC-Node-01", "DC-Node-02", "DC-Node-03", "DC-Node-04", "Load Balancer", "Network Gateway" };

        _alerts.Add(new Alert
        {
            Severity = severities[_random.Next(severities.Length)],
            Message = messages[_random.Next(messages.Length)],
            Source = sources[_random.Next(sources.Length)]
        });

        if (_alerts.Count > 50)
        {
            _alerts.RemoveAt(0);
        }
    }
}
