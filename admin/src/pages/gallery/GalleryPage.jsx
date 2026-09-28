import { useState, useEffect, useCallback } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  Plus, Edit, Trash2, Eye, Sparkles, 
  Search, Calendar, MapPin, X, Loader2, Image as ImageIcon 
} from 'lucide-react';
import { api } from '@/services/api';

export default function GalleryManagerPage() {
  const { isDarkMode } = useAdminTheme();
  
  // Instant initial load from cache with 0ms delay
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_gallery_items');
      const synced = localStorage.getItem('ss_gallery_synced');
      if (saved) return JSON.parse(saved);
      if (synced === 'true') return [];
    } catch (e) {}
    return [];
  });

  const [loading, setLoading] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_gallery_items');
      return !saved;
    } catch (e) {
      return false;
    }
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Office Environment',
    location: 'SS Infotech Headquarters',
    date: '2026',
    caption: '',
    imgSrc: ''
  });

  const categories = ['All', 'Cultural & Celebrations', 'Company Events', 'Training & Workshops', 'Office Environment', 'Team Activities'];

  const loadGallery = useCallback(async () => {
    try {
      const res = await api.getGallery();
      if (res && Array.isArray(res.data)) {
        setItems(res.data);
      }
    } catch (e) {
      console.warn('Gallery fetch fallback active');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();

    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('ss_gallery_items');
        if (saved) setItems(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('ss_gallery_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ss_gallery_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadGallery]);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this gallery image? It will be removed permanently from both the Admin Panel and the public website.')) {
      const targetId = id;
      const remaining = items.filter(item => item.id !== targetId && item._id !== targetId && item.customId !== targetId);
      setItems(remaining);
      try {
        localStorage.setItem('ss_gallery_items', JSON.stringify(remaining));
        localStorage.setItem('ss_gallery_synced', 'true');
      } catch (e) {}
      await api.deleteGalleryItem(targetId);
    }
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imgSrc) return alert('Please fill in title and image URL/path!');
    
    const newItemData = {
      ...formData,
      aspect: 'aspect-video',
      isReal: true
    };
    
    const res = await api.createGalleryItem(newItemData);
    if (res && res.data) {
      setItems(prev => [res.data, ...prev]);
    } else {
      const fallbackItem = { ...newItemData, id: `real-${Date.now()}` };
      setItems(prev => [fallbackItem, ...prev]);
    }
    setIsAddModalOpen(false);
    setFormData({ title: '', category: 'Office Environment', location: 'SS Infotech Headquarters', date: '2026', caption: '', imgSrc: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    
    const editId = editingItem.id || editingItem._id || editingItem.customId;
    await api.updateGalleryItem(editId, editingItem);
    setItems(items.map(item => (item.id === editId || item._id === editId || item.customId === editId) ? editingItem : item));
    setEditingItem(null);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Gallery Media Manager" />

      <main className="p-4 sm:p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Control Panel */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-md transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <h1 className={`text-xl font-black flex items-center gap-2 font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span>Official SS Infotech Media</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 uppercase font-mono">
                {items.length} Live Images
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-jakarta">Manage corporate photos and captions. All edits and deletions sync instantly across the entire website.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Photo</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-jakarta">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-white text-slate-700 hover:text-purple-700 border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-purple-500 border ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            />
          </div>

        </div>

        {/* Media Grid */}
        {loading && items.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-jakarta text-xs flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-purple-500" />
            <span>Loading gallery photos...</span>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <AdminGalleryCard
                key={item.id || item._id || item.customId || idx}
                item={item}
                idx={idx}
                isDarkMode={isDarkMode}
                onPreview={() => setSelectedImage(item)}
                onEdit={() => setEditingItem(item)}
                onDelete={() => handleDelete(item.id || item._id || item.customId)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-3xl text-xs font-jakarta">
            No gallery photos found. Click "Add New Photo" to upload.
          </div>
        )}

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-2/3 bg-black flex items-center justify-center max-h-[500px]">
              <img src={selectedImage.imgSrc} alt={selectedImage.title} className="w-full h-full object-contain max-h-[500px]" />
            </div>

            <div className="w-full md:w-1/3 p-6 space-y-4 font-jakarta flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-950 text-purple-300 border border-purple-800 inline-block">
                  {selectedImage.category}
                </span>

                <h2 className="text-xl font-black text-white font-outfit leading-tight">{selectedImage.title}</h2>

                <p className="text-xs text-slate-300 leading-relaxed">{selectedImage.caption}</p>

                <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs text-slate-400">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-purple-400" />
                    <span>{selectedImage.location || 'SS Infotech HQ'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-400" />
                    <span>{selectedImage.date || '2026'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    handleDelete(selectedImage.id || selectedImage._id || selectedImage.customId);
                    setSelectedImage(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 border border-red-800/80 cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-black text-white">Add New Gallery Photo</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 font-jakarta text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Photo Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Boardroom Meeting"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Image Source Path / URL</label>
                <input
                  type="text"
                  required
                  placeholder="/images/gallery/ss-infotech-conference-boardroom.png"
                  value={formData.imgSrc}
                  onChange={(e) => setFormData({ ...formData, imgSrc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Caption / Description</label>
                <textarea
                  rows={2}
                  placeholder="Official caption describing the photo..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider">Year / Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-black text-white">Edit Photo Details</h2>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 font-jakarta text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Photo Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Category</label>
                <select
                  value={editingItem.category || 'Office Environment'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Image Path / URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.imgSrc || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, imgSrc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Caption / Description</label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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

    </div>
  );
}

function AdminGalleryCard({ item, idx, isDarkMode, onPreview, onEdit, onDelete }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`group rounded-3xl overflow-hidden border shadow-md flex flex-col transition-all hover:shadow-xl ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Image Preview Container with Shimmer placeholder */}
      <div className="relative w-full aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-slate-600/60" />
          </div>
        )}

        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-1 font-jakarta uppercase">
          <Sparkles size={11} className="text-amber-300" />
          <span>Real SS Infotech Photo</span>
        </span>

        <img 
          src={item.imgSrc} 
          alt={item.title} 
          loading={idx < 6 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            onClick={onPreview}
            className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            title="View Full Preview"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={onEdit}
            className="p-2.5 rounded-xl bg-amber-500/80 hover:bg-amber-500 text-white transition-colors cursor-pointer"
            title="Edit Metadata"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
            title="Delete Image Permanently"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Details & Caption */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 font-jakarta">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              {item.category}
            </span>
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
              <Calendar size={11} />
              {item.date || '2026'}
            </span>
          </div>

          <h3 className={`text-sm font-extrabold line-clamp-1 font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </h3>

          <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {item.caption}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-purple-500" />
            <span className="truncate max-w-[150px]">{item.location || 'SS Infotech'}</span>
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
