import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Briefcase, Plus, Edit, Trash2, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Cpu, Code2, Database, Globe, X, Loader2 
} from 'lucide-react';
import { api } from '@/services/api';

const initialServices = [
  {
    id: 'srv-1',
    _id: 'srv-1',
    title: 'Custom Enterprise SaaS Platforms',
    category: 'Software Engineering',
    status: 'Active',
    description: 'High-concurrency microservices, multi-tenant architecture, and cloud SaaS product development.',
    features: ['Multi-tenant Isolation', '99.99% Reliability SLA', 'Automated CI/CD Deployment']
  },
  {
    id: 'srv-2',
    _id: 'srv-2',
    title: 'AI & Data Engineering Solutions',
    category: 'Artificial Intelligence',
    status: 'Active',
    description: 'Predictive analytics, custom machine learning models, Power BI business intelligence dashboards.',
    features: ['Real-time Telemetry', 'Predictive ML Pipelines', 'Automated Reporting']
  },
  {
    id: 'srv-3',
    _id: 'srv-3',
    title: 'Cloud Infrastructure & DevOps',
    category: 'Cloud Architecture',
    status: 'Active',
    description: 'Kubernetes orchestration, serverless security compliance, and zero-downtime database migration.',
    features: ['Kubernetes Orchestration', 'ISO Security Audit', 'Zero-Downtime Deployment']
  },
  {
    id: 'srv-4',
    _id: 'srv-4',
    title: 'Corporate IT & Engineering Upskilling',
    category: 'Training & Development',
    status: 'Active',
    description: 'Hands-on developer workshops, web stack mastery, system design and corporate training modules.',
    features: ['Hands-on Code Labs', 'Customized Curriculum', 'Certification Support']
  }
];

export default function ServicesManagerPage() {
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Software Engineering', description: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.getServices();
      if (res && res.data && res.data.length > 0) {
        setServices(res.data.map(s => ({
          ...s,
          id: s._id || s.id,
          status: s.isActive !== false ? 'Active' : 'Draft',
          features: s.features || ['Enterprise SLA', 'Dedicated Support']
        })));
      }
    } catch (err) {
      console.warn('API Services Notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleStatus = async (id) => {
    const updated = services.map(s => {
      if (s.id === id || s._id === id) {
        const nextStatus = s.status === 'Active' ? 'Draft' : 'Active';
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setServices(updated);
    showToast('Service status toggled successfully');
    try {
      const target = services.find(s => s.id === id || s._id === id);
      await api.updateService(id, { isActive: target?.status !== 'Active' });
    } catch (err) {
      console.warn('Backend update warning:', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this service offering permanently?')) {
      setServices(services.filter(s => s.id !== id && s._id !== id));
      showToast('Service deleted permanently');
      try {
        await api.deleteService(id);
      } catch (err) {
        console.warn('Backend delete warning:', err.message);
      }
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    const newSrv = {
      id: `srv-${Date.now()}`,
      ...formData,
      status: 'Active',
      features: ['Enterprise SLA', 'Dedicated Engineer Support']
    };
    setServices([newSrv, ...services]);
    setIsModalOpen(false);
    showToast(`New service "${formData.title}" created!`);
    try {
      await api.createService(formData);
    } catch (err) {
      console.warn('Backend create service warning:', err.message);
    }
    setFormData({ title: '', category: 'Software Engineering', description: '' });
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Services &amp; Product Solutions" />

      <main className="p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto relative">
        
        {notification && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-extrabold flex items-center gap-3 font-jakarta shadow-xl">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>IT Services &amp; Solutions</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {services.length} Active Services
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Configure corporate service capabilities, pricing models, and client features.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div key={srv.id || srv._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3 font-outfit">
                <div className="flex items-center justify-between font-jakarta">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 uppercase">
                    {srv.category}
                  </span>
                  <button
                    onClick={() => toggleStatus(srv.id || srv._id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-colors ${
                      srv.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {srv.status}
                  </button>
                </div>

                <h3 className="text-lg font-black text-white">{srv.title}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed font-outfit">{srv.description}</p>

                <div className="space-y-1.5 pt-2">
                  {srv.features && srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-300 font-jakarta">
                      <CheckCircle2 size={13} className="text-purple-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-jakarta text-xs">
                <span className="font-mono text-slate-500 font-bold">{srv.id || srv._id}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(srv.id || srv._id)} className="p-2 rounded-xl bg-rose-950 text-rose-400 hover:bg-rose-900 transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white font-outfit">Add New IT Service</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddService} className="space-y-4 font-jakarta text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase text-slate-400">Service Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Cloud DevOps & Automation"
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase text-slate-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Training & Development">Training & Development</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase text-slate-400">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of IT capabilities..."
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
