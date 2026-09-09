import axios from 'axios';

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

export const api = {
  login: async (credentials) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },

  getDashboardStats: async () => {
    const res = await apiClient.get('/dashboard/stats');
    return res.data;
  },

  getContacts: async () => {
    const res = await apiClient.get('/contacts');
    return res.data;
  },
  updateContactStatus: async (id, status) => {
    const res = await apiClient.patch(`/contacts/${id}/status`, { status });
    return res.data;
  },
  deleteContact: async (id) => {
    const res = await apiClient.delete(`/contacts/${id}`);
    return res.data;
  },

  getServices: async () => {
    const res = await apiClient.get('/services');
    return res.data;
  },
  createService: async (data) => {
    const res = await apiClient.post('/services', data);
    return res.data;
  },
  updateService: async (id, data) => {
    const res = await apiClient.put(`/services/${id}`, data);
    return res.data;
  },
  deleteService: async (id) => {
    const res = await apiClient.delete(`/services/${id}`);
    return res.data;
  },

  getProjects: async (category) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await apiClient.get(`/projects${query}`);
    return res.data;
  },
  createProject: async (data) => {
    const res = await apiClient.post('/projects', data);
    return res.data;
  },
  updateProject: async (id, data) => {
    const res = await apiClient.put(`/projects/${id}`, data);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await apiClient.delete(`/projects/${id}`);
    return res.data;
  },
};

export default apiClient;
