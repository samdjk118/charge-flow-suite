import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Receipt, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
  description?: string;
}

export function StatsCard({ title, value, change, changeType, icon, description }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs">
          {changeType === "increase" ? (
            <TrendingUp className="h-3 w-3 text-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive" />
          )}
          <span
            className={cn(
              "font-medium",
              changeType === "increase" ? "text-success" : "text-destructive"
            )}
          >
            {change}
          </span>
          <span className="text-muted-foreground">較上月</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "總收入",
      value: "NT$ 2,845,230",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: <DollarSign className="h-4 w-4" />,
      description: "本月累計營收"
    },
    {
      title: "活躍客戶",
      value: "128",
      change: "+8.2%",
      changeType: "increase" as const,
      icon: <Users className="h-4 w-4" />,
      description: "本月活躍客戶數"
    },
    {
      title: "待處理帳單",
      value: "24",
      change: "-5.1%",
      changeType: "decrease" as const,
      icon: <Receipt className="h-4 w-4" />,
      description: "需要審核的帳單"
    },
    {
      title: "進行中專案",
      value: "45",
      change: "+15.3%",
      changeType: "increase" as const,
      icon: <Building2 className="h-4 w-4" />,
      description: "目前執行專案數"
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}