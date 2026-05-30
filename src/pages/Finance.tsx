import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { month: 'May', revenue: 45000, expenses: 32000 },
  { month: 'Jun', revenue: 52000, expenses: 38000 },
  { month: 'Jul', revenue: 48000, expenses: 41000 },
  { month: 'Aug', revenue: 61000, expenses: 42000 },
  { month: 'Sep', revenue: 75000, expenses: 48000 },
  { month: 'Oct', revenue: 82000, expenses: 51000 },
];

const Finance = () => {
  const [pendingPayments] = useState([
    { id: 'TX-101', from: 'HR (Payroll)', description: 'Oct 2023 Monthly Salary', amount: 45000, date: '2023-10-30', status: 'Pending Approval' },
    { id: 'TX-102', from: 'HR (Missions)', description: 'Alice Smith - Hospitality Conf.', amount: 450, date: '2023-10-28', status: 'Ready to Pay' },
    { id: 'TX-103', from: 'Purchasing', description: 'Kitchen Supplies - Invoice #552', amount: 1200, date: '2023-10-29', status: 'Awaiting Funds' },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 min-h-screen bg-erp-bg transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-erp-text-main">Accounting & Finance</h1>
          <p className="text-erp-text-muted text-sm">Financial reporting, transactions, and payroll oversight</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-erp-accent hover:bg-erp-accent/90 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-erp-accent/20 text-sm font-medium">
            <FileText size={18} />
            Generate Report
          </button>
        </motion.div>
      </div>

      {/* Finance Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FinanceStat icon={Wallet} label="Net Balance" value="$142,500" trend="+12.5%" trendType="up" />
        <FinanceStat icon={TrendingUp} label="Total Revenue" value="$82,000" trend="+8.2%" trendType="up" />
        <FinanceStat icon={TrendingDown} label="Total Expenses" value="$51,000" trend="+15.1%" trendType="down" />
        <FinanceStat icon={Clock} label="Pending Payments" value="$46,650" trend="3 items" trendType="neutral" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue vs Expenses Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-8 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-erp-text-main">Cash Flow Analysis</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-erp-accent"></div>
                <span className="text-xs text-erp-text-muted">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-erp-danger"></div>
                <span className="text-xs text-erp-text-muted">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-erp-border" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} stroke="currentColor" className="text-erp-text-muted" />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="currentColor" className="text-erp-text-muted" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--erp-card)', border: '1px solid var(--erp-border)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pending Inter-departmental Payments */}
        <motion.div variants={itemVariants} className="lg:col-span-4 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-erp-text-main">Awaiting Action</h3>
            <button className="text-erp-accent text-xs font-bold hover:underline">Process All</button>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {pendingPayments.map(payment => (
              <div key={payment.id} className="p-4 bg-erp-bg/30 rounded-xl border border-erp-border hover:border-erp-accent/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-erp-accent uppercase bg-erp-accent/10 px-2 py-0.5 rounded-md">
                    {payment.from}
                  </span>
                  <span className="text-[10px] text-erp-text-muted">{payment.date}</span>
                </div>
                <h4 className="text-sm font-bold text-erp-text-main mb-1">{payment.description}</h4>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-black text-erp-text-main">${payment.amount.toLocaleString()}</p>
                  <button className="text-xs bg-erp-accent text-white px-3 py-1 rounded-lg hover:bg-erp-accent/90 transition-all font-bold">
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6 border-t border-erp-border flex items-center gap-2 text-erp-warning">
            <AlertCircle size={16} />
            <p className="text-[10px] font-bold uppercase">3 departments awaiting funds</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FinanceStat = ({ icon: Icon, label, value, trend, trendType }: { icon: any, label: string, value: string, trend: string, trendType: 'up' | 'down' | 'neutral' }) => {
  return (
    <div className="glass-card p-6 hover:shadow-md transition-all group border-erp-border">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-erp-bg flex items-center justify-center text-erp-accent group-hover:bg-erp-accent group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
          trendType === 'up' ? 'text-erp-success bg-erp-success/10' : 
          trendType === 'down' ? 'text-erp-danger bg-erp-danger/10' : 
          'text-erp-text-muted bg-erp-bg'
        }`}>
          {trendType === 'up' ? <ArrowUpRight size={12} /> : trendType === 'down' ? <ArrowDownRight size={12} /> : null}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-erp-text-muted uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-erp-text-main mt-1">{value}</p>
      </div>
    </div>
  );
};

export default Finance;
