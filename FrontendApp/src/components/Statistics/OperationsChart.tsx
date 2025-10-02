import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { OperationsData } from '@/hooks/useStatisticsData';

interface OperationsChartProps {
  data: OperationsData[];
}

const chartConfig = {
  vote: {
    label: "Votes",
    color: "hsl(var(--primary))",
  },
  post: {
    label: "Posts",
    color: "hsl(var(--accent))",
  },
  comment: {
    label: "Comments",
    color: "hsl(var(--secondary))",
  },
  transfer: {
    label: "Transfers",
    color: "hsl(215 100% 60%)",
  },
  powerUp: {
    label: "Power Up",
    color: "hsl(200 85% 55%)",
  },
  other: {
    label: "Other",
    color: "hsl(var(--muted))",
  },
};

export const OperationsChart = ({ data }: OperationsChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Operations by Type</h3>
        <p className="text-sm text-muted-foreground">Breakdown of blockchain operations over time</p>
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
              dataKey="other" 
              stackId="1"
              stroke="var(--color-other)" 
              fill="var(--color-other)"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="powerUp" 
              stackId="1"
              stroke="var(--color-powerUp)" 
              fill="var(--color-powerUp)"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="transfer" 
              stackId="1"
              stroke="var(--color-transfer)" 
              fill="var(--color-transfer)"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="comment" 
              stackId="1"
              stroke="var(--color-comment)" 
              fill="var(--color-comment)"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="post" 
              stackId="1"
              stroke="var(--color-post)" 
              fill="var(--color-post)"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="vote" 
              stackId="1"
              stroke="var(--color-vote)" 
              fill="var(--color-vote)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};