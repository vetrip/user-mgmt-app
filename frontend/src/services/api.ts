import axios, { AxiosInstance } from 'axios';
import { UserDTO } from '../types/user';

const API_URL = '/api';

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
    config => {
        console.log('Making request to:', config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    response => {
        console.log('Received response from:', response.config.url);
        return response;
    },
    error => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export const getAllUsers = (): Promise<UserDTO[]> => {
    console.log('Fetching all users');
    return api.get('/users').then(response => response.data);
};

export const getUserById = (id: number): Promise<UserDTO> => {
    console.log('Fetching user with id:', id);
    return api.get(`/users/${id}`).then(response => response.data);
};

export const createUser = (userData: Partial<UserDTO>): Promise<UserDTO> => {
    console.log('Creating user:', userData);
    return api.post('/users', userData).then(response => response.data);
};

export const updateUser = (id: number, userData: Partial<UserDTO>): Promise<UserDTO> => {
    console.log('Updating user:', id, userData);
    return api.put(`/users/${id}`, userData).then(response => response.data);
};

export const deleteUser = (id: number): Promise<void> => {
    console.log('Deleting user:', id);
    return api.delete(`/users/${id}`);
};

export const updateUserStatus = (id: number, status: string): Promise<UserDTO> => {
    console.log('Updating user status:', id, status);
    return api.put(`/users/${id}/status?status=${status}`).then(response => response.data);
};

export const updateUserRole = (id: number, role: string): Promise<UserDTO> => {
    console.log('Updating user role:', id, role);
    return api.put(`/users/${id}/role?role=${role}`).then(response => response.data);
}; 