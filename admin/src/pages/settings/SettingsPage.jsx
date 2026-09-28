import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Settings, Save, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { api } from '@/services/api';

export default function SettingsManagerPage() {
  const [config, setConfig] = useState({
    companyName: 'SS INFOTECH',
    certification: 'ISO 9001:2015 Certified Firm',
    email: 'info@ssinfotech.org',
    phone: '+91 77700 23791',
    address: '#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.',
    location: 'Software R&D Hub & Training Center',
    galleryRealMode: true,
    autoSyncMedia: true
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res && res.data) {
        setConfig(prev => ({ ...prev, ...res.data }));
      }
    } catch (e) {
      console.warn('Settings load fallback active');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await api.updateSettings(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Website Configuration &amp; Settings" />

      <main className="p-4 sm:p-6 md:p-10 space-y-6 max-w-4xl w-full mx-auto">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <Settings size={20} className="text-purple-400" />
              <span>General Settings &amp; Compliance</span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Configure primary business details, ISO 9001:2015 certification, and contact details for the live website.</p>
          </div>

          {saved && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold font-jakarta flex items-center gap-1">
              <CheckCircle2 size={14} />
              <span>Live Website Updated!</span>
            </span>
          )}
        </div>

        {/* Highlighted ISO 9001:2015 Badge Card (Moved from Sidebar as per Part 3 requirement) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-purple-950/80 border border-purple-800/80 shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-900/60 border border-purple-700 text-purple-300 shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-1 font-jakarta">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">ISO Compliance Management</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase font-mono">
                Active Standard
              </span>
            </div>
            <p className="text-xs text-slate-300">
              The corporate ISO 9001:2015 Quality Management System standard is displayed on public headers and footer badges.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 font-jakarta text-xs">
          
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-jakarta text-purple-400 border-b border-slate-800 pb-2">
              Corporate Branding &amp; Certification
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={config.companyName || ''}
                  onChange={(e) => setConfig({...config, companyName: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ISO Certification Standard</label>
                <input
                  type="text"
                  value={config.certification || ''}
                  onChange={(e) => setConfig({...config, certification: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-jakarta text-purple-400 border-b border-slate-800 pb-2">
              Public Contact Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                  <Mail size={13} className="text-purple-400" />
                  <span>Primary Contact Email</span>
                </label>
                <input
                  type="email"
                  value={config.email || ''}
                  onChange={(e) => setConfig({...config, email: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                  <Phone size={13} className="text-purple-400" />
                  <span>Primary Contact Phone</span>
                </label>
                <input
                  type="text"
                  value={config.phone || ''}
                  onChange={(e) => setConfig({...config, phone: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-purple-400" />
                  <span>Official Business Address</span>
                </label>
                <input
                  type="text"
                  value={config.address || ''}
                  onChange={(e) => setConfig({...config, address: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-jakarta text-purple-400 border-b border-slate-800 pb-2">
              Media &amp; Live Website Settings
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Live Data Synchronization</p>
                <p className="text-[11px] text-slate-400">Instantly propagate admin edits to public website components.</p>
              </div>
              <input
                type="checkbox"
                checked={config.autoSyncMedia !== false}
                onChange={(e) => setConfig({...config, autoSyncMedia: e.target.checked})}
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Save size={16} />
              <span>Save Configuration</span>
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}
