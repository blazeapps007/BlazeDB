import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ActiveAccountsData } from '@/hooks/useStatisticsData';

interface ActiveAccountsChartProps {
  data: ActiveAccountsData[];
}

const chartConfig = {
  daily: {
    label: "Daily Active",
    color: "hsl(var(--primary))",
  },
  weekly: {
    label: "Weekly Active",
    color: "hsl(var(--accent))",
  },
  monthly: {
    label: "Monthly Active",
    color: "hsl(var(--secondary))",
  },
};

export const ActiveAccountsChart = ({ data }: ActiveAccountsChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Active Accounts</h3>
        <p className="text-sm text-muted-foreground">Daily, weekly, and monthly active user trends</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <Area 
              type="monotone" 
              dataKey="monthly" 
              stackId="1"
              stroke="var(--color-monthly)" 
              fill="var(--color-monthly)"
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="weekly" 
              stackId="1"
              stroke="var(--color-weekly)" 
              fill="var(--color-weekly)"
              fillOpacity={0.4}
            />
            <Area 
              type="monotone" 
              dataKey="daily" 
              stackId="1"
              stroke="var(--color-daily)" 
              fill="var(--color-daily)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};