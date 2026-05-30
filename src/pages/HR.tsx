import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Banknote, 
  Plane, 
  Clock, 
  Plus, 
  CheckCircle2, 
  XCircle,
  Search
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
}

interface MissionRequest {
  id: string;
  employeeName: string;
  purpose: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  date: string;
}

const HR = () => {
  const [employees] = useState<Employee[]>([
    { id: '1', name: 'Alice Smith', department: 'Front Office', position: 'Manager', salary: 3500, status: 'Active' },
    { id: '2', name: 'Bob Jones', department: 'Housekeeping', position: 'Supervisor', salary: 2800, status: 'Active' },
    { id: '3', name: 'Charlie Brown', department: 'F&B Service', position: 'Chef', salary: 3200, status: 'On Leave' },
  ]);

  const [missions, setMissions] = useState<MissionRequest[]>([
    { id: 'M1', employeeName: 'Alice Smith', purpose: 'Hospitality Conf.', amount: 450, status: 'Pending', date: '2023-10-28' },
    { id: 'M2', employeeName: 'Charlie Brown', purpose: 'Food Safety Training', amount: 200, status: 'Approved', date: '2023-10-29' },
  ]);

  const approveMission = (id: string) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: 'Approved' } : m));
    // In a real app, this would trigger a POST to /api/finance/transactions
    console.log(`Mission ${id} approved. Sent to Finance for payment.`);
  };

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
          <h1 className="text-2xl font-bold text-erp-text-main">Human Resources</h1>
          <p className="text-erp-text-muted text-sm">Manage employees, payroll, and mission fees</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-erp-accent hover:bg-erp-accent/90 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-erp-accent/20 text-sm font-medium">
            <Plus size={18} />
            Add Employee
          </button>
          <button className="flex items-center gap-2 bg-erp-success hover:bg-erp-success/90 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-erp-success/20 text-sm font-medium">
            <Banknote size={18} />
            Run Payroll
          </button>
        </motion.div>
      </div>

      {/* HR Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HRStat icon={Users} label="Total Staff" value="48" color="blue" />
        <HRStat icon={Clock} label="On Leave" value="4" color="yellow" />
        <HRStat icon={Plane} label="Active Missions" value="2" color="purple" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Employee Directory */}
        <motion.div variants={itemVariants} className="glass-card flex flex-col">
          <div className="p-6 border-b border-erp-border flex items-center justify-between">
            <h3 className="font-bold text-erp-text-main">Employee Directory</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-erp-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-erp-bg/50 border border-erp-border rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-erp-accent/50"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-erp-text-muted text-left bg-erp-bg/30">
                  <th className="py-3 px-6 font-semibold uppercase tracking-wider text-[10px]">Name</th>
                  <th className="py-3 px-6 font-semibold uppercase tracking-wider text-[10px]">Role</th>
                  <th className="py-3 px-6 font-semibold uppercase tracking-wider text-[10px]">Salary</th>
                  <th className="py-3 px-6 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-erp-border">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-erp-bg/50 transition-colors cursor-pointer">
                    <td className="py-3 px-6 font-medium text-erp-text-main">{emp.name}</td>
                    <td className="py-3 px-6 text-erp-text-muted text-xs">{emp.position}</td>
                    <td className="py-3 px-6 text-erp-text-main font-semibold">${emp.salary}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        emp.status === 'Active' ? 'bg-erp-success/10 text-erp-success' : 'bg-erp-warning/10 text-erp-warning'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mission Fees Management */}
        <motion.div variants={itemVariants} className="glass-card flex flex-col">
          <div className="p-6 border-b border-erp-border">
            <h3 className="font-bold text-erp-text-main">Mission Fee Requests</h3>
            <p className="text-[10px] text-erp-text-muted uppercase mt-1">Approvals here will notify Accounting</p>
          </div>
          <div className="p-6 space-y-4">
            {missions.map(mission => (
              <div key={mission.id} className="flex items-center justify-between p-4 bg-erp-bg/30 rounded-xl border border-erp-border group hover:border-erp-accent/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-erp-accent/10 flex items-center justify-center text-erp-accent">
                    <Plane size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-erp-text-main">{mission.employeeName}</p>
                    <p className="text-xs text-erp-text-muted">{mission.purpose} • {mission.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-erp-text-main">${mission.amount}</p>
                    <p className={`text-[10px] font-bold ${
                      mission.status === 'Approved' ? 'text-erp-success' : 
                      mission.status === 'Pending' ? 'text-erp-warning' : 'text-erp-text-muted'
                    }`}>{mission.status}</p>
                  </div>
                  {mission.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => approveMission(mission.id)}
                        className="p-1.5 bg-erp-success/10 text-erp-success rounded-lg hover:bg-erp-success hover:text-white transition-all"
                        title="Approve"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="p-1.5 bg-erp-danger/10 text-erp-danger rounded-lg hover:bg-erp-danger hover:text-white transition-all" title="Reject">
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HRStat = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    yellow: 'text-amber-500 bg-yellow-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
  };

  return (
    <div className="glass-card p-6 flex items-center gap-5 hover:shadow-md transition-all group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-xs font-bold text-erp-text-muted uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-erp-text-main mt-1">{value}</p>
      </div>
    </div>
  );
};

export default HR;
