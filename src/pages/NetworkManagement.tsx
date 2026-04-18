import { useState, useEffect } from 'react';
import { Shield, Menu, Server, Globe, RefreshCw, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const mockConnections = [
  { id: '1', protocol: 'TCP', localAddress: '192.168.1.100:22', foreignAddress: '10.0.0.1:54321', state: 'ESTABLISHED', process: 'sshd' },
  { id: '2', protocol: 'TCP', localAddress: '192.168.1.100:80', foreignAddress: '10.0.0.2:12345', state: 'ESTABLISHED', process: 'nginx' },
  { id: '3', protocol: 'TCP', localAddress: '192.168.1.100:443', foreignAddress: '10.0.0.3:23456', state: 'ESTABLISHED', process: 'nginx' },
  { id: '4', protocol: 'UDP', localAddress: '192.168.1.100:53', foreignAddress: '8.8.8.8:53', state: 'ESTABLISHED', process: 'dnsmasq' },
  { id: '5', protocol: 'TCP', localAddress: '192.168.1.100:3306', foreignAddress: '10.0.0.4:34567', state: 'ESTABLISHED', process: 'mysql' },
  { id: '6', protocol: 'TCP', localAddress: '192.168.1.100:22', foreignAddress: '10.0.0.5:45678', state: 'ESTABLISHED', process: 'sshd' },
  { id: '7', protocol: 'TCP', localAddress: '192.168.1.100:8080', foreignAddress: '10.0.0.6:56789', state: 'TIME_WAIT', process: 'java' },
  { id: '8', protocol: 'TCP', localAddress: '192.168.1.100:9090', foreignAddress: '10.0.0.7:67890', state: 'LISTEN', process: 'prometheus' }
];

export default function NetworkManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [connections, setConnections] = useState(mockConnections);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshConnections = () => {
    setIsRefreshing(true);
    // 模拟刷新操作
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 主内容 */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm z-40">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">网络管理</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">管理员</span>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 p-4 md:p-6">
          {/* 服务器选择 */}
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
              onClick={handleRefreshConnections}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>刷新连接</span>
            </button>
          </div>

          {/* 网络连接列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      协议
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      本地地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      外部地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      进程
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {connections.map((conn) => (
                    <tr key={conn.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {conn.protocol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conn.localAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conn.foreignAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${conn.state === 'ESTABLISHED' ? 'bg-green-100 text-green-800' : conn.state === 'LISTEN' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {conn.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conn.process}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* 遮罩层 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}