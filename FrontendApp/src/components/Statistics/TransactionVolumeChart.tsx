import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TransactionVolumeData } from '@/hooks/useStatisticsData';

interface TransactionVolumeChartProps {
  data: TransactionVolumeData[];
}

const chartConfig = {
  volume: {
    label: "Transaction Volume",
    color: "hsl(var(--primary))",
  },
  operations: {
    label: "Operations",
    color: "hsl(var(--accent))",
  },
};

export const TransactionVolumeChart = ({ data }: TransactionVolumeChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Daily Transaction Volume</h3>
        <p className="text-sm text-muted-foreground">Historical transaction and operation counts</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            <Bar dataKey="volume" fill="var(--color-volume)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};