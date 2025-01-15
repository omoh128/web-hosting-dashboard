// src/services/domain.service.ts
import { api } from './api';

export const getDomains = async () => {
  try {
    const response = await api.get('/domains');
    return response.data; // Return the list of domains
  } catch (error) {
    throw new Error('Error fetching domains');
  }
};

export const createDomain = async (domainData: { name: string; type: string }) => {
  try {
    const response = await api.post('/domains', domainData);
    return response.data; // Return created domain data
  } catch (error) {
    throw new Error('Error creating domain');
  }
};

export const updateDomain = async (domainId: string, domainData: { name: string; type: string }) => {
  try {
    const response = await api.put(`/domains/${domainId}`, domainData);
    return response.data; // Return updated domain data
  } catch (error) {
    throw new Error('Error updating domain');
  }
};

export const deleteDomain = async (domainId: string) => {
  try {
    const response = await api.delete(`/domains/${domainId}`);
    return response.data; // Return confirmation of deletion
  } catch (error) {
    throw new Error('Error deleting domain');
  }
};
