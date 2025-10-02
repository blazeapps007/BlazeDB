import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TopHoldersData } from '@/hooks/useStatisticsData';

interface TopHoldersChartProps {
  data: TopHoldersData[];
}

const chartConfig = {
  balance: {
    label: "Balance (STEEM)",
    color: "hsl(var(--primary))",
  },
};

export const TopHoldersChart = ({ data }: TopHoldersChartProps) => {
  // Take top 10 for better visualization
  const top10Data = data.slice(0, 10);

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Top 10 Account Holdings</h3>
        <p className="text-sm text-muted-foreground">Largest STEEM token holders by balance</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10Data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <YAxis 
              type="category"
              dataKey="account" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              width={100}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">@{data.account}</p>
                      <p className="text-sm text-muted-foreground">
                        Balance: {data.balance.toLocaleString()} STEEM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Percentage: {data.percentage}% of total supply
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="balance" 
              fill="var(--color-balance)" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};