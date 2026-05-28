import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const occupancyData = [
  { name: 'Mon', value: 75 },
  { name: 'Tue', value: 82 },
  { name: 'Wed', value: 78 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 92 },
  { name: 'Sat', value: 95 },
  { name: 'Sun', value: 88 },
];

const revenueData = [
  { name: 'Mon', revenue: 45000 },
  { name: 'Tue', revenue: 52000 },
  { name: 'Wed', revenue: 48000 },
  { name: 'Thu', revenue: 61000 },
  { name: 'Fri', revenue: 75000 },
  { name: 'Sat', revenue: 82000 },
  { name: 'Sun', revenue: 58000 },
];

const roomStatusData = [
  { name: 'Clean/Vacant', value: 45, color: '#10b981' },
  { name: 'Dirty/Vacant', value: 15, color: '#f59e0b' },
  { name: 'Occupied', value: 35, color: '#3b82f6' },
  { name: 'Out of Order', value: 5, color: '#ef4444' },
];

const fbRevenueData = [
  { name: 'Mon', rev: 12000 },
  { name: 'Tue', rev: 15000 },
  { name: 'Wed', rev: 13000 },
  { name: 'Thu', rev: 18000 },
  { name: 'Fri', rev: 22000 },
  { name: 'Sat', rev: 25000 },
  { name: 'Sun', rev: 19000 },
];

const arrivals = [
  { name: 'Client Office', order: '32,000 RWF', upcoming: '150,000 RWF' },
  { name: 'Dirty/Vacant', order: '56,000 RWF', upcoming: '142,000 RWF' },
  { name: 'Occupying Arrivals', order: '45,000 RWF', upcoming: '143,000 RWF' },
  { name: 'Recais Arrivals', order: '13,000 RWF', upcoming: '120,000 RWF' },
  { name: 'Top 5 Office', order: '13,000 RWF', upcoming: '77,000 RWF' },
];

const staffingData = [
  { dept: 'Headcount on Duty', duty: 23, leave: 2, sick: 0 },
  { dept: 'Leave', duty: 27, leave: 2, sick: 1 },
  { dept: 'Sick Leave', duty: 15, leave: 0, sick: 0 },
];

