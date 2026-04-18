import { useState, useEffect } from 'react';
import { Shield, Menu, Server, Globe, ToggleLeft, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

export default function SelinuxManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [selinuxStatus, setSelinuxStatus] = useState('enforcing'); // enforcing, permissive, disabled
  const [selinuxMode, setSelinuxMode] = useState('enabled'); // enabled, disabled

  const handleSelinuxToggle = () => {
    setSelinuxMode(selinuxMode === 'enabled' ? 'disabled' : 'enabled');
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
            <h2 className="text-xl font-semibold text-gray-900">SELinux管理</h2>
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

          {/* SELinux状态 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SELinux状态</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">SELinux状态</p>
                  <p className={`text-sm ${selinuxMode === 'enabled' ? 'text-green-600' : 'text-red-600'}`}>
                    {selinuxMode === 'enabled' ? '已启用' : '已禁用'}
                  </p>
                </div>
                <button 
                  onClick={handleSelinuxToggle}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${selinuxMode === 'enabled' ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block w-4 h-4 transform rounded-full transition-transform ${selinuxMode === 'enabled' ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'}`} />
                </button>
              </div>
              
              {selinuxMode === 'enabled' && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">SELinux模式</p>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${selinuxStatus === 'enforcing' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                      onClick={() => setSelinuxStatus('enforcing')}
                    >
                      Enforcing
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${selinuxStatus === 'permissive' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                      onClick={() => setSelinuxStatus('permissive')}
                    >
                      Permissive
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SELinux配置信息 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SELinux配置</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SELinux状态</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {selinuxMode === 'enabled' ? '已启用' : '已禁用'}
                    </td>
                  </tr>
                  {selinuxMode === 'enabled' && (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SELinux模式</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selinuxStatus === 'enforcing' ? 'Enforcing' : 'Permissive'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SELinux版本</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.5.1</td>
                      </tr>
                    </>
                  )}
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