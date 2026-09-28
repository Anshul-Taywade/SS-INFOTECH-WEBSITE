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
      </main>
    </div>
  );
}
