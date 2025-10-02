import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TPSData } from '@/hooks/useStatisticsData';

interface TPSChartProps {
  data: TPSData[];
}

const chartConfig = {
  tps: {
    label: "TPS",
    color: "hsl(var(--primary))",
  },
  transactions: {
    label: "Daily Transactions",
    color: "hsl(var(--accent))",
  },
};

export const TPSChart = ({ data }: TPSChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transactions Per Second (TPS)</h3>
        <p className="text-sm text-muted-foreground">Real-time and historical transaction throughput</p>
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
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="tps" 
              stroke="var(--color-tps)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-tps)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};