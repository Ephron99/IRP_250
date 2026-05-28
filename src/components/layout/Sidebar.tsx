import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Waves, 
  Utensils, 
  Users, 
  Banknote, 
  ShoppingCart, 
  Megaphone, 
  ShieldCheck, 
  Wrench, 
  Monitor,
  Building2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: UserCheck, label: 'Front Office', path: '/front-office' },
  { icon: Waves, label: 'Housekeeping', path: '/housekeeping' },
  { icon: Utensils, label: 'F&B Service', path: '/fb-service' },
  { icon: Users, label: 'Human Resources', path: '/hr' },
  { icon: Banknote, label: 'Accounting & Finance', path: '/finance' },
  { icon: ShoppingCart, label: 'Purchasing & Inventory', path: '/purchasing' },
  { icon: Megaphone, label: 'Sales & Marketing', path: '/marketing' },
  { icon: ShieldCheck, label: 'Security', path: '/security' },
  { icon: Wrench, label: 'Engineering & Maintenance', path: '/engineering' },
  { icon: Monitor, label: 'IT', path: '/it' },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-erp-sidebar h-screen flex flex-col border-r border-erp-border fixed left-0 top-0 z-50 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-erp-accent rounded-xl flex items-center justify-center shadow-lg shadow-erp-accent/20">
          <Building2 className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-erp-text-main">ERP 250</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-erp-accent/10 text-erp-accent border-r-4 border-erp-accent shadow-sm' 
                : 'text-erp-text-muted hover:bg-erp-bg hover:text-erp-text-main'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{t(item.label)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-erp-border space-y-4">
        <div className="flex items-center gap-3 px-3 py-2 text-erp-text-muted">
          <div className="w-8 h-8 rounded-full bg-erp-accent/20 flex items-center justify-center">
            <Users size={16} className="text-erp-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-erp-text-main truncate">Ephron</p>
            <p className="text-[10px] truncate">X Hotel</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-erp-danger hover:bg-erp-danger/5 rounded-lg transition-colors text-sm font-medium"
        >
          <Monitor size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
