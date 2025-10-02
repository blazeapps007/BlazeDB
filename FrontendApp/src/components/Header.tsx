
import { Search, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();
    
    // Check if it looks like a transaction ID (64 character hex string)
    if (/^[a-fA-F0-9]{64}$/.test(query)) {
      navigate(`/transaction/${query}`);
    }
    // Check if it looks like a block number (numeric)
    else if (/^\d+$/.test(query)) {
      navigate(`/block/${query}`);
    }
    // Check if it looks like author/permlink format
    else if (query.includes('/') && query.split('/').length === 2) {
      const [author, permlink] = query.split('/');
      if (author && permlink) {
        navigate(`/post/${author}/${permlink}`);
      }
    }
    // Check if it looks like an account name (starts with @)
    else if (query.startsWith('@')) {
      navigate(`/account/${query.substring(1)}`);
    }
    // Default to account search
    else {
      navigate(`/account/${query}`);
    }
    
    setSearchQuery('');
    setIsMobileMenuOpen(false); // Close mobile menu on search
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Blaze Scanner</h1>
                <p className="text-xs text-muted-foreground">STEEM Blockchain Explorer</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blocks, transactions, accounts, posts..."
                className="pl-10 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-secondary/70 transition-colors"
              />
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/blocks" className="text-muted-foreground hover:text-foreground transition-colors">Blocks</Link>
              
              <Link to="/dao-proposals" className="text-muted-foreground hover:text-foreground transition-colors">DAO Proposals</Link>
              <Link to="/witnesses" className="text-muted-foreground hover:text-foreground transition-colors">Witnesses</Link>
              
              <Link to="/ecosystem" className="text-muted-foreground hover:text-foreground transition-colors">Ecosystem</Link>
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary/50">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 flex flex-col">
                  {/* Menu Header */}
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-foreground">Blaze Scanner</h1>
                      <p className="text-xs text-muted-foreground">STEEM Explorer</p>
                    </div>
                  </Link>

                  {/* Search Bar */}
                  <form onSubmit={handleSearch} className="relative w-full mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-10 bg-secondary/50 border-border"
                    />
                  </form>

                  {/* Navigation Links */}
                  <nav className="flex-grow flex flex-col space-y-2">
                    <Link to="/blocks" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">Blocks</Link>
                    
                    <Link to="/dao-proposals" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">DAO Proposals</Link>
                    <Link to="/witnesses" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">Witnesses</Link>
                    
                    <Link to="/ecosystem" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">Ecosystem</Link>
                  </nav>

                  {/* Menu Footer */}
                  <div className="pt-6 mt-auto border-t border-border/50 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Blaze Scanner.</p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
