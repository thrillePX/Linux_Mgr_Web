import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Server, Shield, ChevronRight, Globe, Activity, HardDrive, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [firewallGroupOpen, setFirewallGroupOpen] = useState(true);
  const [systemGroupOpen, setSystemGroupOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => 
    isActive(path) 
      ? "flex items-center space-x-3 px-4 py-2 rounded-md bg-blue-50 text-blue-600 font-medium"
      : "flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100";

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Server className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">LINUX管理</h1>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
      </div>
      <nav className="p-4 overflow-y-auto h-[calc(100vh-73px)]">
        <ul className="space-y-1">
          {/* 防火墙管理分组 */}
          <li>
            <button 
              onClick={() => setFirewallGroupOpen(!firewallGroupOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>防火墙管理</span>
              </span>
              {firewallGroupOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {firewallGroupOpen && (
              <ul className="mt-1 space-y-1 ml-2">
                <li>
                  <Link to="/" className={linkClass("/")}>
                    <Server className="h-4 w-4" />
                    <span>仪表板</span>
                  </Link>
                </li>
                <li>
                  <Link to="/rules" className={linkClass("/rules")}>
                    <Shield className="h-4 w-4" />
                    <span>规则管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/port-mapping" className={linkClass("/port-mapping")}>
                    <ChevronRight className="h-4 w-4" />
                    <span>端口映射</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 系统管理分组 */}
          <li className="mt-2">
            <button 
              onClick={() => setSystemGroupOpen(!systemGroupOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="flex items-center space-x-2">
                <Server className="h-4 w-4" />
                <span>系统管理</span>
              </span>
              {systemGroupOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {systemGroupOpen && (
              <ul className="mt-1 space-y-1 ml-2">
                <li>
                  <Link to="/ip-management" className={linkClass("/ip-management")}>
                    <Globe className="h-4 w-4" />
                    <span>IP地址管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/selinux" className={linkClass("/selinux")}>
                    <Shield className="h-4 w-4" />
                    <span>SELinux管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services" className={linkClass("/services")}>
                    <Server className="h-4 w-4" />
                    <span>服务管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/network" className={linkClass("/network")}>
                    <Globe className="h-4 w-4" />
                    <span>网络管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/network-traffic" className={linkClass("/network-traffic")}>
                    <Activity className="h-4 w-4" />
                    <span>网络流量</span>
                  </Link>
                </li>
                <li>
                  <Link to="/disk-io" className={linkClass("/disk-io")}>
                    <HardDrive className="h-4 w-4" />
                    <span>磁盘IO</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login-logs" className={linkClass("/login-logs")}>
                    <Clock className="h-4 w-4" />
                    <span>登录日志</span>
                  </Link>
                </li>
                <li>
                  <Link to="/system-monitor" className={linkClass("/system-monitor")}>
                    <Activity className="h-4 w-4" />
                    <span>系统监控</span>
                  </Link>
                </li>
                <li>
                  <Link to="/processes" className={linkClass("/processes")}>
                    <Server className="h-4 w-4" />
                    <span>进程管理</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
