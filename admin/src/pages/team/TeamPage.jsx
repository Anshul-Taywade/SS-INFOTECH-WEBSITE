import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Plus, Edit, Trash2, X, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '@/services/api';

export default function TeamManagerPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Engineering Lead',
    email: '',
    photo: '/images/gallery/ss-infotech-team-lead-1.jpg',
    specialty: ''
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const res = await api.getTeam();
      if (res && res.data) {
        setTeam(res.data);
      }
    } catch (e) {
      console.warn('Team fetch fallback active');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this team profile permanently? It will be removed from the live website.')) {
      const remaining = team.filter(m => m.id !== id && m._id !== id);
      setTeam(remaining);
      await api.deleteTeamMember(id);
      showToast('Team member profile permanently removed');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const res = await api.createTeamMember(formData);
    if (res && res.data) {
      setTeam([...team, res.data]);
    } else {
      setTeam([...team, { _id: `team-${Date.now()}`, id: `team-${Date.now()}`, ...formData }]);
    }
    setIsAddModalOpen(false);
    showToast(`Team profile for ${formData.name} added!`);
    setFormData({ name: '', role: 'Engineering Lead', email: '', photo: '/images/gallery/ss-infotech-team-lead-1.jpg', specialty: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingMember) return;

    await api.updateTeamMember(editingMember.id || editingMember._id, editingMember);
    setTeam(team.map(m => (m.id === editingMember.id || m._id === editingMember._id) ? editingMember : m));
    setEditingMember(null);
    showToast('Team profile updated successfully');
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Team &amp; Corporate Staff" />

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
              <span>Executive Team &amp; Specialists</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {team.length} Key Profiles
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Manage corporate team profiles, roles, and media portraits live on the website.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add Team Member</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-jakarta text-xs flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-purple-500" />
            <span>Loading team profiles...</span>
          </div>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div key={member.id || member._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-slate-700">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 font-outfit">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 font-jakarta uppercase">
                      {member.role}
                    </span>
                    <h3 className="text-base font-black text-white">{member.name}</h3>
                    <p className="text-xs text-purple-400 font-medium font-jakarta">{member.specialty}</p>
                    <p className="text-xs text-slate-400 font-mono pt-1">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 self-end sm:self-center">
                  <button
                    onClick={() => setEditingMember(member)}
                    className="p-2 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors cursor-pointer"
                    title="Edit Profile"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id || member._id)}
                    className="p-2 rounded-xl bg-rose-950 text-rose-400 hover:bg-rose-900 transition-colors cursor-pointer"
                    title="Delete Profile Permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-3xl text-xs font-jakarta">
            No team profiles found. Click "Add Team Member" to create one.
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-black text-white">Add New Team Member</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4 font-jakarta text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Full Name & Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Cloud Architect"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Department / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engineering Lead"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Specialty / Capabilities</label>
                  <input
                    type="text"
                    placeholder="e.g. Microservices & AI Engineering"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Photo URL / Path</label>
                  <input
                    type="text"
                    required
                    placeholder="/images/gallery/ss-infotech-team-lead-1.jpg"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="member@ssinfotech.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-black text-white">Edit Team Profile</h2>
                <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 font-jakarta text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Full Name & Title</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Role</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Specialty</label>
                  <input
                    type="text"
                    value={editingMember.specialty || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Photo Path</label>
                  <input
                    type="text"
                    required
                    value={editingMember.photo || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, photo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={editingMember.email || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 cursor-pointer"
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
