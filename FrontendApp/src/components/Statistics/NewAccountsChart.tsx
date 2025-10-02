import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { NewAccountsData } from '@/hooks/useStatisticsData';

interface NewAccountsChartProps {
  data: NewAccountsData[];
}

const chartConfig = {
  count: {
    label: "New Accounts",
    color: "hsl(var(--primary))",
  },
};

export const NewAccountsChart = ({ data }: NewAccountsChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">New Account Creation</h3>
        <p className="text-sm text-muted-foreground">Daily new account registration trends</p>
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
              dataKey="count" 
              stroke="var(--color-count)" 
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-count)" }}
              activeDot={{ r: 5, stroke: "var(--color-count)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};