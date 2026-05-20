import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.158:3000', // ✅ IP correto do Wi-Fi
  timeout: 5000,
});

export default api;