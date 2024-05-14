import axios from 'axios';

const apiNoAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
});

apiNoAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default apiNoAuthInstance;
