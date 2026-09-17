import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Plus, Edit, Trash2, CheckCircle2, 
  X, Loader2
} from 'lucide-react';
import { api } from '@/services/api';

export default function ServicesManagerPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'Software Engineering', description: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.getServices();
      if (res && res.data) {
        setServices(res.data.map(s => ({
          ...s,
          id: s._id || s.id,
          status: s.isActive !== false ? 'Active' : 'Draft',
          features: s.features || s.details || ['Enterprise SLA', 'Dedicated Engineer Support']
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
    const target = services.find(s => s.id === id || s._id === id);
    const nextStatus = target?.status === 'Active' ? 'Draft' : 'Active';
    
    const updated = services.map(s => (s.id === id || s._id === id) ? { ...s, status: nextStatus } : s);
    setServices(updated);
    showToast(`Service "${target?.title}" status updated to ${nextStatus}`);
    await api.updateService(id, { isActive: nextStatus === 'Active' });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this service offering permanently? It will be removed from the live website.')) {
      const remaining = services.filter(s => s.id !== id && s._id !== id);
      setServices(remaining);
      showToast('Service deleted permanently');
      await api.deleteService(id);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    const newSrvData = {
      ...formData,
      status: 'Active',
      features: ['Enterprise SLA', 'Dedicated Engineer Support']
    };
    
    const res = await api.createService(newSrvData);
    if (res && res.data) {
      setServices([res.data, ...services]);
    } else {
      setServices([{ id: `srv-${Date.now()}`, _id: `srv-${Date.now()}`, ...newSrvData }, ...services]);
    }
    setIsModalOpen(false);
    showToast(`New service "${formData.title}" created successfully!`);
    setFormData({ title: '', category: 'Software Engineering', description: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    
    await api.updateService(editingService.id || editingService._id, editingService);
    setServices(services.map(s => (s.id === editingService.id || s._id === editingService._id) ? editingService : s));
    setEditingService(null);
    showToast(`Service "${editingService.title}" updated!`);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Services &amp; Product Solutions" />

      <main className="p-4 sm:p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto relative">
        
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
            <p className="text-xs text-slate-400 font-jakarta">Configure corporate service capabilities and features. Syncs live to public website.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-jakarta text-xs flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-purple-500" />
            <span>Loading IT services...</span>
          </div>
        ) : services.length > 0 ? (
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
                    <button 
                      onClick={() => setEditingService(srv)} 
                      className="p-2 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors cursor-pointer"
                      title="Edit Service Details"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(srv.id || srv._id)} 
                      className="p-2 rounded-xl bg-rose-950 text-rose-400 hover:bg-rose-900 transition-colors cursor-pointer"
                      title="Delete Service Permanently"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-3xl text-xs font-jakarta">
            No IT services found. Click "Add New Service" to create one.
          </div>
        )}

        {/* Create Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white font-outfit">Add New IT Service</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
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
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white font-outfit">Edit IT Service</h3>
                <button onClick={() => setEditingService(null)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 font-jakarta text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase text-slate-400">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase text-slate-400">Category</label>
                  <select
                    value={editingService.category || 'Software Engineering'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
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
                    value={editingService.description || ''}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    Save Changes
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
