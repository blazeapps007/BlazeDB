import { useQuery } from '@tanstack/react-query';

// Interface defining the structure for a decentralized application (dApp) object.
interface DApp {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  status: 'active' | 'beta' | 'development';
  features: string[];
  developer: string;
}

/**
 * Fetches the ecosystem data from the local public folder.
 * Vite makes files in the `public` directory available at the root path.
 * @returns A promise that resolves to an array of DApp objects.
 */
const fetchEcosystemData = async (): Promise<DApp[]> => {
  // Fetch the JSON file from the public directory.
  const response = await fetch('/Ecosystem.json');
  
  // Check if the request was successful.
  if (!response.ok) {
    throw new Error('Failed to fetch ecosystem data');
  }
  
  // Parse and return the JSON data.
  return response.json();
};

/**
 * Custom hook to fetch and cache the ecosystem data.
 * It uses @tanstack/react-query for efficient data management.
 */
export const useEcosystemData = () => {
  return useQuery({
    // Unique key for this query to manage caching.
    queryKey: ['ecosystem-data-local'],
    // The function that will be called to fetch the data.
    queryFn: fetchEcosystemData,
    // The data will be considered fresh for 5 minutes.
    staleTime: 5 * 60 * 1000, 
    // The data will be garbage collected after 10 minutes of being inactive.
    gcTime: 10 * 60 * 1000,
  });
};
