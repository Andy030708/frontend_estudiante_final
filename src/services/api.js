import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const estudianteService = {
  // Listar todos los estudiantes
  getAll: async (carrera = '') => {
    const params = carrera ? { carrera } : {};
    const response = await api.get('/estudiantes/', { params });
    return response.data;
  },

  // Obtener un estudiante por ID
  getById: async (id) => {
    const response = await api.get(`/estudiantes/${id}/`);
    return response.data;
  },

  // Crear nuevo estudiante
  create: async (estudiante) => {
    const response = await api.post('/estudiantes/', estudiante);
    return response.data;
  },

  // Actualizar estudiante
  update: async (id, estudiante) => {
    const response = await api.put(`/estudiantes/${id}/`, estudiante);
    return response.data;
  },

  // Eliminar estudiante
  delete: async (id) => {
    const response = await api.delete(`/estudiantes/${id}/`);
    return response.data;
  },

  // Obtener promedio general
  getPromedioGeneral: async () => {
    const response = await api.get('/estudiantes/promedio-general/');
    return response.data;
  },

  // Health check
  getHealth: async () => {
    const response = await api.get('/health/');
    return response.data;
  },

  // Métricas
  getMetricas: async () => {
    const response = await api.get('/metricas/');
    return response.data;
  },
};

export default api;