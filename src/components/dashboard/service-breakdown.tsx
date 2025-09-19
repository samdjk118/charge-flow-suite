import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "雲端運算", value: 350000, color: "hsl(var(--primary))" },
  { name: "資料庫服務", value: 280000, color: "hsl(var(--accent))" },
  { name: "CDN服務", value: 150000, color: "hsl(var(--info))" },
  { name: "監控服務", value: 120000, color: "hsl(var(--warning))" },
  { name: "其他服務", value: 85000, color: "hsl(var(--neutral))" },
];

export function ServiceBreakdown() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>服務成本分析</CardTitle>
        <CardDescription>
          各項服務的成本佔比
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  formatter={(value: number) => [
                    `NT$ ${value.toLocaleString()}`,
                    "成本"
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-sm">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">
                    NT$ {item.value.toLocaleString()} ({((item.value / total) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}