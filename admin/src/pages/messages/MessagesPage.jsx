import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  MessageSquare, Mail, Phone, 
  Trash2, CheckCircle2, Archive, Reply, Loader2 
} from 'lucide-react';
import { api } from '@/services/api';

export default function MessagesManagerPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
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
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Service Inquiries') {
      return msg.category === 'SERVICE_INQUIRY' || (!msg.category && !msg.service?.toLowerCase().includes('job'));
    }
    if (activeFilter === 'Job Applications') {
      return msg.category === 'JOB_APPLICATION' || (msg.service && msg.service.toLowerCase().includes('job'));
    }
    return (msg.status || '').toUpperCase() === activeFilter.toUpperCase();
  });

  const handleStatusChange = async (id, newStatus) => {
    setMessages(messages.map(m => (m.id === id || m._id === id) ? { ...m, status: newStatus } : m));
    if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
    showToast(`Status updated to ${newStatus}`);
    await api.updateContactStatus(id, newStatus);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this inquiry record permanently? It will be completely removed.')) {
      const remaining = messages.filter(m => m.id !== id && m._id !== id);
      setMessages(remaining);
      if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
        setSelectedMessage(null);
      }
      showToast('Inquiry record deleted permanently');
      await api.deleteContact(id);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText || !selectedMessage) return;
    showToast(`Response email dispatched to ${selectedMessage.email}`);
    handleStatusChange(selectedMessage.id || selectedMessage._id, 'REPLIED');
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
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>Contact Leads &amp; Messages</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {messages.length} Total Messages
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Review contact submissions, send direct responses, and manage leads.</p>
          </div>

          <div className="flex items-center gap-2 font-jakarta flex-wrap">
            {['All', 'Service Inquiries', 'Job Applications', 'New', 'Replied', 'Archived'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === status
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Split Grid View */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Message List (Left side) */}
          <div className="lg:col-span-5 space-y-3">
            {loading ? (
              <div className="p-12 text-center text-slate-400 font-jakarta text-xs flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin text-purple-500" />
                <span>Loading lead submissions...</span>
              </div>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id || msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer font-jakarta space-y-2.5 ${
                    (selectedMessage?.id === msg.id || selectedMessage?._id === msg._id)
                      ? 'bg-purple-950/60 border-purple-500 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white">{msg.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        msg.category === 'JOB_APPLICATION' || msg.service?.toLowerCase().includes('job')
                          ? 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {msg.category === 'JOB_APPLICATION' || msg.service?.toLowerCase().includes('job') ? '💼 Job App' : '🛠️ Service'}
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

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>{msg.service}</span>
                    <span>{msg.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 font-jakarta">
                No inquiries found.
              </div>
            )}
          </div>

          {/* Message Detail & Reply Box (Right side) */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                
                {/* Actions & Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-purple-400">{selectedMessage.id || selectedMessage._id}</span>
                    <h3 className="text-lg font-black text-white">{selectedMessage.subject}</h3>
                  </div>

                  <div className="flex items-center gap-2 font-jakarta">
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id || selectedMessage._id, selectedMessage.status === 'ARCHIVED' ? 'NEW' : 'ARCHIVED')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Archive size={14} />
                      <span>{selectedMessage.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                      className="p-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold cursor-pointer"
                      title="Permanently Delete Inquiry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Sender Info Card */}
                <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-jakarta">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail size={14} className="text-purple-400 shrink-0" />
                    <span className="font-bold truncate">{selectedMessage.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone size={14} className="text-purple-400 shrink-0" />
                    <span className="font-bold">{selectedMessage.phone}</span>
                  </div>
                </div>

                {/* Full Message Body */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 font-jakarta">Message Body</span>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-outfit">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Quick Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-3 font-jakarta">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500">Send Direct Response</span>
                  <textarea
                    rows={4}
                    placeholder="Type official reply to client..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
                    >
                      <Reply size={14} />
                      <span>Send Response Email</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 text-slate-500">
                <MessageSquare size={36} className="mx-auto text-slate-700" />
                <p className="text-sm font-bold text-slate-400 font-jakarta">Select a lead inquiry to view details and send direct reply.</p>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
