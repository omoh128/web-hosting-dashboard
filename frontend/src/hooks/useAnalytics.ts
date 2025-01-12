// src/hooks/useAnalytics.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface AnalyticsData {
  bandwidth: {
    date: string;
    usage: number;
    limit: number;
  }[];
  storage: {
    type: string;
    used: number;
    total: number;
  }[];
  visitors: {
    date: string;
    visitors: number;
    uniqueVisitors: number;
  }[];
}

export const useAnalytics = (timeframe: '7d' | '30d' | '90d' = '30d') => {
  const fetchAnalytics = async (): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics?timeframe=${timeframe}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['analytics', timeframe],
    queryFn: fetchAnalytics,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

