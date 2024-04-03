import axios from 'axios';
import { getToken } from '../utils/storage';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiInstance;
