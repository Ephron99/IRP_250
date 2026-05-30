import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@erp250.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    let role: 'admin' | 'hr' | 'finance' = 'admin';
    let name = 'Admin User';

    if (email.includes('hr')) {
      role = 'hr';
      name = 'HR Manager';
    } else if (email.includes('finance')) {
      role = 'finance';
      name = 'Finance Director';
    }

    login(email, role, name);

    // Redirect based on role
    if (role === 'hr') {
      navigate('/hr');
    } else if (role === 'finance') {
      navigate('/finance');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden light">
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-erp-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-erp-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-erp-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-erp-accent/20">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#1e293b]">ERP 250</h1>
          <p className="text-[#64748b] mt-2 text-center">Professional Hotel Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1e293b] ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-erp-accent transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-erp-accent/50 focus:border-erp-accent transition-all text-[#1e293b]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1e293b] ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-erp-accent transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl py-3 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-erp-accent/50 focus:border-erp-accent transition-all text-[#1e293b]"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#1e293b] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between ml-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0] text-erp-accent focus:ring-erp-accent/50 bg-white" />
              <span className="text-xs text-[#64748b] group-hover:text-[#1e293b] transition-colors">Remember me</span>
            </label>
            <button type="button" className="text-xs text-erp-accent hover:underline">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-erp-accent hover:bg-erp-accent/90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-erp-accent/20 group"
          >
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#e2e8f0] text-center">
          <p className="text-xs text-[#64748b]">
            Don't have an account? <button className="text-erp-accent font-medium hover:underline">Contact IT Support</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
