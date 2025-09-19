import { Building2, LayoutDashboard, Users, Receipt, Settings, CreditCard } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "儀表板",
    href: "/",
  },
  {
    icon: Users,
    label: "客戶管理",
    href: "/customers",
  },
  {
    icon: Receipt,
    label: "帳務模組",
    href: "/billing",
  },
  {
    icon: CreditCard,
    label: "發票管理",
    href: "/invoices",
  },
  {
    icon: Building2,
    label: "專案管理",
    href: "/projects",
  },
  {
    icon: Settings,
    label: "權限管理",
    href: "/permissions",
  },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-14 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            B
          </div>
          <h1 className="text-lg font-semibold">Billing System</h1>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-6">
        <Navigation items={navigationItems} />
      </div>
      
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          版本 1.0.0
        </div>
      </div>
    </div>
  );
}