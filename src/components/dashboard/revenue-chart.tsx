import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "1月", revenue: 145000, expenses: 98000 },
  { month: "2月", revenue: 167000, expenses: 112000 },
  { month: "3月", revenue: 189000, expenses: 128000 },
  { month: "4月", revenue: 156000, expenses: 105000 },
  { month: "5月", revenue: 203000, expenses: 142000 },
  { month: "6月", revenue: 234000, expenses: 159000 },
  { month: "7月", revenue: 198000, expenses: 134000 },
  { month: "8月", revenue: 267000, expenses: 178000 },
  { month: "9月", revenue: 298000, expenses: 195000 },
  { month: "10月", revenue: 245000, expenses: 165000 },
  { month: "11月", revenue: 289000, expenses: 189000 },
  { month: "12月", revenue: 312000, expenses: 205000 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>營收趨勢</CardTitle>
        <CardDescription>
          過去12個月的營收與支出分析
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs fill-muted-foreground"
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `NT$ ${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              formatter={(value: number, name: string) => [
                `NT$ ${value.toLocaleString()}`,
                name === "revenue" ? "營收" : "支出"
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--destructive))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}