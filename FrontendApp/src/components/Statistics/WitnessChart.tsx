import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopWitnessData, BlockProductionData } from '@/hooks/useStatisticsData';

interface WitnessChartProps {
  topWitnessData: TopWitnessData[];
  blockProductionData: BlockProductionData[];
}

const chartConfig = {
  votes: {
    label: "Votes",
    color: "hsl(var(--primary))",
  },
  efficiency: {
    label: "Efficiency (%)",
    color: "hsl(var(--accent))",
  },
};

export const WitnessChart = ({ topWitnessData, blockProductionData }: WitnessChartProps) => {
  const top10Witnesses = topWitnessData.slice(0, 10);
  const top10Production = blockProductionData.slice(0, 10);

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--secondary))',
    'hsl(215 100% 60%)',
    'hsl(200 85% 55%)',
    'hsl(280 65% 60%)',
    'hsl(25 95% 60%)',
    'hsl(120 60% 50%)',
    'hsl(340 75% 55%)',
    'hsl(60 90% 50%)',
  ];

  return (
    <Card className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Witness Statistics</h3>
        <p className="text-sm text-muted-foreground">Witness voting and block production performance</p>
      </div>
      
      <Tabs defaultValue="votes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="votes">Vote Distribution</TabsTrigger>
          <TabsTrigger value="production">Block Production</TabsTrigger>
        </TabsList>
        
        <TabsContent value="votes">
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={top10Witnesses}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="votes"
                  label={({ witness, percentage }) => `${witness} (${percentage}%)`}
                  labelLine={false}
                >
                  {top10Witnesses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium text-foreground">@{data.witness}</p>
                          <p className="text-sm text-muted-foreground">
                            Votes: {data.votes.toLocaleString()}
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
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="production">
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10Production}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="witness" 
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
                          <p className="font-medium text-foreground">@{data.witness}</p>
                          <p className="text-sm text-muted-foreground">
                            Produced: {data.produced.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Missed: {data.missed}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Efficiency: {data.efficiency}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="efficiency" fill="var(--color-efficiency)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
};