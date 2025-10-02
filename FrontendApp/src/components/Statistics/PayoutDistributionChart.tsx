import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PayoutDistributionData } from '@/hooks/useStatisticsData';

interface PayoutDistributionChartProps {
  data: PayoutDistributionData[];
}

const chartConfig = {
  count: {
    label: "Number of Posts",
    color: "hsl(var(--primary))",
  },
};

export const PayoutDistributionChart = ({ data }: PayoutDistributionChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Post Payout Distribution</h3>
        <p className="text-sm text-muted-foreground">Histogram of post rewards by payout range</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="range" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{ value: 'Payout Range (USD)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{ value: 'Number of Posts', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">${data.range} USD</p>
                      <p className="text-sm text-muted-foreground">
                        Posts: {data.count.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Percentage: {data.percentage}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};