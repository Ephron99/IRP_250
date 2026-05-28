import React from 'react';
import { Search, Bell, User, Calendar, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <header className="h-16 bg-erp-bg/80 backdrop-blur-md border-b border-erp-border flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-erp-text-main">
          {t('Welcome')}, Ephron - X Hotel
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-erp-text-muted group-focus-within:text-erp-accent transition-colors" size={18} />
          <input 
            type="text" 
            placeholder={t('Search') + '...'} 
            className="bg-erp-bg/50 border border-erp-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-erp-accent/50 focus:border-erp-accent w-64 transition-all text-erp-text-main"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 text-erp-text-muted hover:text-erp-text-main hover:bg-erp-bg/50 rounded-lg transition-all"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <div className="h-8 w-[1px] bg-erp-border"></div>

          <select 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-erp-bg/50 border border-erp-border rounded-lg px-2 py-1 text-xs text-erp-text-muted focus:outline-none focus:ring-1 focus:ring-erp-accent transition-all cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
          </select>

          <div className="h-8 w-[1px] bg-erp-border"></div>
          
          <button className="p-2 text-erp-text-muted hover:text-erp-text-main hover:bg-erp-bg/50 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-erp-danger rounded-full border-2 border-erp-bg"></span>
          </button>

          <div className="h-8 w-[1px] bg-erp-border"></div>

          <button className="flex items-center gap-2 p-1 pr-3 hover:bg-erp-bg/50 rounded-full transition-colors group">
            <div className="w-8 h-8 bg-erp-accent rounded-full flex items-center justify-center text-white shadow-sm shadow-erp-accent/20">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-erp-text-main group-hover:text-erp-accent transition-colors">Ephron</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
