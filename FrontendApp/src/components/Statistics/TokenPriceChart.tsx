import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PriceData } from '@/hooks/useStatisticsData';

interface TokenPriceChartProps {
  data: PriceData[];
}

const chartConfig = {
  steem: {
    label: "STEEM (USD)",
    color: "hsl(var(--primary))",
  },
  sbd: {
    label: "SBD (USD)",
    color: "hsl(var(--accent))",
  },
};

export const TokenPriceChart = ({ data }: TokenPriceChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">STEEM & SBD Price Trends</h3>
        <p className="text-sm text-muted-foreground">Historical price movements in USD</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="steem" 
              stroke="var(--color-steem)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-steem)", strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="sbd" 
              stroke="var(--color-sbd)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-sbd)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};