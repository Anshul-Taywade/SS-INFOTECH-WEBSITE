import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  MessageSquare, Mail, Phone, Search, 
  Trash2, CheckCircle2, Archive, Reply, Loader2, Sparkles
} from 'lucide-react';
import { api } from '@/services/api';

export default function MessagesManagerPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMessages(false);

    // Silent background polling every 8 seconds
    const interval = setInterval(() => {
      fetchMessages(true);
    }, 8000);

    const handleUpdate = () => fetchMessages(true);
    window.addEventListener('ss_contacts_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ss_infotech_channel') : null;
    if (bc) {
      bc.onmessage = (msg) => {
        if (msg && msg.data && msg.data.type === 'ss_contacts_updated') {
          fetchMessages(true);
        }
      };
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('ss_contacts_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      if (bc) bc.close();
    };
  }, []);

  const fetchMessages = async (isSilent = false) => {
    if (!isSilent && messages.length === 0) {
      setLoading(true);
    }
    try {
      const res = await api.getContacts();
      if (res && res.data) {
        const mapped = res.data.map(item => ({
          ...item,
          id: item._id || item.id,
          date: item.createdAt ? new Date(item.createdAt).toLocaleString() : (item.date || 'Recent'),
          status: item.status || 'NEW',
          subject: item.subject || item.service || 'Website Lead Inquiry'
        }));
        setMessages(mapped);

        // Keep selected message in sync with updated list
        if (selectedMessage) {
          const updatedSelected = mapped.find(m => m.id === selectedMessage.id || m._id === selectedMessage._id);
          if (updatedSelected) {
            setSelectedMessage(updatedSelected);
          }
        }
      }
    } catch (err) {
      console.warn('API Fetch Notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredMessages = messages.filter(msg => {
    // Status / Category Filter
    let matchesFilter = true;
    if (activeFilter === 'Service Inquiries') {
      matchesFilter = msg.category === 'SERVICE_INQUIRY' || (!msg.category && !msg.service?.toLowerCase().includes('job'));
    } else if (activeFilter === 'Job Applications') {
      matchesFilter = msg.category === 'JOB_APPLICATION' || (msg.service && msg.service.toLowerCase().includes('job'));
    } else if (activeFilter !== 'All') {
      matchesFilter = (msg.status || '').toUpperCase() === activeFilter.toUpperCase();
    }

    // Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesFilter;

    const matchesSearch = 
      (msg.name || '').toLowerCase().includes(query) ||
      (msg.email || '').toLowerCase().includes(query) ||
      (msg.subject || '').toLowerCase().includes(query) ||
      (msg.phone || '').toLowerCase().includes(query) ||
      (msg.message || '').toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = async (id, newStatus) => {
    setMessages(prev => prev.map(m => (m.id === id || m._id === id) ? { ...m, status: newStatus } : m));
    if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
      setSelectedMessage(prev => prev ? { ...prev, status: newStatus } : null);
    }
    showToast(`Status updated to ${newStatus}`);
    await api.updateContactStatus(id, newStatus);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this inquiry record permanently? It will be completely removed.')) {
      setMessages(prev => prev.filter(m => m.id !== id && m._id !== id));
      if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
        setSelectedMessage(null);
      }
      showToast('Inquiry record deleted permanently');
      await api.deleteContact(id);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText || !selectedMessage) return;

    const recipient = selectedMessage.email;
    const subject = encodeURIComponent(`Re: ${selectedMessage.subject || 'SS Infotech Inquiry'}`);
    const body = encodeURIComponent(replyText);

    // Open mailto composer
    window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');

    showToast(`Response email composer opened for ${selectedMessage.email}`);
    await handleStatusChange(selectedMessage.id || selectedMessage._id, 'REPLIED');
    setReplyText('');
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Client Inquiries &amp; Leads" />

      <main className="p-4 sm:p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto relative">
        {notification && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-extrabold flex items-center gap-3 font-jakarta shadow-xl">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{notification.msg}</span>
          </div>
        )}
        
        {/* Top Header Control Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-white flex items-center gap-2 font-outfit">
              <span>Contact Leads &amp; Applications</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {messages.length} Total Messages
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Review live job applications, project inquiries, and client contact submissions from MongoDB.</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-jakarta"
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 font-jakarta flex-wrap overflow-x-auto pb-1">
          {['All', 'Service Inquiries', 'Job Applications', 'NEW', 'REPLIED', 'ARCHIVED'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {filter === 'NEW' ? '🆕 New Leads' : filter === 'REPLIED' ? '✅ Replied' : filter === 'ARCHIVED' ? '📁 Archived' : filter}
            </button>
          ))}
        </div>

        {/* Split Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Message List (Left Side) */}
          <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
            {loading ? (
              <div className="p-12 text-center text-slate-400 font-jakarta text-xs flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 rounded-3xl">
                <Loader2 size={16} className="animate-spin text-purple-500" />
                <span>Fetching live lead submissions...</span>
              </div>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id || msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer font-jakarta space-y-2.5 ${
                    (selectedMessage?.id === msg.id || selectedMessage?._id === msg._id)
                      ? 'bg-purple-950/70 border-purple-500 shadow-xl ring-1 ring-purple-500/50'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white truncate max-w-[150px]">{msg.name}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        msg.category === 'JOB_APPLICATION' || msg.service?.toLowerCase().includes('job')
                          ? 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {msg.category === 'JOB_APPLICATION' || msg.service?.toLowerCase().includes('job') ? '💼 Job App' : '🛠️ Inquiry'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                        msg.status === 'NEW' || msg.status === 'New' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        msg.status === 'REPLIED' || msg.status === 'Replied' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-extrabold text-purple-300 truncate">{msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-outfit">{msg.message}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
                    <span className="truncate max-w-[160px]">{msg.service}</span>
                    <span className="shrink-0">{msg.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 font-jakarta">
                No matching leads or inquiries found.
              </div>
            )}
          </div>

          {/* Message Detail & Reply Box (Right Side) */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                
                {/* Header & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-purple-400">{selectedMessage.id || selectedMessage._id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        selectedMessage.category === 'JOB_APPLICATION' || selectedMessage.service?.toLowerCase().includes('job')
                          ? 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {selectedMessage.category === 'JOB_APPLICATION' || selectedMessage.service?.toLowerCase().includes('job') ? 'Job Application' : 'Service Inquiry'}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white font-outfit">{selectedMessage.subject}</h3>
                  </div>

                  <div className="flex items-center gap-2 font-jakarta">
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id || selectedMessage._id, selectedMessage.status === 'ARCHIVED' ? 'NEW' : 'ARCHIVED')}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Archive size={14} />
                      <span>{selectedMessage.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                      className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Permanently Delete Inquiry"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Sender Contact Card */}
                <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-jakarta">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail size={14} className="text-purple-400 shrink-0" />
                    <span className="font-bold truncate">{selectedMessage.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone size={14} className="text-purple-400 shrink-0" />
                    <span className="font-bold">{selectedMessage.phone || '+91 98765 43210'}</span>
                  </div>
                </div>

                {/* Full Message Details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 font-jakarta tracking-wider">Inquiry / Candidate Submission</span>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-outfit whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Quick Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-3 font-jakarta pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Send Direct Response Email</span>
                  <textarea
                    rows={4}
                    placeholder="Type official response email to candidate/client..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer transition-all"
                    >
                      <Reply size={14} />
                      <span>Send Reply via Email</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="p-16 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 text-slate-500">
                <MessageSquare size={40} className="mx-auto text-slate-700" />
                <p className="text-sm font-bold text-slate-400 font-jakarta">Select a lead inquiry or job application to view full details and send direct reply.</p>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
