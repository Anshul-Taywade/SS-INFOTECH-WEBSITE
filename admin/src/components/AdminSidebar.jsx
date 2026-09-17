import { Link, useLocation } from 'react-router-dom';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  LayoutDashboard, Image as ImageIcon, MessageSquare, 
  Briefcase, Users, Settings, ExternalLink, Sparkles, ChevronRight, X 
} from 'lucide-react';

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
  const { isDarkMode, setUserModalOpen, isSidebarOpen, setIsSidebarOpen } = useAdminTheme();

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 border-r flex flex-col h-screen font-outfit select-none shrink-0 
        transition-all duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:sticky lg:top-0
        ${isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-300' 
          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }
      `}>
        {/* Brand Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex flex-col gap-1.5 group">
            {/* Crisp Official Company Logo Box */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-md border border-slate-200 dark:border-white/20 inline-flex items-center transition-transform group-hover:scale-105">
              <img 
                src="/images/logos/logo.png" 
                alt="SS INFOTECH" 
                className="h-8 sm:h-9 w-auto object-contain" 
                onError={(e) => { e.currentTarget.src = '/images/logos/logo.jpg'; }}
              />
            </div>
            
            <div className="flex items-center gap-1.5 pl-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-[10px] font-extrabold uppercase tracking-widest font-mono ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Admin Portal
              </span>
            </div>
          </Link>

          {/* Close drawer button on mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto font-jakarta">
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
                onClick={() => setIsSidebarOpen(false)}
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
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t space-y-2 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          
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
    </>
  );
}
