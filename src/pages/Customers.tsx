import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const customers = [
  {
    id: 1,
    name: "科技公司 A",
    contact: "張經理",
    email: "manager@techA.com",
    projects: 3,
    totalSpent: 150000,
    status: "active",
    lastActivity: "2024-01-15"
  },
  {
    id: 2,
    name: "新創企業 B",
    contact: "李總監",
    email: "director@startupB.com",
    projects: 1,
    totalSpent: 85000,
    status: "active",
    lastActivity: "2024-01-10"
  },
  {
    id: 3,
    name: "傳統製造 C",
    contact: "王副總",
    email: "vp@manufacturingC.com",
    projects: 5,
    totalSpent: 320000,
    status: "inactive",
    lastActivity: "2024-12-20"
  },
];

export default function Customers() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">客戶管理</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增客戶
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜尋客戶..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              篩選
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "活躍" : "非活躍"}
                    </Badge>
                  </div>
                  <CardDescription>
                    聯絡人: {customer.contact}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">專案數:</span>
                      <span>{customer.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">總消費:</span>
                      <span className="font-medium">NT$ {customer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">最後活動:</span>
                      <span>{customer.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      編輯
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      查看詳情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}