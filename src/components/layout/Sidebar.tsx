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
import { useLayout } from '../../context/LayoutContext';
import { X } from 'lucide-react';

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
  const { logout, user } = useAuth();
  const { isSidebarOpen, closeSidebar } = useLayout();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavItems = navItems.filter(item => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'hr') return item.path === '/hr' || item.path === '/';
    if (user?.role === 'finance') return item.path === '/finance' || item.path === '/';
    return item.path === '/';
  });

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      <div className={`
        w-64 bg-erp-sidebar h-screen flex flex-col border-r border-erp-border fixed left-0 top-0 z-[70] transition-all duration-300 text-white
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-erp-accent rounded-xl flex items-center justify-center shadow-lg shadow-erp-accent/20">
              <Building2 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">ERP 250</h1>
          </div>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-erp-sidebar-text-muted hover:text-erp-sidebar-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) closeSidebar();
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-white/20 text-white border-r-4 border-white shadow-sm font-bold' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{t(item.label)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 text-white/70">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Alex Johnson'}</p>
              <p className="text-[10px] truncate text-white/50">{user?.role?.toUpperCase() || 'ADMIN'} • X Hotel</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
          >
            <Monitor size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
