import axios from 'axios';

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

export const api = {
  submitContact: async (formData) => {
    const res = await apiClient.post('/contacts', formData);
    return res.data;
  },

  subscribeNewsletter: async (email) => {
    const res = await apiClient.post('/newsletter/subscribe', { email });
    return res.data;
  },

  getServices: async () => {
    const res = await apiClient.get('/services');
    return res.data;
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
