import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ServiceBreakdown } from "@/components/dashboard/service-breakdown";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">儀表板</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            最後更新: {new Date().toLocaleString('zh-TW')}
          </span>
        </div>
      </div>
      <StatsCards />
      <div className="grid gap-4 grid-cols-1">
        <div>
          <RevenueChart />
        </div>
        <div className="w-full lg:w-1/2">
          <ServiceBreakdown />
        </div>
      </div>
    </div>
  );
}