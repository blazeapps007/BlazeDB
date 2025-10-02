import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EngagementData } from '@/hooks/useStatisticsData';

interface EngagementChartProps {
  data: EngagementData[];
}

const chartConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--primary))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--accent))",
  },
  votes: {
    label: "Votes",
    color: "hsl(var(--secondary))",
  },
};

export const EngagementChart = ({ data }: EngagementChartProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Content Engagement</h3>
        <p className="text-sm text-muted-foreground">Posts, comments, and votes over time</p>
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
              dataKey="posts" 
              stroke="var(--color-posts)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-posts)", strokeWidth: 2 }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="comments" 
              stroke="var(--color-comments)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-comments)", strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="votes" 
              stroke="var(--color-votes)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-votes)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};