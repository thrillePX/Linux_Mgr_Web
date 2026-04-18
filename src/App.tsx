import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import RulesManagement from "@/pages/RulesManagement";
import PortMapping from "@/pages/PortMapping";
import IpManagement from "@/pages/IpManagement";
import SelinuxManagement from "@/pages/SelinuxManagement";
import ServicesManagement from "@/pages/ServicesManagement";
import NetworkManagement from "@/pages/NetworkManagement";
import NetworkTraffic from "@/pages/NetworkTraffic";
import DiskIO from "@/pages/DiskIO";
import LoginLogs from "@/pages/LoginLogs";
import SystemMonitor from "@/pages/SystemMonitor";
import ProcessesManagement from "@/pages/ProcessesManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rules" element={<RulesManagement />} />
        <Route path="/port-mapping" element={<PortMapping />} />
        <Route path="/ip-management" element={<IpManagement />} />
        <Route path="/selinux" element={<SelinuxManagement />} />
        <Route path="/services" element={<ServicesManagement />} />
        <Route path="/network" element={<NetworkManagement />} />
        <Route path="/network-traffic" element={<NetworkTraffic />} />
        <Route path="/disk-io" element={<DiskIO />} />
        <Route path="/login-logs" element={<LoginLogs />} />
        <Route path="/system-monitor" element={<SystemMonitor />} />
        <Route path="/processes" element={<ProcessesManagement />} />
      </Routes>
    </Router>
  );
}
