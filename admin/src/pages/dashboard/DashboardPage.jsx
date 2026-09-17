import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  ImageIcon, MessageSquare, Briefcase, 
  ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2, Clock, Plus, Mail, ArrowRight, 
  Users, Settings, Activity, X, History
} from 'lucide-react';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';
import { api } from '@/services/api';

export default function AdminDashboard() {
  const { isDarkMode } = useAdminTheme();
  const navigate = useNavigate();
  
  const [galleryItems, setGalleryItems] = useState(REAL_COMPANY_GALLERY_ITEMS);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ certification: 'ISO 9001:2015 Certified Firm' });
  const [activities, setActivities] = useState([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('ss_gallery_updated', handleUpdate);
    window.addEventListener('ss_services_updated', handleUpdate);
    window.addEventListener('ss_contacts_updated', handleUpdate);
    window.addEventListener('ss_settings_updated', handleUpdate);
    window.addEventListener('ss_activities_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('ss_gallery_updated', handleUpdate);
      window.removeEventListener('ss_services_updated', handleUpdate);
      window.removeEventListener('ss_contacts_updated', handleUpdate);
      window.removeEventListener('ss_settings_updated', handleUpdate);
      window.removeEventListener('ss_activities_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const loadData = async () => {
    try {
      const galleryRes = await api.getGallery();
      if (galleryRes && galleryRes.data) setGalleryItems(galleryRes.data);

      const servicesRes = await api.getServices();
      if (servicesRes && servicesRes.data) setServices(servicesRes.data);

      const contactsRes = await api.getContacts();
      if (contactsRes && contactsRes.data) setContacts(contactsRes.data);

      const settingsRes = await api.getSettings();
      if (settingsRes && settingsRes.data) setSettings(settingsRes.data);

      const actRes = await api.getActivityLogs();
      if (actRes && actRes.data) setActivities(actRes.data);
    } catch (e) {
      console.warn('Dashboard data fetch fallback active');
    }
  };

  const newContactsCount = contacts.filter(c => c.status === 'NEW' || c.status === 'New').length;
  const recentInquiries = contacts.slice(0, 4);
  const recentActivities = activities.slice(0, 4);

  const getActivityIcon = (cat) => {
    switch (cat) {
      case 'gallery':
        return <ImageIcon size={16} className="text-purple-600 dark:text-purple-400" />;
      case 'inquiry':
        return <MessageSquare size={16} className="text-amber-600 dark:text-amber-400" />;
      case 'service':
        return <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />;
      case 'team':
        return <Users size={16} className="text-fuchsia-600 dark:text-fuchsia-400" />;
      case 'settings':
        return <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Activity size={16} className="text-purple-600 dark:text-purple-400" />;
    }
  };

  const getActivityBg = (cat) => {
    switch (cat) {
      case 'gallery':
        return 'bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-800';
      case 'inquiry':
        return 'bg-amber-100 dark:bg-amber-950 border-amber-200 dark:border-amber-800';
      case 'service':
        return 'bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
      case 'team':
        return 'bg-fuchsia-100 dark:bg-fuchsia-950 border-fuchsia-200 dark:border-fuchsia-800';
      case 'settings':
        return 'bg-emerald-100 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-800';
    }
  };

  const handleActivityClick = (link) => {
    if (link) navigate(link);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Admin Dashboard" />

      <main className="p-4 sm:p-6 md:p-10 space-y-8 max-w-7xl w-full mx-auto">
        
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-800 via-purple-700 to-fuchsia-700 p-6 sm:p-8 text-white border border-purple-600/60 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold font-jakarta uppercase text-white">
              <Sparkles size={14} className="text-amber-300" />
              <span>Admin Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit">
              Welcome to SS Infotech Management Portal
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm font-medium max-w-2xl font-outfit leading-relaxed">
              Manage client inquiries, IT services, photo gallery, team profiles, and website settings in real-time. All changes update directly on the live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 z-10">
            <Link
              to="/messages"
              className="px-5 py-3 rounded-2xl bg-white text-purple-950 hover:bg-purple-50 font-extrabold text-xs uppercase tracking-wider font-jakarta transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>View Inquiries ({newContactsCount} New)</span>
            </Link>
            <Link
              to="/gallery"
              className="px-4 py-3 rounded-2xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/40 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Photo</span>
            </Link>
          </div>
        </div>

        {/* 4 Key Business Metric Cards (Inquiries First!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Client Inquiries */}
          <div 
            onClick={() => navigate('/messages')}
            className={`p-6 rounded-3xl border shadow-md space-y-3 font-outfit transition-all hover:shadow-xl cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 font-jakarta uppercase">Client Inquiries</span>
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <MessageSquare size={18} />
              </div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {contacts.length}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold font-jakarta flex items-center gap-1">
              <Clock size={13} />
              <span>{newContactsCount} New Leads Require Action</span>
            </p>
          </div>

          {/* Card 2: Active IT Services */}
          <div 
            onClick={() => navigate('/services')}
            className={`p-6 rounded-3xl border shadow-md space-y-3 font-outfit transition-all hover:shadow-xl cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 font-jakarta uppercase">Active IT Services</span>
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                <Briefcase size={18} />
              </div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {services.length}
            </div>
            <p className="text-xs text-slate-500 font-medium font-jakarta">Software, Cloud &amp; AI Capabilities</p>
          </div>

          {/* Card 3: Gallery Photos */}
          <div 
            onClick={() => navigate('/gallery')}
            className={`p-6 rounded-3xl border shadow-md space-y-3 font-outfit transition-all hover:shadow-xl cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 font-jakarta uppercase">Gallery Photos</span>
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <ImageIcon size={18} />
              </div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {galleryItems.length}
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-jakarta">
              <CheckCircle2 size={13} />
              <span>Live Website Photos Synced</span>
            </p>
          </div>

          {/* Card 4: ISO Compliance */}
          <div 
            onClick={() => navigate('/settings')}
            className={`p-6 rounded-3xl border shadow-md space-y-3 font-outfit transition-all hover:shadow-xl cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 font-jakarta uppercase">ISO Compliance</span>
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>9001:2015</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-jakarta truncate">
              {settings.certification || 'ISO Certified Standard'}
            </p>
          </div>

        </div>

        {/* Media Gallery Quick Grid (Max 4 images) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-black font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Official SS Infotech Media Gallery
              </h3>
              <p className="text-xs text-slate-500 font-jakarta">Showing latest 4 corporate photos live on website</p>
            </div>
            <Link 
              to="/gallery" 
              className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900 text-xs font-extrabold transition-colors flex items-center gap-1.5 font-jakarta border border-purple-200 dark:border-purple-800 cursor-pointer"
            >
              <span>View All ({galleryItems.length} Photos)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.slice(0, 4).map((item) => (
              <div key={item.id || item._id} className={`group relative rounded-2xl overflow-hidden border shadow-sm transition-all hover:shadow-md ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Dashboard: Recent Client Inquiries & Dynamic Interactive Activity Log */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Recent Client Inquiries Widget */}
          <div className={`p-6 rounded-3xl border shadow-md space-y-4 font-outfit ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recent Client Inquiries</h3>
                <p className="text-xs text-slate-500 font-jakarta">Latest business leads received from website</p>
              </div>
              <Link to="/messages" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-jakarta cursor-pointer">
                <span>Manage Leads</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3 font-jakarta text-xs">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div 
                    key={inquiry.id || inquiry._id} 
                    onClick={() => navigate('/messages')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all hover:border-purple-500 cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inquiry.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                          inquiry.status === 'NEW' || inquiry.status === 'New' 
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800' 
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                        }`}>
                          {inquiry.status || 'NEW'}
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium truncate">{inquiry.subject || inquiry.service}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{inquiry.date || 'Recent'}</p>
                    </div>

                    <div className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shrink-0 transition-colors">
                      <Mail size={14} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No recent inquiries</div>
              )}
            </div>
          </div>

          {/* Interactive Dynamic System Activity Log (Requirement 2) */}
          <div className={`p-6 rounded-3xl border shadow-md space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-base font-black font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recent System Activities</h3>
                <p className="text-xs text-slate-500 font-jakarta">Click card to navigate directly to management page</p>
              </div>

              <button
                onClick={() => setIsActivityModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200 text-xs font-bold font-jakarta transition-colors border border-purple-200 dark:border-purple-800 flex items-center gap-1 cursor-pointer"
              >
                <History size={13} />
                <span>View All Activities</span>
              </button>
            </div>

            <div className="space-y-3 font-jakarta text-xs">
              {recentActivities.length > 0 ? (
                recentActivities.map((act) => (
                  <div
                    key={act.id || act._id}
                    onClick={() => handleActivityClick(act.link)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all hover:border-purple-500 hover:scale-[1.01] cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${getActivityBg(act.category)}`}>
                      {getActivityIcon(act.category)}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{act.title}</p>
                        <ArrowUpRight size={13} className="text-slate-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{act.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                        <span>{act.adminName || 'Admin User'}</span>
                        <span>{act.createdAt ? new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No activities logged yet.</div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* Activity Log History Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-950 border border-purple-800 text-purple-400">
                  <History size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white font-outfit">System Activity History</h2>
                  <p className="text-xs text-slate-400 font-jakarta">Complete log of all admin operations, updates, and website events.</p>
                </div>
              </div>

              <button 
                onClick={() => setIsActivityModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 font-jakarta text-xs pr-1 flex-1">
              {activities.map((act) => (
                <div
                  key={act.id || act._id}
                  onClick={() => {
                    setIsActivityModalOpen(false);
                    handleActivityClick(act.link);
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500 transition-all flex items-start gap-4 cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${getActivityBg(act.category)}`}>
                    {getActivityIcon(act.category)}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-white text-sm leading-snug">{act.title}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 font-mono uppercase">
                        {act.category || 'system'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-outfit">{act.description}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                      <span>Log By: {act.adminName || 'Admin User'}</span>
                      <span>{act.createdAt ? new Date(act.createdAt).toLocaleString() : 'Recent'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-jakarta cursor-pointer"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
