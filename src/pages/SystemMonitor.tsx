import { useState, useEffect } from 'react';
import { Shield, Menu, Server, Globe, RefreshCw, Activity, HardDrive, Clock, Cpu, Database, Server as ServerIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const generateMockSystemData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      cpu: Math.floor(Math.random() * 60) + 10,
      memory: Math.floor(Math.random() * 40) + 30,
      load1: (Math.random() * 2 + 0.5).toFixed(2),
      load5: (Math.random() * 1.5 + 0.3).toFixed(2),
      load15: (Math.random() * 1 + 0.2).toFixed(2)
    });
  }
  return data;
};

const generateMockDiskData = () => {
  return [
    { name: '/dev/sda1', total: 500, used: 280, free: 220, usage: 56 },
    { name: '/dev/sda2', total: 1000, used: 450, free: 550, usage: 45 },
    { name: '/dev/sda3', total: 200, used: 150, free: 50, usage: 75 }
  ];
};

export default function SystemMonitor() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [systemData, setSystemData] = useState(generateMockSystemData());
  const [diskData, setDiskData] = useState(generateMockDiskData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSystemData(generateMockSystemData());
      setDiskData(generateMockDiskData());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...systemData.slice(1)];
      const now = new Date();
      newData.push({
        time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.floor(Math.random() * 60) + 10,
        memory: Math.floor(Math.random() * 40) + 30,
        load1: (Math.random() * 2 + 0.5).toFixed(2),
        load5: (Math.random() * 1.5 + 0.3).toFixed(2),
        load15: (Math.random() * 1 + 0.2).toFixed(2)
      });
      setSystemData(newData);
    }, 60000);

    return () => clearInterval(interval);
  }, [systemData]);

  const currentCpu = systemData[systemData.length - 1]?.cpu || 0;
  const currentMemory = systemData[systemData.length - 1]?.memory || 0;
  const currentLoad1 = systemData[systemData.length - 1]?.load1 || 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow-sm z-40">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">系统资源监控</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">管理员</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">当前服务器:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedServer.id}
                onChange={(e) => setSelectedServer(mockServers.find(s => s.id === e.target.value) || mockServers[0])}
              >
                {mockServers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name} ({server.ip}) - {server.firewallType}
                  </option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>刷新数据</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">CPU使用率</h3>
                <Cpu className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentCpu}%</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">内存使用率</h3>
                <Database className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentMemory}%</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">1分钟负载</h3>
                <ServerIcon className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentLoad1}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">磁盘使用率</h3>
                <HardDrive className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(diskData.reduce((sum, disk) => sum + disk.usage, 0) / diskData.length)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU & 内存使用趋势（最近30分钟）</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} name="CPU (%)" />
                  <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} name="内存 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">系统负载趋势（最近30分钟）</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="load1" stroke="#F59E0B" strokeWidth={2} name="1分钟" />
                  <Line type="monotone" dataKey="load5" stroke="#EF4444" strokeWidth={2} name="5分钟" />
                  <Line type="monotone" dataKey="load15" stroke="#8B5CF6" strokeWidth={2} name="15分钟" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">磁盘使用情况</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      设备
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      总空间 (GB)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      已用 (GB)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      可用 (GB)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      使用率
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {diskData.map((disk, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {disk.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {disk.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {disk.used}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {disk.free}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${disk.usage > 70 ? 'bg-red-500' : disk.usage > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${disk.usage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-12">{disk.usage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
