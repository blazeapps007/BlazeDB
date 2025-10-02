
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEcosystemData } from '@/hooks/useEcosystemData';
import { renderIcon } from '@/lib/iconRenderer';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'beta':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'development':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Explorer':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'Condenser':
      return 'bg-violet-500/10 text-violet-500 border-violet-500/20';
    case 'Account Management':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    case 'Automation':
      return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
    case 'Gaming':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Social':
      return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
    case 'Visualization':
      return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const Ecosystem = () => {
  const { data: dApps, isLoading, error } = useEcosystemData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading ecosystem data...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <p className="text-destructive">Failed to load ecosystem data</p>
              <p className="text-muted-foreground text-sm">Please try again later</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categories = [...new Set(dApps?.map(app => app.category) || [])];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">STEEM Ecosystem</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the diverse ecosystem of applications built on the STEEM blockchain. 
            From explorers to gaming platforms, find the tools that power the STEEM community.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="px-4 py-2">
              All Categories
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category}
                variant="outline" 
                className={`px-4 py-2 cursor-pointer hover:opacity-80 ${getCategoryColor(category)}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dApps?.map(app => (
            <Card key={app.id} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {renderIcon(app.icon)}
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {app.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(app.category)}`}
                        >
                          {app.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(app.status)}`}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        by{' '}
                        <Link 
                          to={`/account/${app.developer.replace('@', '')}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {app.developer}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {app.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {app.features.map(feature => (
                      <Badge 
                        key={feature}
                        variant="secondary" 
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 group/button"
                  onClick={() => window.open(app.url, '_blank')}
                >
                  Visit Application
                  <ExternalLink className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {dApps?.length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {dApps?.filter(app => app.status === 'active').length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {dApps?.filter(app => app.status === 'beta').length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Beta</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {categories.length}
              </div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="glass-card text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Build on STEEM
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Are you building an application on the STEEM blockchain? Join our ecosystem 
              and connect with thousands of users in the STEEM community by submitting a pull request.
            </p>
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => window.open('https://github.com/blazeapps007/BlazeDB/blob/Blazed/', '_blank')}
            >
              Submit Your DApp
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Ecosystem;
