import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

export function NavItem({ icon: Icon, label, href, badge }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 h-11",
          isActive && "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
        {badge && (
          <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </Button>
    </Link>
  );
}

interface NavigationProps {
  items: NavItemProps[];
}

export function Navigation({ items }: NavigationProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}