const maintenanceData = [
  { name: 'High', value: 45, color: '#ef4444' },
  { name: 'Medium', value: 30, color: '#f59e0b' },
  { name: 'Low', value: 25, color: '#10b981' },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="p-8 space-y-8 min-h-screen bg-erp-bg transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-erp-text-main">{t('Dashboard')}</h1>
          <p className="text-erp-text-muted text-sm">Real-time overview of your hotel operations</p>
        </motion.div>
        <motion.div className="flex gap-3" variants={itemVariants}>
          <div className="flex items-center gap-2 bg-erp-bg border border-erp-border px-4 py-2 rounded-xl text-sm text-erp-text-main cursor-pointer hover:bg-erp-bg/80 transition-all shadow-sm">
            <Calendar size={16} />
            <span>Today: Oct 26, 2023</span>
          </div>
          <div className="flex items-center gap-2 bg-erp-bg border border-erp-border px-4 py-2 rounded-xl text-sm text-erp-text-main cursor-pointer hover:bg-erp-bg/80 transition-all shadow-sm">
            <Calendar size={16} />
            <span>Today: Oct 26, 2023</span>
          </div>
        </motion.div>
      </div>

      {/* Top Stats Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
        <StatCard 
          title={t("Occupancy Rate")} 
          value="82%" 
          subtitle="Front Office"
          chart={<GaugeChart value={82} />}
        />
        <StatCard 
          title={t("RevPAR Today")} 
          value="RWF" 
          subtitle="Finance"
          chart={
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={occupancyData}>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f620" />
              </AreaChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title={t("Average Daily Rate")} 
          value="ADR" 
          subtitle="Finance/Front Office"
          chart={
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={occupancyData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title={t("Guest Satisfaction Score")} 
          value="4.5/5" 
          subtitle="Front Office/Service"
          chart={
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className={s <= 4 ? "text-erp-warning fill-erp-warning" : "text-erp-text-muted"} />
              ))}
            </div>
          }
        />
      </motion.div>

      {/* Middle Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={itemVariants}>
        <div className="lg:col-span-1 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('F&B Revenue by Outlet Today')}</h3>
            <MoreVertical size={18} className="text-erp-text-muted" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fbRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-erp-border" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-erp-text-muted" fontSize={12} />
                <YAxis stroke="currentColor" className="text-erp-text-muted" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--erp-card)', border: '1px solid var(--erp-border)', borderRadius: '12px' }} />
                <Bar dataKey="rev" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-erp-text-muted mt-4">F&B Service</p>
        </div>

        <div className="lg:col-span-1 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('Room Status Distribution')}</h3>
            <button className="text-xs bg-erp-bg border border-erp-border px-2 py-1 rounded-lg hover:bg-erp-bg/80 transition-all text-erp-text-muted">Housekeeping</button>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roomStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold text-erp-text-main">100</p>
              <p className="text-[10px] text-erp-text-muted uppercase tracking-wider">Total Rooms</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {roomStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-erp-text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('Top 5 Upcoming Arrivals')}</h3>
            <button className="text-xs text-erp-accent hover:underline font-medium">View Full Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-erp-text-muted border-b border-erp-border">
                  <th className="text-left pb-3 font-medium">Name</th>
                  <th className="text-right pb-3 font-medium">Order</th>
                  <th className="text-right pb-3 font-medium">Upcoming</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-erp-border">
                {arrivals.map((arrival, i) => (
                  <tr key={i} className="group hover:bg-erp-bg transition-colors">
                    <td className="py-3 text-erp-text-main font-medium">{arrival.name}</td>
                    <td className="py-3 text-right text-erp-text-muted">{arrival.order}</td>
                    <td className="py-3 text-right text-erp-text-main font-bold">{arrival.upcoming}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-erp-text-muted mt-4">Front Office</p>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6" variants={itemVariants}>
        <div className="lg:col-span-4 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('Staffing Overview Today')}</h3>
            <MoreVertical size={18} className="text-erp-text-muted" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-erp-text-muted border-b border-erp-border">
                  <th className="text-left pb-3 font-medium uppercase tracking-wider">Department</th>
                  <th className="text-right pb-3 font-medium uppercase tracking-wider">Duty</th>
                  <th className="text-right pb-3 font-medium uppercase tracking-wider">Leave</th>
                  <th className="text-right pb-3 font-medium uppercase tracking-wider">Sick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-erp-border">
                {staffingData.map((staff, i) => (
                  <tr key={i} className="hover:bg-erp-bg transition-colors">
                    <td className="py-3 text-erp-text-main font-medium">{staff.dept}</td>
                    <td className="py-3 text-right text-erp-text-main">{staff.duty}</td>
                    <td className="py-3 text-right text-erp-text-main">{staff.leave}</td>
                    <td className="py-3 text-right text-erp-text-main">{staff.sick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-erp-text-muted mt-4">HR</p>
        </div>

        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('Open Maintenance Requests')}</h3>
            <MoreVertical size={18} className="text-erp-text-muted" />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-erp-border" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-erp-text-muted" fontSize={10} />
                <YAxis stroke="currentColor" className="text-erp-text-muted" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--erp-card)', border: '1px solid var(--erp-border)', borderRadius: '12px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {maintenanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4">
            {maintenanceData.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] text-erp-text-muted font-medium">{item.name}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-erp-text-muted mt-4">Engineering</p>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-erp-text-main">{t('IT System Health')}</h3>
            <MoreVertical size={18} className="text-erp-text-muted" />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-erp-text-muted font-medium">Network Status</span>
                <span className="text-xs text-erp-success font-bold">99.9%</span>
              </div>
              <div className="w-full bg-erp-bg rounded-full h-2">
                <div className="bg-erp-success h-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: '99.9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-erp-text-muted font-medium">Pending Updates</span>
                <span className="text-xs text-erp-warning font-bold">3</span>
              </div>
              <div className="w-full bg-erp-bg rounded-full h-2">
                <div className="bg-erp-warning h-2 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)]" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-erp-border">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-erp-text-muted font-bold uppercase tracking-wider">Active Servers</span>
                <span className="text-[10px] text-erp-text-main font-bold">12 / 12</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-erp-text-muted mt-6">IT</p>
        </div>

        <div className="lg:col-span-3 glass-card p-6 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
              alt="World Map" 
              className="w-full h-full object-cover filter grayscale dark:invert"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <h3 className="font-semibold text-erp-text-main">Global Presence</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-erp-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="text-xs text-erp-text-main font-medium">Kigali Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-erp-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="text-xs text-erp-text-main font-medium">Musanze Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-erp-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                {/* <span className="text-xs text-erp-text-main font-medium">UAE - Dubai</span> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ title, value, subtitle, chart }: { title: string, value: string, subtitle: string, chart: React.ReactNode }) => (
  <motion.div 
    className="glass-card p-6 flex flex-col justify-between hover:bg-erp-bg transition-all cursor-pointer group shadow-sm hover:shadow-md border-erp-border"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-erp-text-muted text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-bold text-erp-text-main">{value}</h2>
          <span className="text-[10px] text-erp-text-muted font-medium">{subtitle}</span>
        </div>
      </div>
      <button className="text-erp-text-muted hover:text-erp-text-main transition-colors p-1 hover:bg-erp-bg rounded-md">
        <MoreVertical size={18} />
      </button>
    </div>
    <div className="mt-4">
      {chart}
    </div>
  </motion.div>
);

const GaugeChart = ({ value }: { value: number }) => {
  const angle = (value / 100) * 180;
  return (
    <div className="relative h-20 w-full flex items-center justify-center overflow-hidden">
      <div className="absolute bottom-0 w-32 h-16 border-[12px] border-erp-bg rounded-t-full"></div>
      <div 
        className="absolute bottom-0 w-32 h-16 border-[12px] border-erp-accent rounded-t-full transition-all duration-1000 origin-bottom shadow-[0_-4px_10px_rgba(59,130,246,0.2)]"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      ></div>
      <div className="absolute bottom-2 text-center">
        <span className="text-xl font-bold text-erp-text-main">{value}%</span>
      </div>
    </div>
  );
};

export default Dashboard;
