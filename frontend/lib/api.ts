import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Não autorizado. Redirecionando...');
    }
    return Promise.reject(error);
  }
);
