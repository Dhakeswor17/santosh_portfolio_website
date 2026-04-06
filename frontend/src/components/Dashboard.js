import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowLeft, FaServer, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [systems, setSystems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const [metricsRes, historyRes, systemsRes, alertsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/dashboard/metrics`),
        axios.get(`${backendUrl}/api/dashboard/metrics/history?count=12`),
        axios.get(`${backendUrl}/api/dashboard/systems`),
        axios.get(`${backendUrl}/api/dashboard/alerts`)
      ]);

      setMetrics(metricsRes.data);
      setMetricsHistory(
        historyRes.data.map(m => ({
          ...m,
          time: new Date(m.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }))
      );
      setSystems(systemsRes.data);
      setAlerts(alertsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  }, [backendUrl]);

  // ✅ FIX: dependency added
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

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
            <button onClick={() => navigate('/')} className="text-[#A1A1AA] hover:text-[#F4F4F5]">
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#F4F4F5]">Network Monitoring Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] mb-2">CPU Usage</p>
            <p className="text-3xl text-white">{metrics?.cpuUsage}%</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] mb-2">Memory</p>
            <p className="text-3xl text-white">{metrics?.memoryUsage}%</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] mb-2">Throughput</p>
            <p className="text-3xl text-white">{metrics?.networkThroughput}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-xs text-[#71717A] mb-2">Connections</p>
            <p className="text-3xl text-white">{metrics?.activeConnections}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metricsHistory}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="cpuUsage" stroke="#4D9FFF" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}