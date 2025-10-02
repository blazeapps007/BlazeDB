
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlockDetails = lazy(() => import("./pages/BlockDetails"));
const TransactionDetails = lazy(() => import("./pages/TransactionDetails"));
const AccountDetails = lazy(() => import("./pages/AccountDetails"));
const Blocks = lazy(() => import("./pages/Blocks"));

const PostView = lazy(() => import("./pages/PostView"));
const Witnesses = lazy(() => import("./pages/Witnesses"));
const DAOProposals = lazy(() => import("./pages/DAOProposals"));
const Ecosystem = lazy(() => import("./pages/Ecosystem"));
const Statistics = lazy(() => import("./pages/Statistics"));

// Optimized query client with better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blocks" element={<Blocks />} />
              
              <Route path="/dao-proposals" element={<DAOProposals />} />
              <Route path="/witnesses" element={<Witnesses />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/block/:blockNumber" element={<BlockDetails />} />
              <Route path="/transaction/:txHash" element={<TransactionDetails />} />
              <Route path="/account/:username" element={<AccountDetails />} />
              <Route path="/post/:author/:permlink" element={<PostView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
