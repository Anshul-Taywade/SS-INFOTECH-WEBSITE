import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  User, ShieldCheck, Mail, Phone, Lock, LogOut, X, 
  Sparkles, CheckCircle2, Key, Clock, Settings 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminUserProfileModal() {
  const { userModalOpen, setUserModalOpen, isDarkMode } = useAdminTheme();

  if (!userModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md font-outfit">
      
      <div className={`relative max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={() => setUserModalOpen(false)}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors cursor-pointer ${
            isDarkMode ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <X size={18} />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-700 to-fuchsia-600 flex items-center justify-center text-white font-black text-xl shadow-lg font-outfit">
              AD
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black font-outfit">Admin User</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-mono">
                Super Admin
              </span>
            </div>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 font-jakarta">admin@ssinfotech.org</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">SS Infotech Central Administration</p>
          </div>
        </div>

        {/* Admin Details Matrix */}
        <div className={`p-4 rounded-2xl space-y-3 font-jakarta text-xs border ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Security Clearance</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>Level 5 (Full Access)</span>
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2.5">
            <span className="text-slate-500 font-medium">ISO Compliance Officer</span>
            <span className="font-extrabold text-purple-600 dark:text-purple-400">ISO 9001:2015 Verified</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2.5">
            <span className="text-slate-500 font-medium">Active Session Status</span>
            <span className="font-mono text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
              <Clock size={12} className="text-emerald-500" />
              <span>Active (Live Session)</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 font-jakarta text-xs">
          <Link
            to="/settings"
            onClick={() => setUserModalOpen(false)}
            className={`w-full py-2.5 px-4 rounded-xl font-bold flex items-center justify-between transition-colors ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={15} className="text-purple-600 dark:text-purple-400" />
              <span>Edit Admin Profile &amp; Preferences</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">&rarr;</span>
          </Link>

          <button
            onClick={() => {
              alert('Security password reset link dispatched to admin@ssinfotech.org');
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold flex items-center justify-between transition-colors cursor-pointer ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Key size={15} className="text-amber-500" />
              <span>Change Security Password</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">&rarr;</span>
          </button>
        </div>

        {/* Logout */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to log out of SS Infotech Admin Panel?')) {
                setUserModalOpen(false);
                window.location.href = '/';
              }
            }}
            className="w-full py-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-extrabold text-xs uppercase tracking-wider font-jakarta transition-colors flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-800 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Log Out Admin Session</span>
          </button>
        </div>

      </div>

    </div>
  );
}
