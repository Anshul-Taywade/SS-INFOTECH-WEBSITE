import { useState } from 'react';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  Bell, Search, User, Sparkles, CheckCircle2, Shield, Moon, Sun, ChevronDown 
} from 'lucide-react';

export default function AdminHeader({ title = 'Dashboard Overview' }) {
  const { isDarkMode, toggleTheme, setUserModalOpen } = useAdminTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className={`h-20 border-b px-6 flex items-center justify-between sticky top-0 z-30 font-outfit transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className={`text-xl font-black font-outfit tracking-tight flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <span>{title}</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium font-jakarta">SS Infotech Central Administration</p>
        </div>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search gallery, inquiries, settings..."
            className={`w-64 pl-10 pr-4 py-2 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-purple-500 font-jakarta border transition-colors ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800 text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        {/* Theme Toggle Button (Light / Dark Mode) */}
        <button
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 text-xs font-bold font-jakarta cursor-pointer ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-300'
              : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900 shadow-sm'
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun size={18} className="text-amber-400 animate-spin-slow" />
              <span className="hidden sm:inline font-extrabold">Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="text-purple-600" />
              <span className="hidden sm:inline font-extrabold">Dark Mode</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`relative p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white' 
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-white dark:border-slate-900" />
          </button>

          {notificationsOpen && (
            <div className={`absolute right-0 mt-3 w-80 rounded-2xl border shadow-2xl p-4 space-y-3 z-50 text-xs font-jakarta ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold">Notifications</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[10px] font-bold">3 Unread</span>
              </div>
              <div className="space-y-2">
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-purple-50/70 border-purple-100'}`}>
                  <p className="font-bold">15 Real Photos Synced</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">All gallery media updated with official SS Infotech photos.</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-purple-50/70 border-purple-100'}`}>
                  <p className="font-bold">New Client Inquiry</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Enterprise Cloud Architecture inquiry received.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clickable Admin User Profile Button */}
        <button
          onClick={() => setUserModalOpen(true)}
          className={`flex items-center gap-3 pl-3 border-l transition-all p-1.5 rounded-2xl cursor-pointer ${
            isDarkMode 
              ? 'border-slate-800 hover:bg-slate-800/80' 
              : 'border-slate-200 hover:bg-purple-50/80'
          }`}
          title="Click to view Admin User Profile & Settings"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-black text-xs shadow-md">
              AD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="hidden sm:block text-left font-jakarta">
            <div className="flex items-center gap-1">
              <p className={`text-xs font-extrabold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Admin User
              </p>
              <ChevronDown size={13} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400">Super Administrator</p>
          </div>
        </button>

      </div>

    </header>
  );
}
