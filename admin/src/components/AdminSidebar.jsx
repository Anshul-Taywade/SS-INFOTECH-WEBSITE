import { Link, useLocation } from 'react-router-dom';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  LayoutDashboard, Image as ImageIcon, MessageSquare, 
  Briefcase, Users, Settings, ShieldCheck, ExternalLink, Sparkles, Sun, Moon, ChevronRight 
} from 'lucide-react';
import { SS_INFOTECH_LOGO_BASE64 } from '@/components/logoData';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Gallery Manager', href: '/gallery', icon: ImageIcon },
  { name: 'Inquiries & Leads', href: '/messages', icon: MessageSquare },
  { name: 'Services & Products', href: '/services', icon: Briefcase },
  { name: 'Team & Staff', href: '/team', icon: Users },
  { name: 'Site Settings', href: '/settings', icon: Settings },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const { isDarkMode, toggleTheme, setUserModalOpen } = useAdminTheme();

  return (
    <aside className={`w-64 border-r flex flex-col h-screen sticky top-0 font-outfit select-none shrink-0 z-40 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-slate-300' 
        : 'bg-white border-slate-200 text-slate-700 shadow-sm'
    }`}>
      {/* Brand Header */}
      <div className={`p-5 border-b flex items-center justify-between ${
        isDarkMode ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center p-1 overflow-hidden shadow-md group-hover:scale-105 transition-transform">
            <img src={SS_INFOTECH_LOGO_BASE64} alt="SS Infotech" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className={`text-base font-black leading-tight font-jakarta ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              SS INFOTECH
            </h1>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Control Panel
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ISO Certification Badge */}
      <div className={`mx-4 my-4 p-3.5 rounded-2xl border flex items-center gap-2.5 ${
        isDarkMode ? 'bg-purple-950/60 border-purple-800/80 text-white' : 'bg-purple-50/80 border-purple-100 text-purple-950'
      }`}>
        <ShieldCheck className="text-purple-600 dark:text-purple-400 shrink-0" size={18} />
        <div>
          <p className="text-[11px] font-extrabold font-jakarta">ISO 9001:2015 Firm</p>
          <p className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Enterprise Management
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto font-jakarta">
        <div className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider ${
          isDarkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Main Management
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30'
                  : isDarkMode
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'hover:bg-purple-50 text-slate-700 hover:text-purple-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : isDarkMode
                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                    : 'bg-purple-100 text-purple-800 border border-purple-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer & Theme Toggle */}
      <div className={`p-4 border-t space-y-2 ${
        isDarkMode ? 'border-slate-800' : 'border-slate-100'
      }`}>
        
        {/* Toggle Dark / Light Theme Button */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-jakarta transition-colors cursor-pointer border ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-300' 
              : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-purple-600" />}
            <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors font-jakarta ${
            isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
          }`}
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            <span>View Public Website</span>
          </span>
          <ExternalLink size={14} className="text-slate-400" />
        </a>

        {/* Clickable Admin Profile User Card */}
        <button
          onClick={() => setUserModalOpen(true)}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left font-jakarta transition-colors cursor-pointer border ${
            isDarkMode 
              ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300' 
              : 'bg-slate-50 hover:bg-purple-50 border-slate-200 text-slate-900'
          }`}
          title="Click to manage Admin User account"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
              AD
            </div>
            <div>
              <p className="font-extrabold text-xs leading-tight">Admin User</p>
              <p className="text-[10px] text-emerald-500 font-bold">Active Master Admin</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
