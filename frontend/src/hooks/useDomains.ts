import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface Domain {
  id: number;
  name: string;
  status: string;
  expirationDate: string;
}

export const useDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/domains'); // Replace with your API endpoint
      setDomains(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch domains');
    } finally {
      setLoading(false);
    }
  };

  const addDomain = async (domainName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/domains', { name: domainName }); // Replace with your API endpoint
      setDomains((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add domain');
    } finally {
      setLoading(false);
    }
  };

  const deleteDomain = async (domainId: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/domains/${domainId}`); // Replace with your API endpoint
      setDomains((prev) => prev.filter((domain) => domain.id !== domainId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete domain');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains(); // Automatically fetch domains on mount
  }, []);

  return { domains, loading, error, addDomain, deleteDomain };
};
