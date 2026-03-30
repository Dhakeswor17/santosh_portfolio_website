import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowLeft, FaServer, FaExclamationTriangle, FaCheckCircle, FaClock, FaNetworkWired } from 'react-icons/fa';

export default function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [systems, setSystems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [metricsRes, historyRes, systemsRes, alertsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/dashboard/metrics`),
        axios.get(`${backendUrl}/api/dashboard/metrics/history?count=12`),
        axios.get(`${backendUrl}/api/dashboard/systems`),
        axios.get(`${backendUrl}/api/dashboard/alerts`)
      ]);

      setMetrics(metricsRes.data);
      setMetricsHistory(historyRes.data.map(m => ({
        ...m,
        time: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      })));
      setSystems(systemsRes.data);
      setAlerts(alertsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const acknowledgeAlert = async (alertId) => {
    try {
      await axios.post(`${backendUrl}/api/dashboard/alerts/${alertId}/acknowledge`);
      setAlerts(alerts.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <p className="text-[#A1A1AA]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              data-testid="back-to-portfolio"
              className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#F4F4F5]">Network Monitoring Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[#A1A1AA]">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div data-testid="metric-cpu" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">CPU Usage</p>
            <p className="text-3xl font-bold text-[#F4F4F5] mb-1">{metrics?.cpuUsage}%</p>
            <p className="text-xs text-[#A1A1AA]">Across all nodes</p>
          </div>

          <div data-testid="metric-memory" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">Memory Usage</p>
            <p className="text-3xl font-bold text-[#F4F4F5] mb-1">{metrics?.memoryUsage}%</p>
            <p className="text-xs text-[#A1A1AA]">Average utilization</p>
          </div>

          <div data-testid="metric-throughput" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">Network Throughput</p>
            <p className="text-3xl font-bold text-[#F4F4F5] mb-1">{metrics?.networkThroughput}</p>
            <p className="text-xs text-[#A1A1AA]">Mbps</p>
          </div>

          <div data-testid="metric-connections" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">Active Connections</p>
            <p className="text-3xl font-bold text-[#F4F4F5] mb-1">{metrics?.activeConnections}</p>
            <p className="text-xs text-[#A1A1AA]">Current sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div data-testid="chart-performance" className="bg-[#18181B] border border-white/5 rounded-lg p-8">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-6">Performance Metrics (Last Hour)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={metricsHistory}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4D9FFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4D9FFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7CB9FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7CB9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#A1A1AA" style={{ fontSize: '12px' }} />
                <YAxis stroke="#A1A1AA" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#F4F4F5'
                  }}
                />
                <Area type="monotone" dataKey="cpuUsage" stroke="#4D9FFF" fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="memoryUsage" stroke="#7CB9FF" fillOpacity={1} fill="url(#colorMemory)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div data-testid="chart-throughput" className="bg-[#18181B] border border-white/5 rounded-lg p-8">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-6">Network Throughput</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#A1A1AA" style={{ fontSize: '12px' }} />
                <YAxis stroke="#A1A1AA" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#F4F4F5'
                  }}
                />
                <Line type="monotone" dataKey="networkThroughput" stroke="#4D9FFF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div data-testid="system-status" className="lg:col-span-2 bg-[#18181B] border border-white/5 rounded-lg p-8">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-6 flex items-center gap-2">
              <FaServer className="text-[#4D9FFF]" />
              System Status
            </h2>
            <div className="space-y-4">
              {systems.map((system, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'healthy' ? 'bg-green-500' :
                        system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-semibold text-[#F4F4F5]">{system.nodeName}</span>
                    </div>
                    <span className="text-xs text-[#71717A]">Uptime: {system.uptime}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#71717A] mb-1">CPU</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4D9FFF] rounded-full" style={{ width: `${system.cpuUsage}%` }} />
                        </div>
                        <span className="text-xs text-[#A1A1AA]">{system.cpuUsage}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-1">Memory</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#7CB9FF] rounded-full" style={{ width: `${system.memoryUsage}%` }} />
                        </div>
                        <span className="text-xs text-[#A1A1AA]">{system.memoryUsage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-testid="alerts-panel" className="bg-[#18181B] border border-white/5 rounded-lg p-8">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-6 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500" />
              Recent Alerts
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
                  <p className="text-sm text-[#A1A1AA]">All systems operational</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${
                      alert.acknowledged ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
                        alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        alert.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.severity}
                      </span>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-xs text-[#4D9FFF] hover:text-[#7CB9FF]"
                        >
                          Ack
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-[#F4F4F5] mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-[#71717A]">
                      <span>{alert.source}</span>
                      <span className="flex items-center gap-1">
                        <FaClock size={10} />
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
