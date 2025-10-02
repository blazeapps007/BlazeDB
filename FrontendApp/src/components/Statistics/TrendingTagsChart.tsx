import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingTagsData } from '@/hooks/useStatisticsData';

interface TrendingTagsChartProps {
  data: TrendingTagsData[];
}

const chartConfig = {
  count: {
    label: "Post Count",
    color: "hsl(var(--primary))",
  },
};

export const TrendingTagsChart = ({ data }: TrendingTagsChartProps) => {
  // Take top 10 for better visualization
  const top10Tags = data.slice(0, 10);

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Trending Tags</h3>
        <p className="text-sm text-muted-foreground">Most popular content categories</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10Tags}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="tag" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">#{data.tag}</p>
                      <p className="text-sm text-muted-foreground">
                        Posts: {data.count.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Share: {data.percentage}%
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