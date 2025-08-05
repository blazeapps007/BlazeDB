import { ArrowLeft, Vote, Calendar, Coins, User, Clock, LayoutGrid, List } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useDAOProposals } from '@/hooks/useDAOProposals';
import { convertVestsToSP, formatAmount } from '@/lib/formatter.js';
import { useState, useEffect } from 'react';

const DAOProposals = () => {
  const { data: proposals, isLoading, error } = useDAOProposals();
  const [convertedVotes, setConvertedVotes] = useState<Record<number, number>>({});
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    const convertVotesToSP = async () => {
      if (!proposals) return;
      
      const converted: Record<number, number> = {};
      for (const proposal of proposals) {
        try {
          // Convert VESTS to SP
          const vestsAmount = parseFloat(proposal.total_votes) / Math.pow(10, 6); // Convert from MVESTS
          const sp = await convertVestsToSP(vestsAmount);
          if (sp !== null) {
            converted[proposal.id] = sp;
          }
        } catch (error) {
          console.error(`Error converting votes for proposal ${proposal.id}:`, error);
        }
      }
      setConvertedVotes(converted);
    };

    convertVotesToSP();
  }, [proposals]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDailyPay = (dailyPay: { amount: string; precision: number; nai: string }) => {
    const amount = parseInt(dailyPay.amount) / Math.pow(10, dailyPay.precision);
    const currency = dailyPay.nai === '@@000000013' ? 'SBD' : 'STEEM';
    return `${amount.toFixed(3)} ${currency}`;
  };

  // Find the Return Proposal to determine the funding threshold
  const returnProposal = proposals?.find(p => p.subject === "Return Proposal");
  const returnProposalRank = returnProposal?.rank || 8;

  const isFundedProposal = (rank: number) => {
    return rank < returnProposalRank;
  };

  const isReturnProposal = (subject: string) => {
    return subject === "Return Proposal" || subject === "New Return Proposal";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="glass-card p-8">
            <div className="text-center">
              <div className="text-muted-foreground">Loading DAO proposals...</div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (error || !proposals) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="glass-card p-8">
            <div className="text-center">
              <div className="text-destructive">Error loading DAO proposals</div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explorer
            </Button>
          </Link>
        </div>

        {/* Page Header with View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">STEEM DAO Proposals</h1>
            <p className="text-muted-foreground">
              Community-driven proposals for funding development and initiatives on the STEEM blockchain
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'list' | 'grid')}>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{proposals.length}</div>
                <div className="text-sm text-muted-foreground">Total Proposals</div>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {proposals.filter(p => isFundedProposal(p.rank) && !isReturnProposal(p.subject)).length}
                </div>
                <div className="text-sm text-muted-foreground">Funded Proposals</div>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {proposals
                    .filter(p => isFundedProposal(p.rank) && !isReturnProposal(p.subject))
                    .reduce((sum, p) => {
                      const amount = parseInt(p.daily_pay.amount) / Math.pow(10, p.daily_pay.precision);
                      return sum + amount;
                    }, 0).toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Daily SBD Funded</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Proposals List/Grid */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {proposals.map((proposal) => {
              const cardClassName = isFundedProposal(proposal.rank) && !isReturnProposal(proposal.subject)
                ? "glass-card p-6 hover:bg-secondary/5 transition-colors bg-green-500/10 border-green-500/20"
                : "glass-card p-6 hover:bg-secondary/5 transition-colors";

              return (
                <Card key={proposal.id} className={cardClassName}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{proposal.rank}
                        </Badge>
                        <Badge 
                          variant={proposal.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {proposal.status}
                        </Badge>
                        {isFundedProposal(proposal.rank) && !isReturnProposal(proposal.subject) && (
                          <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
                            Funded
                          </Badge>
                        )}
                        {isReturnProposal(proposal.subject) && (
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                            Return Proposal
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                        {proposal.subject}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>@{proposal.creator}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4" />
                          <span>{formatDailyPay(proposal.daily_pay)}/day</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(proposal.start_date)} - {formatDate(proposal.end_date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="text-lg font-bold text-primary mb-1">
                        {convertedVotes[proposal.id] 
                          ? `${(convertedVotes[proposal.id] / 1000000).toFixed(1)}M SP`
                          : 'Converting...'
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">Total Votes</div>
                      
                      <div className="mt-3">
                        <Link 
                          to={`/post/${proposal.creator}/${proposal.permlink}`}
                          className="inline-block"
                        >
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => {
              const cardClassName = isFundedProposal(proposal.rank) && !isReturnProposal(proposal.subject)
                ? "glass-card p-6 hover:bg-secondary/5 transition-colors bg-green-500/10 border-green-500/20 h-full"
                : "glass-card p-6 hover:bg-secondary/5 transition-colors h-full";

              return (
                <Card key={proposal.id} className={cardClassName}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        #{proposal.rank}
                      </Badge>
                      <Badge 
                        variant={proposal.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                    
                    {isFundedProposal(proposal.rank) && !isReturnProposal(proposal.subject) && (
                      <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700 mb-2 w-fit">
                        Funded
                      </Badge>
                    )}
                    {isReturnProposal(proposal.subject) && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-300 mb-2 w-fit">
                        Return Proposal
                      </Badge>
                    )}
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight line-clamp-2">
                      {proposal.subject}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>@{proposal.creator}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4" />
                        <span>{formatDailyPay(proposal.daily_pay)}/day</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(proposal.start_date)} - {formatDate(proposal.end_date)}</span>
                      </div>
                    </div>

                    <div className="text-center border-t pt-4">
                      <div className="text-lg font-bold text-primary mb-1">
                        {convertedVotes[proposal.id] 
                          ? `${(convertedVotes[proposal.id] / 1000000).toFixed(1)}M SP`
                          : 'Converting...'
                        }
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">Total Votes</div>
                      
                      <Link 
                        to={`/post/${proposal.creator}/${proposal.permlink}`}
                        className="inline-block"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default DAOProposals;
