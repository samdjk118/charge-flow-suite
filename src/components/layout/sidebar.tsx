import { Building2, LayoutDashboard, Users, Receipt, Settings, CreditCard } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

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
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <SidebarComponent className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            B
          </div>
          {state === "expanded" && (
            <h1 className="text-lg font-semibold">Billing System</h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主選單</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.label : undefined}
                  >
                    <NavLink to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        {state === "expanded" && (
          <div className="px-2 py-1">
            <div className="text-xs text-muted-foreground">版本 1.0.0</div>
          </div>
        )}
      </SidebarFooter>
    </SidebarComponent>
  );
}