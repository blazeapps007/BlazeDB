import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { MarketCapData } from '@/hooks/useStatisticsData';

interface MarketCapChartProps {
  data: MarketCapData;
}

const chartConfig = {
  steem: {
    label: "STEEM",
    color: "hsl(var(--primary))",
  },
  sbd: {
    label: "SBD",
    color: "hsl(var(--accent))",
  },
};

export const MarketCapChart = ({ data }: MarketCapChartProps) => {
  const chartData = [
    {
      name: 'STEEM',
      value: data.steem.marketCap,
      percentage: data.steem.percentage,
      supply: data.steem.supply,
    },
    {
      name: 'SBD',
      value: data.sbd.marketCap,
      percentage: data.sbd.percentage,
      supply: data.sbd.supply,
    },
  ];

  const COLORS = ['var(--color-steem)', 'var(--color-sbd)'];

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Market Cap Distribution</h3>
        <p className="text-sm text-muted-foreground">Total market capitalization by token</p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Market Cap: ${data.value.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supply: {data.supply.toLocaleString()}
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
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ color: 'hsl(var(--foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};