import api from './api';

export const suggestTask = (title) => api.post('/ai/suggest', { title });