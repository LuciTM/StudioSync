import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getResources = () => api.get('/resources').then((res) => res.data);
export const createBooking = (payload) => api.post('/bookings', payload).then((res) => res.data);

export default api;