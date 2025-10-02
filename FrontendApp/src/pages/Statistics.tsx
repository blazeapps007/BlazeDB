import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useStatisticsData } from '@/hooks/useStatisticsData';

// Chart Components
import { TPSChart } from '@/components/Statistics/TPSChart';
import { TransactionVolumeChart } from '@/components/Statistics/TransactionVolumeChart';
import { ActiveAccountsChart } from '@/components/Statistics/ActiveAccountsChart';
import { NewAccountsChart } from '@/components/Statistics/NewAccountsChart';
import { OperationsChart } from '@/components/Statistics/OperationsChart';
import { TokenPriceChart } from '@/components/Statistics/TokenPriceChart';
import { MarketCapChart } from '@/components/Statistics/MarketCapChart';
import { TopHoldersChart } from '@/components/Statistics/TopHoldersChart';
import { WitnessChart } from '@/components/Statistics/WitnessChart';
import { EngagementChart } from '@/components/Statistics/EngagementChart';
import { TrendingTagsChart } from '@/components/Statistics/TrendingTagsChart';
import { PayoutDistributionChart } from '@/components/Statistics/PayoutDistributionChart';

const Statistics = () => {
  const { data: statistics, isLoading, error } = useStatisticsData();

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Card className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Statistics</h2>
            <p className="text-muted-foreground">
              Failed to load blockchain statistics. Please try again later.
            </p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="grid gap-6">
      <Skeleton className="h-80 w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Blockchain Statistics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analytics and insights into STEEM blockchain performance, token economics, governance, and user engagement.
          </p>
        </div>

        {/* Statistics Dashboard */}
        <Tabs defaultValue="network" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          {/* Network Activity */}
          <TabsContent value="network" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Network Activity</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TPSChart data={statistics?.networkActivity.tpsData || []} />
                    <TransactionVolumeChart data={statistics?.networkActivity.dailyTransactionVolume || []} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActiveAccountsChart data={statistics?.networkActivity.activeAccounts || []} />
                    <NewAccountsChart data={statistics?.networkActivity.newAccounts || []} />
                  </div>
                  <OperationsChart data={statistics?.networkActivity.operationsByType || []} />
                </>
              )}
            </div>
          </TabsContent>

          {/* Token Economics */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Token Economics</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TokenPriceChart data={statistics?.tokenEconomics.priceHistory || []} />
                    <MarketCapChart data={statistics?.tokenEconomics.marketCapData || { steem: { marketCap: 0, supply: 0, percentage: 0 }, sbd: { marketCap: 0, supply: 0, percentage: 0 } }} />
                  </div>
                  <TopHoldersChart data={statistics?.tokenEconomics.topHolders || []} />
                </>
              )}
            </div>
          </TabsContent>

          {/* Rewards & Curation */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Reward Pool & Curation</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Reward pool analytics coming soon...</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Governance & Witnesses */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Governance & Witnesses</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <WitnessChart 
                  topWitnessData={statistics?.governance.topWitnessVotes || []}
                  blockProductionData={statistics?.performance.blockProduction || []}
                />
              )}
            </div>
          </TabsContent>

          {/* Performance Metrics */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Resource & Performance Metrics</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Performance metrics coming soon...</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Engagement & Social */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Engagement & Social Metrics</h2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <EngagementChart data={statistics?.engagement.postsCommentsVotes || []} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TrendingTagsChart data={statistics?.engagement.trendingTags || []} />
                    <PayoutDistributionChart data={statistics?.engagement.payoutDistribution || []} />
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Statistics;