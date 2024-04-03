import axios from 'axios';

const apiNoAuthInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

apiNoAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default apiNoAuthInstance;
