// src/services/auth.service.ts
import { api } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;

    // Store token and user data in localStorage or sessionStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error('Invalid credentials or server error');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const updateUser = async (userData: { name: string; email: string; password?: string }) => {
  try {
    const response = await api.put('/auth/update', userData);
    const updatedUser = response.data;

    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user');
  }
};
