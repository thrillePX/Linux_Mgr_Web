import { useState, useEffect } from 'react';
import { Shield, Menu, Plus, Trash2, Search, Filter, Globe, Server, Activity, HardDrive, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 模拟数据
const mockServers = [
  { id: '1', name: 'Server 1', ip: '192.168.1.100', status: 'online', firewallType: 'iptables' },
  { id: '2', name: 'Server 2', ip: '192.168.1.101', status: 'online', firewallType: 'firewalld' },
  { id: '3', name: 'Server 3', ip: '192.168.1.102', status: 'offline', firewallType: 'iptables' }
];

const mockRules = [
  { id: '1', protocol: 'TCP', port: 22, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '2', protocol: 'TCP', port: 80, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '3', protocol: 'TCP', port: 443, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '4', protocol: 'UDP', port: 53, action: 'ACCEPT', source: '192.168.1.0/24', destination: '192.168.1.100' },
  { id: '5', protocol: 'ICMP', port: 0, action: 'ACCEPT', source: '192.168.1.0/24', destination: '192.168.1.100' },
];

export default function RulesManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rules, setRules] = useState(mockRules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    protocol: 'TCP',
    port: '',
    action: 'ACCEPT',
    source: '',
    destination: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);

  useEffect(() => {
    // 模拟API调用
    // 实际项目中这里会调用后端API获取真实数据
    setTimeout(() => {
      setRules(mockRules);
    }, 500);
  }, []);

  const handleDeleteRule = (id: string) => {
    // 模拟删除操作
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleAddRule = () => {
    // 模拟添加操作
    const newId = (rules.length + 1).toString();
    const ruleToAdd = {
      id: newId,
      ...newRule
    };
    setRules([...rules, ruleToAdd]);
    setIsAddModalOpen(false);
    setNewRule({
      protocol: 'TCP',
      port: '',
      action: 'ACCEPT',
      source: '',
      destination: ''
    });
  };

  const filteredRules = rules.filter(rule => 
    rule.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.port.toString().includes(searchTerm) ||
    rule.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className="text-xl font-semibold text-gray-900">规则管理</h2>
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

          {/* 操作栏 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索规则..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>添加规则</span>
              </button>
            </div>
          </div>

          {/* 规则列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      协议
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      端口
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      动作
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      源地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      目标地址
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRules.map((rule) => (
                    <tr key={rule.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rule.protocol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rule.port}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${rule.action === 'ACCEPT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rule.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rule.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredRules.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">没有找到规则</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 添加规则模态框 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">添加新规则</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">协议</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRule.protocol}
                    onChange={(e) => setNewRule({ ...newRule, protocol: e.target.value })}
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="ICMP">ICMP</option>
                    <option value="ALL">ALL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">端口</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入端口号"
                    value={newRule.port}
                    onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">动作</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRule.action}
                    onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                  >
                    <option value="ACCEPT">ACCEPT</option>
                    <option value="DROP">DROP</option>
                    <option value="REJECT">REJECT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">源地址</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如: 0.0.0.0/0"
                    value={newRule.source}
                    onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">目标地址</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如: 192.168.1.100"
                    value={newRule.destination}
                    onChange={(e) => setNewRule({ ...newRule, destination: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t space-x-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button 
                onClick={handleAddRule}
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