import { useState, useEffect } from 'react';
import { Shield, Menu, Server, Globe, Play, Pause, RefreshCw, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const mockServices = [
  { id: '1', name: 'sshd', status: 'running', description: 'OpenSSH server daemon' },
  { id: '2', name: 'nginx', status: 'running', description: 'Nginx web server' },
  { id: '3', name: 'mysql', status: 'stopped', description: 'MySQL database server' },
  { id: '4', name: 'firewalld', status: 'running', description: 'Firewall daemon' },
  { id: '5', name: 'docker', status: 'running', description: 'Docker application container engine' },
  { id: '6', name: 'apache2', status: 'stopped', description: 'Apache web server' }
];

export default function ServicesManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [services, setServices] = useState(mockServices);

  const handleServiceAction = (id: string, action: 'start' | 'stop' | 'restart') => {
    setServices(services.map(service => {
      if (service.id === id) {
        return {
          ...service,
          status: action === 'stop' ? 'stopped' : 'running'
        };
      }
      return service;
    }));
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
            <h2 className="text-xl font-semibold text-gray-900">服务管理</h2>
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
          </div>

          {/* 服务列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      服务名称
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      描述
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {service.status === 'running' ? '运行中' : '已停止'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {service.status === 'stopped' ? (
                          <button 
                            onClick={() => handleServiceAction(service.id, 'start')}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <Play className="h-5 w-5" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleServiceAction(service.id, 'stop')}
                            className="text-red-600 hover:text-red-900 mr-3"
                          >
                            <Pause className="h-5 w-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleServiceAction(service.id, 'restart')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
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