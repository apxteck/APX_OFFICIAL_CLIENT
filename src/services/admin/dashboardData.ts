export interface KPIData {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
  sparklineData?: number[];
  alert?: boolean;
}

export const mockCustomerKPIs: KPIData[] = [
  {
    title: 'Total Customers',
    value: '1,248',
    trend: 'up',
    percentage: 12,
    sparklineData: [4, 6, 8, 12, 14, 18, 20],
  },
  {
    title: 'New Requests (Today)',
    value: '24',
    trend: 'up',
    percentage: 5,
    sparklineData: [2, 5, 3, 8, 4, 10, 24],
  },
  { title: 'Open Requests', value: '86', trend: 'neutral' },
  { title: 'In Progress Requests', value: '45', trend: 'up', percentage: 2 },
  { title: 'Completed (This Month)', value: '312', trend: 'up', percentage: 18 },
];

export const mockRevenueKPIs: KPIData[] = [
  { title: 'Pending Invoices', value: '₹45,000', alert: true },
  {
    title: 'Revenue This Month',
    value: '₹8,50,000',
    trend: 'up',
    percentage: 22,
    sparklineData: [30, 40, 35, 50, 45, 60, 85],
  },
  { title: 'Overdue Payments', value: '12', alert: true },
  { title: 'Total Revenue (Lifetime)', value: '₹42,50,000', trend: 'up', percentage: 5 },
];

export const mockContentKPIs: KPIData[] = [
  { title: 'Blog Posts Published', value: '142', trend: 'up', percentage: 4 },
  { title: 'Comments Pending Approval', value: '38', alert: true },
  { title: 'AI Posts Generated (Month)', value: '15', trend: 'up', percentage: 50 },
  {
    title: 'Total Blog Likes',
    value: '12.4K',
    trend: 'up',
    percentage: 8,
    sparklineData: [100, 150, 120, 200, 180, 250, 300],
  },
];

export const mockLeadsKPIs: KPIData[] = [
  {
    title: 'New Leads (This Week)',
    value: '56',
    trend: 'up',
    percentage: 14,
    sparklineData: [5, 8, 6, 12, 10, 15, 20],
  },
  { title: 'New Enquiries', value: '18', alert: true },
  { title: 'Open Tasks', value: '24', trend: 'down', percentage: -5 },
  { title: 'Pending Reimbursements', value: '₹12,500', alert: true },
];

export const chartData = {
  serviceRequests: [
    { name: 'Completed', value: 312, fill: '#10B981' },
    { name: 'In Progress', value: 45, fill: '#6366f1' },
    { name: 'Open', value: 86, fill: '#F59E0B' },
    { name: 'Cancelled', value: 12, fill: '#EF4444' },
  ],
  revenueTrend: [
    { name: 'Jan', revenue: 400000 },
    { name: 'Feb', revenue: 300000 },
    { name: 'Mar', revenue: 550000 },
    { name: 'Apr', revenue: 450000 },
    { name: 'May', revenue: 700000 },
    { name: 'Jun', revenue: 850000 },
  ],
  requestsOverTime: [
    { name: 'Mon', requests: 12 },
    { name: 'Tue', requests: 19 },
    { name: 'Wed', requests: 15 },
    { name: 'Thu', requests: 22 },
    { name: 'Fri', requests: 25 },
    { name: 'Sat', requests: 8 },
    { name: 'Sun', requests: 5 },
  ],
  leadFunnel: [
    { stage: 'Total Enquiries', value: 1000, fill: '#6366f1' },
    { stage: 'Qualified Leads', value: 400, fill: '#8b5cf6' },
    { stage: 'Proposals Sent', value: 200, fill: '#ec4899' },
    { stage: 'Negotiation', value: 100, fill: '#f43f5e' },
    { stage: 'Closed Won', value: 50, fill: '#10b981' },
  ],
  blogPerformance: [
    { name: 'React 19 Basics', likes: 120, comments: 45 },
    { name: 'Next.js Routing', likes: 98, comments: 30 },
    { name: 'Tailwind Mastery', likes: 150, comments: 60 },
    { name: 'Prisma vs Drizzle', likes: 210, comments: 85 },
    { name: 'Server Actions', likes: 175, comments: 55 },
  ],
  taskCompletion: [
    { name: 'Week 1', open: 12, inProgress: 8, done: 40 },
    { name: 'Week 2', open: 15, inProgress: 10, done: 35 },
    { name: 'Week 3', open: 8, inProgress: 12, done: 45 },
    { name: 'Week 4', open: 5, inProgress: 6, done: 50 },
  ],
  enquirySources: [
    { name: 'Organic Search', value: 400, fill: '#6366f1' },
    { name: 'Direct Traffic', value: 300, fill: '#3b82f6' },
    { name: 'Instagram', value: 150, fill: '#ec4899' },
    { name: 'LinkedIn', value: 100, fill: '#0ea5e9' },
    { name: 'Referral', value: 50, fill: '#10b981' },
  ],
};

export const activityFeed = [
  {
    id: 1,
    type: 'request',
    text: 'New service request submitted by Rahul Sharma',
    time: '5 mins ago',
    icon: 'Headset',
    color: 'blue',
  },
  {
    id: 2,
    type: 'payment',
    text: 'Payment of ₹45,000 received from TechFlow Solutions',
    time: '15 mins ago',
    icon: 'CreditCard',
    color: 'green',
  },
  {
    id: 3,
    type: 'lead',
    text: 'Lead Amit Kumar status changed to INTERESTED by Sales Agent 1',
    time: '1 hour ago',
    icon: 'TrendingUp',
    color: 'purple',
  },
  {
    id: 4,
    type: 'enquiry',
    text: 'New enquiry received from contact@designstudio.in',
    time: '2 hours ago',
    icon: 'HelpCircle',
    color: 'orange',
  },
  {
    id: 5,
    type: 'blog',
    text: "Blog post '10 UI Trends 2024' published by Editor Desk",
    time: '4 hours ago',
    icon: 'FileText',
    color: 'indigo',
  },
  {
    id: 6,
    type: 'task',
    text: "Task 'Fix Server CORS' marked COMPLETED by Dev Team",
    time: '6 hours ago',
    icon: 'CheckCircle',
    color: 'green',
  },
  {
    id: 7,
    type: 'request',
    text: 'Service request #4092 assigned to Support Agent 3',
    time: '8 hours ago',
    icon: 'UserPlus',
    color: 'blue',
  },
  {
    id: 8,
    type: 'reimbursement',
    text: 'Reimbursement of ₹2,500 submitted by Sales Agent 2',
    time: '1 day ago',
    icon: 'Receipt',
    color: 'yellow',
  },
  {
    id: 9,
    type: 'ad',
    text: "New Ad Campaign 'Summer Sale' launched successfully",
    time: '1 day ago',
    icon: 'Monitor',
    color: 'pink',
  },
  {
    id: 10,
    type: 'payment',
    text: 'Invoice #INV-2041 sent to Client Alpha',
    time: '1 day ago',
    icon: 'FileText',
    color: 'indigo',
  },
];
