import axios from 'axios';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

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

export const api = {
  submitContact: async (formData) => {
    let result;
    try {
      const res = await apiClient.post('/contacts', formData);
      result = res.data;
    } catch (e) {}
    const saved = JSON.parse(localStorage.getItem('ss_contacts') || '[]');
    const newLead = {
      _id: `MSG-${Date.now()}`,
      id: `MSG-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 98765 43210',
      subject: formData.subject || formData.service || 'Website Lead Inquiry',
      service: formData.service || 'Software Consulting',
      date: new Date().toLocaleString(),
      status: 'NEW',
      message: formData.message,
    };
    const updated = [newLead, ...saved];
    localStorage.setItem('ss_contacts', JSON.stringify(updated));
    broadcastUpdate('contacts');
    return result || { success: true, message: 'Inquiry submitted successfully!' };
  },

  subscribeNewsletter: async (email) => {
    const res = await apiClient.post('/newsletter/subscribe', { email });
    return res.data;
  },

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

  getGallery: async () => {
    try {
      const res = await apiClient.get('/gallery');
      if (res.data && res.data.data && res.data.data.length > 0) {
        localStorage.setItem('ss_gallery_items', JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (e) {}
    const saved = localStorage.getItem('ss_gallery_items');
    return { data: saved ? JSON.parse(saved) : REAL_COMPANY_GALLERY_ITEMS };
  },

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

  getProjects: async (category) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await apiClient.get(`/projects${query}`);
    return res.data;
  },

  getTestimonials: async () => {
    const res = await apiClient.get('/testimonials');
    return res.data;
  },

  getPartners: async () => {
    const res = await apiClient.get('/partners');
    return res.data;
  },

  getCareers: async () => {
    const res = await apiClient.get('/careers');
    return res.data;
  },
};

export default apiClient;
