
import axios from 'axios';

const BASE = 'https://betterfronted.vercel.app' || 'http://localhost:5000/api';

export const createComment = (data) => axios.post(`${BASE}/comments`, data).then(r => r.data);
export const getCommentsForTask = (taskId, page=1, limit=10) => axios.get(`${BASE}/comments/task/${taskId}?page=${page}&limit=${limit}`).then(r => r.data);
export const updateComment = (id, data) => axios.put(`${BASE}/comments/${id}`, data).then(r => r.data);
export const deleteComment = (id) => axios.delete(`${BASE}/comments/${id}`).then(r => r.data);
export const searchComments = (q, taskId) => axios.get(`${BASE}/comments/search?q=${encodeURIComponent(q)}${taskId?`&taskId=${taskId}`:''}`).then(r=>r.data);