import { useState, useEffect } from 'react';
import { Shield, Server, RefreshCw, Trash2, Menu, Plus, Globe, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const mockFirewallStatus = {
  status: 'active',
  activeRules: 12,
  firewallType: 'iptables',
  systemInfo: {
    hostname: 'server-01',
    os: 'Ubuntu 22.04 LTS',
    kernel: '5.15.0-100-generic',
    uptime: '2 days, 14 hours, 30 minutes'
  }
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firewallStatus, setFirewallStatus] = useState(mockFirewallStatus);
  const [servers, setServers] = useState(mockServers);
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);

  useEffect(() => {
    // 模拟API调用
    // 实际项目中这里会调用后端API获取真实数据
    setTimeout(() => {
      setFirewallStatus(mockFirewallStatus);
    }, 500);
  }, []);

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
            <h2 className="text-xl font-semibold text-gray-900">防火墙仪表板</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">管理员</span>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 p-4 md:p-6">
          {/* 服务器管理 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">服务器管理</h3>
              <button 
                onClick={() => setIsAddServerModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>添加服务器</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      服务器名称
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      防火墙类型
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {servers.map((server) => (
                    <tr 
                      key={server.id} 
                      className={selectedServer.id === server.id ? 'bg-blue-50' : ''}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {server.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {server.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${server.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {server.status === 'online' ? '在线' : '离线'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {server.firewallType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => setSelectedServer(server)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          选择
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 状态概览卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">防火墙状态</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${firewallStatus.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {firewallStatus.status === 'active' ? '活跃' : '未激活'}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="h-12 w-12 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{firewallStatus.firewallType}</p>
                  <p className="text-sm text-gray-500">已启用</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">活跃规则</h3>
              </div>
              <div className="flex items-center space-x-4">
                <Server className="h-12 w-12 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{firewallStatus.activeRules}</p>
                  <p className="text-sm text-gray-500">条规则</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">系统信息</h3>
              </div>
              <div className="flex items-center space-x-4">
                <Server className="h-12 w-12 text-gray-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{firewallStatus.systemInfo.hostname}</p>
                  <p className="text-xs text-gray-500">{firewallStatus.systemInfo.os}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">重启防火墙</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Trash2 className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">清空规则</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">应用默认规则</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Server className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700">查看系统日志</span>
              </button>
            </div>
          </div>

          {/* 系统信息 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">系统信息</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">主机名</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{firewallStatus.systemInfo.hostname}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">操作系统</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{firewallStatus.systemInfo.os}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">内核版本</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{firewallStatus.systemInfo.kernel}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">运行时间</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{firewallStatus.systemInfo.uptime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* 添加服务器模态框 */}
      {isAddServerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsAddServerModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">添加服务器</h3>
              <button 
                onClick={() => setIsAddServerModalOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">服务器名称</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入服务器名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP地址</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入服务器IP地址"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SSH端口</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入SSH端口"
                    defaultValue="22"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入SSH用户名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">认证方式</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="password">密码</option>
                    <option value="key">SSH密钥</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入SSH密码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">防火墙类型</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="iptables">iptables</option>
                    <option value="firewalld">firewalld</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t space-x-3">
              <button 
                onClick={() => setIsAddServerModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button 
                onClick={() => setIsAddServerModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                添加
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