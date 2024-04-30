import axios from 'axios';
import { apiTmMusicUrl } from '../constants';

const apiNoAuthInstance = axios.create({
  baseURL: apiTmMusicUrl,
});

apiNoAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default apiNoAuthInstance;
