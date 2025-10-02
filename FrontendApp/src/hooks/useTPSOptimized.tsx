
import { useQuery } from '@tanstack/react-query';
import config from '@/config.json';

interface TPSData {
  tps_1h: number;
  tps_1d: number;
  tps_1w: number;
  tps_1m: number;
  tps_1y: number;
  tps_all_time: number;
}

export const useTPSOptimized = () => {
  const { data: tpsData, isLoading, error } = useQuery({
    queryKey: ['tps'],
    queryFn: async () => {
      const response = await fetch(`${config.blazer_api}/blocks_api/getTPS`);
      if (!response.ok) {
        throw new Error('Failed to fetch TPS data');
      }
      return response.json() as Promise<TPSData>;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (TPS changes slowly)
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false, // Disable automatic refetch
    retry: 2,
  });

  return { tpsData, isLoading, error: error?.message || null };
};
