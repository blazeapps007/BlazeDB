import { useQuery } from '@tanstack/react-query';
import mockData from '@/data/mockStatistics.json';

// Types for all statistics data
export interface TPSData {
  date: string;
  tps: number;
  transactions: number;
}

export interface TransactionVolumeData {
  date: string;
  volume: number;
  operations: number;
}

export interface ActiveAccountsData {
  date: string;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface NewAccountsData {
  date: string;
  count: number;
}

export interface OperationsData {
  date: string;
  vote: number;
  post: number;
  comment: number;
  transfer: number;
  powerUp: number;
  other: number;
}

export interface PriceData {
  date: string;
  steem: number;
  sbd: number;
}

export interface MarketCapData {
  steem: {
    marketCap: number;
    supply: number;
    percentage: number;
  };
  sbd: {
    marketCap: number;
    supply: number;
    percentage: number;
  };
}

export interface VestingLiquidData {
  date: string;
  vesting: number;
  liquid: number;
}

export interface InflationData {
  date: string;
  rate: number;
}

export interface TopHoldersData {
  account: string;
  balance: number;
  percentage: number;
}

export interface RewardPoolData {
  date: string;
  size: number;
}

export interface AuthorCuratorData {
  date: string;
  author: number;
  curator: number;
}

export interface TopAccountsData {
  account: string;
  rewards: number;
  posts: number;
}

export interface WitnessVotesData {
  date: string;
  totalVotes: number;
}

export interface TopWitnessData {
  witness: string;
  votes: number;
  percentage: number;
}

export interface ProposalFundingData {
  date: string;
  funded: number;
  pending: number;
  total: number;
}

export interface RCUsageData {
  date: string;
  used: number;
  available: number;
}

export interface BlockProductionData {
  witness: string;
  produced: number;
  missed: number;
  efficiency: number;
}

export interface BlockTimeData {
  date: string;
  blockTime: number;
  latency: number;
}

export interface EngagementData {
  date: string;
  posts: number;
  comments: number;
  votes: number;
}

export interface TrendingTagsData {
  tag: string;
  count: number;
  percentage: number;
}

export interface PayoutDistributionData {
  range: string;
  count: number;
  percentage: number;
}

export interface StatisticsData {
  networkActivity: {
    tpsData: TPSData[];
    dailyTransactionVolume: TransactionVolumeData[];
    activeAccounts: ActiveAccountsData[];
    newAccounts: NewAccountsData[];
    operationsByType: OperationsData[];
  };
  tokenEconomics: {
    priceHistory: PriceData[];
    marketCapData: MarketCapData;
    vestingLiquidRatio: VestingLiquidData[];
    inflationRate: InflationData[];
    topHolders: TopHoldersData[];
  };
  rewardPool: {
    poolSizeHistory: RewardPoolData[];
    authorCuratorSplit: AuthorCuratorData[];
    topCurators: TopAccountsData[];
    topAuthors: TopAccountsData[];
  };
  governance: {
    witnessVotes: WitnessVotesData[];
    topWitnessVotes: TopWitnessData[];
    proposalFunding: ProposalFundingData[];
  };
  performance: {
    rcUsage: RCUsageData[];
    blockProduction: BlockProductionData[];
    blockTimeStability: BlockTimeData[];
  };
  engagement: {
    postsCommentsVotes: EngagementData[];
    trendingTags: TrendingTagsData[];
    payoutDistribution: PayoutDistributionData[];
  };
}

// Simulate API call with delay
const fetchStatisticsData = async (): Promise<StatisticsData> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockData as StatisticsData;
};

export const useStatisticsData = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatisticsData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
};