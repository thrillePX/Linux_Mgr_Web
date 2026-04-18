# IPBTales Firewalld Web App

一个基于Web的Linux防火墙管理平台，提供直观可视化的界面来管理iptables和firewalld规则。

## 📋 目录

- [特性](#-特性)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [功能模块](#-功能模块)
- [API接口](#-API接口)
- [开发指南](#-开发指南)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)

## ✨ 特性

- **直观的Web界面**: 通过浏览器轻松管理Linux防火墙规则
- **规则管理**: 可视化添加、删除和查看防火墙规则
- **端口映射**: 简单的端口转发配置
- **实时状态监控**: 仪表板实时显示防火墙状态
- **系统信息展示**: 查看服务器系统资源和网络信息
- **SELinux管理**: 便捷的SELinux策略管理
- **网络流量监控**: 实时网络流量可视化
- **进程管理**: 查看和管理系统进程
- **磁盘IO监控**: 磁盘读写性能监控
- **服务管理**: 管理系统服务（firewalld、sshd等）

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: TailwindCSS 3
- **路由**: React Router DOM
- **状态管理**: Zustand
- **图表**: Recharts
- **图标**: Lucide React

### 后端
- **框架**: Express 4 + TypeScript
- **运行环境**: Node.js
- **开发工具**: Nodemon

## 📁 项目结构

```
ipbtales_firewalldWebApp/
├── api/                          # 后端API
│   ├── routes/                   # 路由定义
│   │   ├── auth.ts              # 认证路由
│   │   └── firewall.ts          # 防火墙路由
│   ├── app.ts                   # Express应用
│   ├── index.ts                 # API入口
│   └── server.ts                # 服务器配置
├── src/                         # 前端源码
│   ├── components/              # React组件
│   │   ├── Empty.tsx
│   │   └── Sidebar.tsx
│   ├── hooks/                   # 自定义Hooks
│   │   └── useTheme.ts
│   ├── lib/                     # 工具函数
│   │   └── utils.ts
│   ├── pages/                   # 页面组件
│   │   ├── Dashboard.tsx        # 仪表板
│   │   ├── DiskIO.tsx           # 磁盘IO监控
│   │   ├── Home.tsx             # 主页
│   │   ├── IpManagement.tsx      # IP管理
│   │   ├── LoginLogs.tsx         # 登录日志
│   │   ├── NetworkManagement.tsx # 网络管理
│   │   ├── NetworkTraffic.tsx    # 网络流量
│   │   ├── PortMapping.tsx       # 端口映射
│   │   ├── ProcessesManagement.tsx # 进程管理
│   │   ├── RulesManagement.tsx   # 规则管理
│   │   ├── SelinuxManagement.tsx # SELinux管理
│   │   ├── ServicesManagement.tsx # 服务管理
│   │   └── SystemMonitor.tsx      # 系统监控
│   ├── App.tsx                  # 主应用组件
│   ├── index.css                # 全局样式
│   └── main.tsx                 # 应用入口
├── public/                      # 静态资源
├── package.json                 # 项目依赖
├── tsconfig.json               # TypeScript配置
├── vite.config.ts              # Vite配置
├── tailwind.config.js         # TailwindCSS配置
└── README.md                   # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0
- npm 或 yarn
- Linux系统（支持firewalld或iptables）

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/ipbtales_firewalldWebApp.git
cd ipbtales_firewalldWebApp

# 安装依赖
npm install
```

### 运行

```bash
# 开发模式（同时启动前端和后端）
npm run dev

# 仅启动前端开发服务器
npm run client:dev

# 仅启动后端开发服务器
npm run server:dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

### 代码检查

```bash
# TypeScript类型检查
npm run check

# ESLint代码检查
npm run lint
```

## 📦 功能模块

### 1. 仪表板 (Dashboard)
- 防火墙状态概览
- 活跃规则数量统计
- 系统信息展示
- 快速操作按钮

### 2. 规则管理 (Rules Management)
- 查看所有防火墙规则
- 添加新的安全策略
- 删除现有规则
- 支持协议、端口、源/目标IP配置

### 3. 端口映射 (Port Mapping)
- 查看当前端口转发规则
- 添加新的端口映射
- 删除现有映射
- 配置源端口、目标端口和目标IP

### 4. 网络管理 (Network Management)
- 网络接口信息
- IP地址管理
- 网络配置

### 5. 服务管理 (Services Management)
- 查看系统服务状态
- 启动/停止服务
- 服务配置管理

### 6. 系统监控 (System Monitor)
- CPU使用率
- 内存使用情况
- 磁盘空间
- 系统负载

### 7. 进程管理 (Processes Management)
- 查看运行中的进程
- 进程信息详情
- 进程监控

### 8. 网络流量 (Network Traffic)
- 实时网络流量监控
- 流量可视化图表
- 网络带宽使用统计

### 9. 磁盘IO (Disk IO)
- 磁盘读写速度
- IOPS监控
- 磁盘使用统计

### 10. 登录日志 (Login Logs)
- 查看系统登录记录
- 认证日志分析
- 安全事件追踪

### 11. IP管理 (IP Management)
- IP地址管理
- 黑名单/白名单
- IP访问控制

### 12. SELinux管理 (SELinux Management)
- SELinux状态查看
- 策略管理
- 安全上下文配置

## 🔌 API接口

### 防火墙状态
```
GET /api/firewall/status
响应: {
  status: string,
  activeRules: number,
  firewallType: string
}
```

### 规则管理
```
GET /api/rules
POST /api/rules
DELETE /api/rules/:id
```

### 端口映射
```
GET /api/port-mapping
POST /api/port-mapping
DELETE /api/port-mapping/:id
```

### 系统信息
```
GET /api/system/info
GET /api/system/monitor
```

## 🎨 界面设计

### 设计规范
- **主色调**: #3b82f6 (蓝色)
- **次要色**: #10b981 (绿色)
- **按钮样式**: 圆角设计，柔和阴影
- **字体**: Inter, sans-serif
- **布局**: 卡片式设计，带侧边栏导航
- **图标**: Lucide图标库，简洁风格

### 响应式设计
- 桌面端优先设计
- 移动端适配（侧边栏可折叠）
- 触摸设备优化

## 🤝 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## ⚠️ 注意事项

- 本应用需要root/sudo权限来管理防火墙规则
- 在生产环境使用前，请务必在测试环境充分测试
- 建议在生产环境使用HTTPS
- 定期备份防火墙配置

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- 所有开源贡献者
