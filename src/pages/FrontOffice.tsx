import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  UserPlus, 
  Bed, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'Checked In' | 'Pending' | 'Checked Out';
  amount: string;
}

const initialGuests: Guest[] = [
  { id: '1', name: 'John Doe', room: '101', checkIn: '2023-10-25', checkOut: '2023-10-28', status: 'Checked In', amount: '$450' },
  { id: '2', name: 'Jane Smith', room: '205', checkIn: '2023-10-26', checkOut: '2023-10-30', status: 'Pending', amount: '$720' },
  { id: '3', name: 'Robert Brown', room: '302', checkIn: '2023-10-24', checkOut: '2023-10-26', status: 'Checked Out', amount: '$310' },
  { id: '4', name: 'Emily Davis', room: '404', checkIn: '2023-10-27', checkOut: '2023-11-01', status: 'Pending', amount: '$1,200' },
  { id: '5', name: 'Michael Wilson', room: '108', checkIn: '2023-10-26', checkOut: '2023-10-27', status: 'Checked In', amount: '$150' },
];

const FrontOffice = () => {
  const [guests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');

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
          <h1 className="text-2xl font-bold text-erp-text-main">Front Office</h1>
          <p className="text-erp-text-muted text-sm">Guest management and room assignments</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-erp-accent hover:bg-erp-accent/90 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-erp-accent/20 text-sm font-medium">
            <Plus size={18} />
            New Booking
          </button>
          <button className="flex items-center gap-2 bg-erp-bg border border-erp-border text-erp-text-main px-4 py-2 rounded-xl hover:bg-erp-bg/80 transition-all text-sm font-medium">
            <UserPlus size={18} />
            Quick Check-in
          </button>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <QuickStat icon={Bed} label="Total Rooms" value="120" color="blue" />
        <QuickStat icon={CheckCircle2} label="Occupied" value="84" color="green" />
        <QuickStat icon={Clock} label="Pending Arrivals" value="12" color="yellow" />
        <QuickStat icon={AlertCircle} label="Due Out Today" value="8" color="red" />
      </motion.div>

      {/* Guest List Table */}
      <motion.div variants={itemVariants} className="glass-card overflow-hidden">
        <div className="p-6 border-b border-erp-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-erp-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search guests, rooms, or status..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-erp-bg/50 border border-erp-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-erp-accent/50 focus:border-erp-accent transition-all text-erp-text-main"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-erp-text-muted hover:text-erp-text-main hover:bg-erp-bg/50 rounded-lg transition-all border border-erp-border">
              <Filter size={18} />
            </button>
            <div className="h-8 w-[1px] bg-erp-border mx-1"></div>
            <button className="text-sm font-medium text-erp-text-muted hover:text-erp-text-main transition-colors">Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-erp-text-muted bg-erp-bg/30">
                <th className="text-left py-4 px-6 font-semibold uppercase tracking-wider">Guest Name</th>
                <th className="text-left py-4 px-6 font-semibold uppercase tracking-wider">Room</th>
                <th className="text-left py-4 px-6 font-semibold uppercase tracking-wider">Check In</th>
                <th className="text-left py-4 px-6 font-semibold uppercase tracking-wider">Check Out</th>
                <th className="text-left py-4 px-6 font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 font-semibold uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-erp-border">
              {guests.map((guest) => (
                <tr key={guest.id} className="group hover:bg-erp-bg/50 transition-all cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-erp-accent/10 flex items-center justify-center text-erp-accent font-bold text-xs">
                        {guest.name.charAt(0)}
                      </div>
                      <span className="font-medium text-erp-text-main">{guest.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-erp-bg px-2 py-1 rounded-md border border-erp-border text-erp-text-muted text-xs font-mono">
                      {guest.room}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-erp-text-muted">{guest.checkIn}</td>
                  <td className="py-4 px-6 text-erp-text-muted">{guest.checkOut}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={guest.status} />
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-erp-text-main">{guest.amount}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1 text-erp-text-muted hover:text-erp-text-main transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-erp-border bg-erp-bg/30 flex items-center justify-between">
          <p className="text-xs text-erp-text-muted">Showing 5 of 124 guests</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium bg-erp-bg border border-erp-border rounded-lg hover:bg-erp-bg/80 transition-all disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 text-xs font-medium bg-erp-bg border border-erp-border rounded-lg hover:bg-erp-bg/80 transition-all">Next</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const QuickStat = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    green: 'text-green-500 bg-green-500/10',
    yellow: 'text-yellow-500 bg-yellow-500/10',
    red: 'text-red-500 bg-red-500/10'
  };

  return (
    <div className="glass-card p-5 flex items-center gap-4 hover:shadow-md transition-all group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-medium text-erp-text-muted uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-erp-text-main mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Guest['status'] }) => {
  const styles: any = {
    'Checked In': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'Pending': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    'Checked Out': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default FrontOffice;
