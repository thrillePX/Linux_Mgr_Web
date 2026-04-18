import { useState, useEffect } from 'react';
import { Shield, Menu, Server, Globe, Plus, Edit, Trash2, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const mockNetworkInterfaces = [
  { id: '1', name: 'eth0', ip: '192.168.1.100', netmask: '255.255.255.0', gateway: '192.168.1.1', status: 'up' },
  { id: '2', name: 'eth1', ip: '10.0.0.100', netmask: '255.255.255.0', gateway: '10.0.0.1', status: 'up' },
  { id: '3', name: 'lo', ip: '127.0.0.1', netmask: '255.0.0.0', gateway: '', status: 'up' }
];

export default function IpManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [interfaces, setInterfaces] = useState(mockNetworkInterfaces);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentInterface, setCurrentInterface] = useState(mockNetworkInterfaces[0]);

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
            <h2 className="text-xl font-semibold text-gray-900">IP地址管理</h2>
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

          {/* 网络接口列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      接口名称
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      子网掩码
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      网关
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interfaces.map((iface) => (
                    <tr key={iface.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {iface.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {iface.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {iface.netmask}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {iface.gateway || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${iface.status === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {iface.status === 'up' ? '已启用' : '已禁用'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => {
                            setCurrentInterface(iface);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit className="h-5 w-5" />
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

      {/* 编辑IP配置模态框 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">编辑网络接口</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">接口名称</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentInterface.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP地址</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentInterface.ip}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">子网掩码</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentInterface.netmask}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">网关</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentInterface.gateway}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="up">启用</option>
                    <option value="down">禁用</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t space-x-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

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