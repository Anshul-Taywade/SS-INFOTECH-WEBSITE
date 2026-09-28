import axios from 'axios';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

const API_BASE_URL = (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost'))
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.PROD ? '/api/v1' : (import.meta.env.VITE_API_URL || '/api/v1'));

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const broadcastUpdate = (key) => {
  try {
    window.dispatchEvent(new Event(`ss_${key}_updated`));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {}
};

const initialMockInquiries = [
  {
    id: 'MSG-1001',
    _id: 'MSG-1001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@enterprise-tech.com',
    phone: '+91 98765 43210',
    subject: 'Enterprise Cloud Architecture & SaaS Development',
    service: 'Enterprise SaaS Platforms',
    date: '2026-08-17 14:30',
    status: 'NEW',
    message: 'Hello SS Infotech Team, We are looking to build a high-concurrency cloud platform with 99.99% SLA. Please send us your corporate proposal and set up an initial discovery call.'
  },
  {
    id: 'MSG-1002',
    _id: 'MSG-1002',
    name: 'Priya Deshmukh',
    email: 'p.deshmukh@financesolutions.in',
    phone: '+91 91234 56789',
    subject: 'AI & Data Analytics Consulting',
    service: 'AI & Machine Learning Systems',
    date: '2026-08-16 11:15',
    status: 'REPLIED',
    message: 'We saw your Power BI and data analytics training and system capabilities. We need a custom analytics engine for financial transaction auditing.'
  },
  {
    id: 'MSG-1003',
    _id: 'MSG-1003',
    name: 'Amit Patel',
    email: 'amit.patel@globalbiz.com',
    phone: '+91 99887 76655',
    subject: 'Corporate Developer Upskilling Workshop',
    service: 'Corporate Tech Workshops',
    date: '2026-08-15 16:45',
    status: 'ARCHIVED',
    message: 'Requesting a 3-week hands-on Full-Stack Web Architecture workshop for our junior software engineering team of 25 developers.'
  }
];

const defaultActivityLogs = [
  {
    id: 'act-1',
    _id: 'act-1',
    title: '15 Gallery Photos Updated by Admin',
    description: 'Corporate media and photo gallery synchronized with website.',
    category: 'gallery',
    link: '/gallery',
    adminName: 'Admin User',
    createdAt: new Date().toISOString()
  },
  {
    id: 'act-2',
    _id: 'act-2',
    title: 'ISO 9001:2015 Compliance Settings Saved',
    description: 'Corporate certification standard active in site settings.',
    category: 'settings',
    link: '/settings',
    adminName: 'Admin User',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'act-3',
    _id: 'act-3',
    title: 'New Client Inquiry Received',
    description: 'Enterprise Cloud Architecture inquiry submitted by Rajesh Sharma.',
    category: 'inquiry',
    link: '/messages',
    adminName: 'Admin User',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const api = {
  login: async (credentials) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },

  getDashboardStats: async () => {
    try {
      const res = await apiClient.get('/dashboard/stats');
      return res.data;
    } catch (e) {
      return { success: true, data: { metrics: {} } };
    }
  },

  // Activity Logs
  getActivityLogs: async () => {
    try {
      const res = await apiClient.get('/activity-logs');
      if (res.data && res.data.data && res.data.data.length > 0) {
        localStorage.setItem('ss_activities', JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (e) {}
    const saved = localStorage.getItem('ss_activities');
    return { data: saved ? JSON.parse(saved) : defaultActivityLogs };
  },
  logActivity: async (logData) => {
    let result;
    const newLog = {
      _id: `act-${Date.now()}`,
      id: `act-${Date.now()}`,
      adminName: 'Admin User',
      createdAt: new Date().toISOString(),
      ...logData
    };
    try {
      const res = await apiClient.post('/activity-logs', newLog);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_activities') || JSON.stringify(defaultActivityLogs));
    const updated = [newLog, ...saved];
    localStorage.setItem('ss_activities', JSON.stringify(updated));
    broadcastUpdate('activities');
    return result || { success: true, data: newLog };
  },

  // Contacts / Inquiries & Applications
  getProjectInquiries: async () => {
    try {
      const res = await apiClient.get('/project-inquiries');
      return res.data;
    } catch (e) {
      return { data: [] };
    }
  },

  getJobApplications: async () => {
    try {
      const res = await apiClient.get('/job-applications');
      return res.data;
    } catch (e) {
      return { data: [] };
    }
  },

  getNewsletterSubscribers: async () => {
    try {
      const res = await apiClient.get('/newsletter');
      return res.data;
    } catch (e) {
      return { data: [] };
    }
  },

  getContacts: async () => {
    try {
      const [contactsRes, projRes, jobRes] = await Promise.allSettled([
        apiClient.get('/contacts'),
        apiClient.get('/project-inquiries'),
        apiClient.get('/job-applications')
      ]);

      let combined = [];

      if (projRes.status === 'fulfilled' && projRes.value?.data?.data) {
        const mappedProj = projRes.value.data.data.map(p => ({
          _id: p._id,
          id: p._id,
          name: p.clientName,
          email: p.clientEmail,
          subject: `Project Inquiry: ${p.serviceRequested}`,
          service: p.serviceRequested,
          category: 'SERVICE_INQUIRY',
          message: p.projectDetails,
          status: (p.status || 'NEW').toUpperCase(),
          date: p.createdAt ? new Date(p.createdAt).toLocaleString() : 'Recent'
        }));
        combined = [...combined, ...mappedProj];
      }

      if (jobRes.status === 'fulfilled' && jobRes.value?.data?.data) {
        const mappedJobs = jobRes.value.data.data.map(j => ({
          _id: j._id,
          id: j._id,
          name: j.candidateName,
          email: j.candidateEmail,
          subject: `Job Application: ${j.jobTitle}`,
          service: j.jobTitle,
          category: 'JOB_APPLICATION',
          message: `Portfolio Link: ${j.portfolioLink}\nCover Note: ${j.coverNote}`,
          status: (j.status || 'NEW').toUpperCase(),
          date: j.createdAt ? new Date(j.createdAt).toLocaleString() : 'Recent'
        }));
        combined = [...combined, ...mappedJobs];
      }

      if (contactsRes.status === 'fulfilled' && contactsRes.value?.data?.data) {
        const mappedContacts = contactsRes.value.data.data.map(c => ({
          ...c,
          id: c._id || c.id,
          status: (c.status || 'NEW').toUpperCase()
        }));
        combined = [...combined, ...mappedContacts];
      }

      if (combined.length > 0) {
        localStorage.setItem('ss_contacts', JSON.stringify(combined));
        localStorage.setItem('ss_contacts_init', 'true');
        return { data: combined };
      }
    } catch (err) {}

    const init = localStorage.getItem('ss_contacts_init');
    if (!init) {
      localStorage.setItem('ss_contacts', JSON.stringify(initialMockInquiries));
      localStorage.setItem('ss_contacts_init', 'true');
      return { data: initialMockInquiries };
    }
    const saved = localStorage.getItem('ss_contacts');
    return { data: saved ? JSON.parse(saved) : [] };
  },
  updateContactStatus: async (id, status) => {
    try {
      const res = await apiClient.patch(`/contacts/${id}/status`, { status });
      return res.data;
    } catch (e) {
      const saved = JSON.parse(localStorage.getItem('ss_contacts') || '[]');
      const updated = saved.map(item => (item._id === id || item.id === id) ? { ...item, status } : item);
      localStorage.setItem('ss_contacts', JSON.stringify(updated));
      broadcastUpdate('contacts');
      return { success: true };
    }
  },
  deleteContact: async (id) => {
    try {
      await apiClient.delete(`/contacts/${id}`);
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_contacts') || '[]');
    const updated = saved.filter(item => item._id !== id && item.id !== id);
    localStorage.setItem('ss_contacts', JSON.stringify(updated));
    localStorage.setItem('ss_contacts_init', 'true');
    broadcastUpdate('contacts');
    api.logActivity({
      title: 'Client Inquiry Deleted by Admin',
      description: `Inquiry record #${id} permanently removed.`,
      category: 'inquiry',
      link: '/messages'
    });
    return { success: true };
  },

  // Services
  getServices: async () => {
    try {
      const res = await apiClient.get('/services');
      if (res.data && res.data.data && res.data.data.length > 0) {
        localStorage.setItem('ss_services', JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (err) {}
    const saved = localStorage.getItem('ss_services');
    return { data: saved ? JSON.parse(saved) : null };
  },
  createService: async (data) => {
    let result;
    try {
      const res = await apiClient.post('/services', data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_services') || '[]');
    const newSrv = { _id: `srv-${Date.now()}`, id: `srv-${Date.now()}`, ...data, isActive: true };
    const updated = [newSrv, ...saved];
    localStorage.setItem('ss_services', JSON.stringify(updated));
    broadcastUpdate('services');
    api.logActivity({
      title: `IT Service "${data.title}" Created`,
      description: `New service offering added under ${data.category}.`,
      category: 'service',
      link: '/services'
    });
    return result || { success: true, data: newSrv };
  },
  updateService: async (id, data) => {
    let result;
    try {
      const res = await apiClient.put(`/services/${id}`, data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_services') || '[]');
    const updated = saved.map(s => (s._id === id || s.id === id) ? { ...s, ...data } : s);
    localStorage.setItem('ss_services', JSON.stringify(updated));
    broadcastUpdate('services');
    api.logActivity({
      title: `IT Service Updated by Admin`,
      description: `Service specifications modified.`,
      category: 'service',
      link: '/services'
    });
    return result || { success: true };
  },
  deleteService: async (id) => {
    try {
      await apiClient.delete(`/services/${id}`);
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_services') || '[]');
    const updated = saved.filter(s => s._id !== id && s.id !== id);
    localStorage.setItem('ss_services', JSON.stringify(updated));
    broadcastUpdate('services');
    api.logActivity({
      title: `IT Service Removed by Admin`,
      description: `Service offering deleted from catalog.`,
      category: 'service',
      link: '/services'
    });
    return { success: true };
  },

  // Gallery
  getGallery: async () => {
    try {
      const res = await apiClient.get('/gallery');
      if (res.data && Array.isArray(res.data.data)) {
        localStorage.setItem('ss_gallery_items', JSON.stringify(res.data.data));
        localStorage.setItem('ss_gallery_synced', 'true');
        return res.data;
      }
    } catch (e) {}
    const saved = localStorage.getItem('ss_gallery_items');
    const synced = localStorage.getItem('ss_gallery_synced');
    if (saved) {
      return { data: JSON.parse(saved) };
    }
    if (synced === 'true') {
      return { data: [] };
    }
    return { data: REAL_COMPANY_GALLERY_ITEMS };
  },
  createGalleryItem: async (data) => {
    let result;
    try {
      const res = await apiClient.post('/gallery', data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_gallery_items') || JSON.stringify(REAL_COMPANY_GALLERY_ITEMS));
    const newItem = { _id: `real-${Date.now()}`, id: `real-${Date.now()}`, ...data, isReal: true };
    const updated = [newItem, ...saved];
    localStorage.setItem('ss_gallery_items', JSON.stringify(updated));
    broadcastUpdate('gallery');
    api.logActivity({
      title: `New Photo "${data.title}" Added to Gallery`,
      description: `Corporate photo uploaded under ${data.category}.`,
      category: 'gallery',
      link: '/gallery'
    });
    return result || { success: true, data: newItem };
  },
  updateGalleryItem: async (id, data) => {
    let result;
    try {
      const res = await apiClient.put(`/gallery/${id}`, data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_gallery_items') || JSON.stringify(REAL_COMPANY_GALLERY_ITEMS));
    const updated = saved.map(item => (item._id === id || item.id === id) ? { ...item, ...data } : item);
    localStorage.setItem('ss_gallery_items', JSON.stringify(updated));
    broadcastUpdate('gallery');
    api.logActivity({
      title: `Gallery Photo Metadata Updated`,
      description: `Updated title/caption for photo.`,
      category: 'gallery',
      link: '/gallery'
    });
    return result || { success: true };
  },
  deleteGalleryItem: async (id) => {
    try {
      await apiClient.delete(`/gallery/${id}`);
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_gallery_items') || JSON.stringify(REAL_COMPANY_GALLERY_ITEMS));
    const updated = saved.filter(item => item._id !== id && item.id !== id && item.customId !== id);
    localStorage.setItem('ss_gallery_items', JSON.stringify(updated));
    localStorage.setItem('ss_gallery_synced', 'true');
    broadcastUpdate('gallery');
    api.logActivity({
      title: `Gallery Photo Removed by Admin`,
      description: `Photo permanently deleted from website gallery.`,
      category: 'gallery',
      link: '/gallery'
    });
    return { success: true };
  },

  // Team
  getTeam: async () => {
    try {
      const res = await apiClient.get('/team');
      if (res.data && res.data.data && res.data.data.length > 0) {
        localStorage.setItem('ss_team', JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (e) {}
    const saved = localStorage.getItem('ss_team');
    return { data: saved ? JSON.parse(saved) : null };
  },
  createTeamMember: async (data) => {
    let result;
    try {
      const res = await apiClient.post('/team', data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_team') || '[]');
    const newMember = { _id: `team-${Date.now()}`, id: `team-${Date.now()}`, ...data };
    const updated = [...saved, newMember];
    localStorage.setItem('ss_team', JSON.stringify(updated));
    broadcastUpdate('team');
    api.logActivity({
      title: `Team Member Profile Created`,
      description: `${data.name} added as ${data.role}.`,
      category: 'team',
      link: '/team'
    });
    return result || { success: true, data: newMember };
  },
  updateTeamMember: async (id, data) => {
    let result;
    try {
      const res = await apiClient.put(`/team/${id}`, data);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_team') || '[]');
    const updated = saved.map(m => (m._id === id || m.id === id) ? { ...m, ...data } : m);
    localStorage.setItem('ss_team', JSON.stringify(updated));
    broadcastUpdate('team');
    api.logActivity({
      title: `Team Profile Updated by Admin`,
      description: `Updated profile details for ${data.name || 'team member'}.`,
      category: 'team',
      link: '/team'
    });
    return result || { success: true };
  },
  deleteTeamMember: async (id) => {
    try {
      await apiClient.delete(`/team/${id}`);
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_team') || '[]');
    const updated = saved.filter(m => m._id !== id && m.id !== id);
    localStorage.setItem('ss_team', JSON.stringify(updated));
    broadcastUpdate('team');
    api.logActivity({
      title: `Team Profile Removed by Admin`,
      description: `Member profile permanently removed.`,
      category: 'team',
      link: '/team'
    });
    return { success: true };
  },

  // Settings
  getSettings: async () => {
    try {
      const res = await apiClient.get('/settings');
      if (res.data && res.data.data) {
        localStorage.setItem('ss_settings', JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (e) {}
    const saved = localStorage.getItem('ss_settings');
    return {
      data: saved ? JSON.parse(saved) : {
        companyName: 'SS INFOTECH',
        certification: 'ISO 9001:2015 Certified Firm',
        email: 'info@ssinfotech.org',
        phone: '+91 77700 23791',
        address: '#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.',
        location: 'Software R&D Hub & Training Center',
        galleryRealMode: true,
        autoSyncMedia: true,
      }
    };
  },
  updateSettings: async (data) => {
    let result;
    try {
      const res = await apiClient.put('/settings', data);
      result = res.data;
    } catch (e) {}
    localStorage.setItem('ss_settings', JSON.stringify(data));
    broadcastUpdate('settings');
    api.logActivity({
      title: 'ISO & Site Settings Saved',
      description: 'Updated company contact and ISO compliance standards.',
      category: 'settings',
      link: '/settings'
    });
    return result || { success: true, data };
  },
};

export default apiClient;
