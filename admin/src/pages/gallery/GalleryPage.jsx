import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  Image as ImageIcon, Plus, Edit, Trash2, Eye, Sparkles, 
  Search, CheckCircle2, Calendar, MapPin, X, Upload 
} from 'lucide-react';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

export default function GalleryManagerPage() {
  const { isDarkMode } = useAdminTheme();
  
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_gallery_items');
      return saved ? JSON.parse(saved) : REAL_COMPANY_GALLERY_ITEMS;
    } catch (e) {
      return REAL_COMPANY_GALLERY_ITEMS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // New Image Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Office Environment',
    location: 'SS Infotech Headquarters',
    date: '2024',
    caption: '',
    imgSrc: ''
  });

  const categories = ['All', 'Cultural & Celebrations', 'Company Events', 'Training & Workshops', 'Office Environment', 'Team Activities'];

  const saveGalleryItems = (newItems) => {
    setItems(newItems);
    try {
      localStorage.setItem('ss_gallery_items', JSON.stringify(newItems));
      window.dispatchEvent(new Event('ss_gallery_updated'));
    } catch (e) {
      console.error('Error saving gallery items:', e);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this gallery image?')) {
      const updated = items.filter(item => item.id !== id);
      saveGalleryItems(updated);
    }
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imgSrc) return alert('Please fill in title and image URL/path!');
    
    const newItem = {
      id: `real-${Date.now()}`,
      ...formData,
      aspect: 'aspect-video',
      isReal: true
    };
    
    const updated = [newItem, ...items];
    saveGalleryItems(updated);
    setIsAddModalOpen(false);
    setFormData({ title: '', category: 'Office Environment', location: 'SS Infotech Headquarters', date: '2024', caption: '', imgSrc: '' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = items.map(item => item.id === editingItem.id ? editingItem : item);
    saveGalleryItems(updated);
    setEditingItem(null);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Gallery Media Manager" />

      <main className="p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Control Panel */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-md transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <h1 className={`text-xl font-black flex items-center gap-2 font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span>Official SS Infotech Media</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 uppercase font-mono">
                {items.length} Active Real Images
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-jakarta">Manage corporate photos, captions, categories and media paths.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Real Photo</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className={`group rounded-3xl overflow-hidden border shadow-md flex flex-col transition-all hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Image Preview Container */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-1 font-jakarta uppercase">
                  <Sparkles size={11} className="text-amber-300" />
                  <span>Real SS Infotech Photo</span>
                </span>

                <img 
                  src={item.imgSrc} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    title="View Full Preview"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2.5 rounded-xl bg-amber-500/80 hover:bg-amber-500 text-white transition-colors cursor-pointer"
                    title="Edit Metadata"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                    title="Delete Image"
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
                      {item.date || '2024'}
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
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
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
                    <span>{selectedImage.date || '2024'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    handleDelete(selectedImage.id);
                    setSelectedImage(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 border border-red-800/80"
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
              <h2 className="text-lg font-black text-white">Add New Real Photo</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
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
                  placeholder="Official caption describing the company event or team photo..."
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
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30"
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
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 font-jakarta text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Photo Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Category</label>
                <select
                  value={editingItem.category}
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
                  value={editingItem.imgSrc}
                  onChange={(e) => setEditingItem({ ...editingItem, imgSrc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider">Caption / Description</label>
                <textarea
                  rows={2}
                  value={editingItem.caption}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30"
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
