import { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Settings, Save, ShieldCheck, Mail, Phone, MapPin, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SettingsManagerPage() {
  const [config, setConfig] = useState({
    companyName: 'SS INFOTECH',
    certification: 'ISO 9001:2015 Certified Firm',
    email: 'info@ssinfotech.org',
    phone: '+91 98765 43210',
    location: 'Software R&D Hub & Training Center',
    galleryRealMode: true,
    autoSyncMedia: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Website Configuration &amp; Settings" />

      <main className="p-6 md:p-10 space-y-6 max-w-4xl w-full mx-auto">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <Settings size={20} className="text-purple-400" />
              <span>General Settings &amp; Compliance</span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Configure primary business details, ISO certifications, and media settings.</p>
          </div>

          {saved && (
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold font-jakarta flex items-center gap-1">
              <CheckCircle2 size={14} />
              <span>Settings Saved!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 font-jakarta text-xs">
          
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-jakarta text-purple-400 border-b border-slate-800 pb-2">
              Corporate Branding &amp; Contact Info
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => setConfig({...config, companyName: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ISO Certification Standard</label>
                <input
                  type="text"
                  value={config.certification}
                  onChange={(e) => setConfig({...config, certification: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Primary Email</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({...config, email: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => setConfig({...config, phone: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-jakarta text-purple-400 border-b border-slate-800 pb-2">
              Media &amp; Gallery Enforcement
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Enforce 100% Real SS Infotech Images Only</p>
                <p className="text-[11px] text-slate-400">Strictly exclude online/Unsplash stock photos across public gallery and pages.</p>
              </div>
              <input
                type="checkbox"
                checked={config.galleryRealMode}
                onChange={(e) => setConfig({...config, galleryRealMode: e.target.checked})}
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30"
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
