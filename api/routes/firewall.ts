import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()

// 模拟数据
const mockFirewallStatus = {
  status: 'active',
  activeRules: 12,
  firewallType: 'iptables'
}

const mockRules = [
  { id: '1', protocol: 'TCP', port: 22, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '2', protocol: 'TCP', port: 80, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '3', protocol: 'TCP', port: 443, action: 'ACCEPT', source: '0.0.0.0/0', destination: '192.168.1.100' },
  { id: '4', protocol: 'UDP', port: 53, action: 'ACCEPT', source: '192.168.1.0/24', destination: '192.168.1.100' },
  { id: '5', protocol: 'ICMP', port: 0, action: 'ACCEPT', source: '192.168.1.0/24', destination: '192.168.1.100' },
]

const mockMappings = [
  { id: '1', sourcePort: 80, destinationPort: 8080, destinationIP: '192.168.1.101' },
  { id: '2', sourcePort: 443, destinationPort: 8443, destinationIP: '192.168.1.101' },
  { id: '3', sourcePort: 3389, destinationPort: 3389, destinationIP: '192.168.1.102' },
  { id: '4', sourcePort: 2222, destinationPort: 22, destinationIP: '192.168.1.103' },
]

// 防火墙状态API
router.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(mockFirewallStatus)
})

// 规则管理API
router.get('/rules', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(mockRules)
})

router.post('/rules', (req: Request, res: Response, next: NextFunction) => {
  const newRule = req.body
  // 实际项目中这里会调用系统命令添加规则
  res.status(200).json({ success: true, message: '规则添加成功' })
})

router.delete('/rules/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  // 实际项目中这里会调用系统命令删除规则
  res.status(200).json({ success: true, message: '规则删除成功' })
})

// 端口映射API
router.get('/port-mapping', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(mockMappings)
})

router.post('/port-mapping', (req: Request, res: Response, next: NextFunction) => {
  const newMapping = req.body
  // 实际项目中这里会调用系统命令添加端口映射
  res.status(200).json({ success: true, message: '端口映射添加成功' })
})

router.delete('/port-mapping/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  // 实际项目中这里会调用系统命令删除端口映射
  res.status(200).json({ success: true, message: '端口映射删除成功' })
})

export default router