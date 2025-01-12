import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/auth/me'); // Replace with your API endpoint
      setUser(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', credentials); // Replace with your API endpoint
      setUser(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post('/auth/logout'); // Replace with your API endpoint
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Automatically fetch user data on mount
  }, []);

  return { user, loading, error, login, logout };
};
