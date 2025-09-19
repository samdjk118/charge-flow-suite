import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  {
    id: 1,
    name: "ERP系統開發",
    customer: "科技公司 A",
    status: "進行中",
    budget: 500000,
    spent: 320000,
    progress: 64,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    accounts: ["張經理", "李工程師"]
  },
  {
    id: 2,
    name: "網站重構",
    customer: "新創企業 B",
    status: "規劃中",
    budget: 150000,
    spent: 25000,
    progress: 17,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    accounts: ["李總監"]
  },
  {
    id: 3,
    name: "數據分析平台",
    customer: "傳統製造 C",
    status: "已完成",
    budget: 800000,
    spent: 750000,
    progress: 100,
    startDate: "2023-08-01",
    endDate: "2023-12-31",
    accounts: ["王副總", "陳分析師", "劉工程師"]
  },
  {
    id: 4,
    name: "移動應用開發",
    customer: "科技公司 A",
    status: "進行中",
    budget: 300000,
    spent: 180000,
    progress: 60,
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    accounts: ["張經理", "周設計師"]
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "進行中":
      return <Badge variant="default">進行中</Badge>;
    case "規劃中":
      return <Badge variant="secondary">規劃中</Badge>;
    case "已完成":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Projects() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">專案管理</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增專案
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜尋專案..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              篩選
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>專案列表</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>專案名稱</TableHead>
                    <TableHead>客戶</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>預算</TableHead>
                    <TableHead>已花費</TableHead>
                    <TableHead>進度</TableHead>
                    <TableHead>開始日期</TableHead>
                    <TableHead>結束日期</TableHead>
                    <TableHead>相關帳號</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.customer}</TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell>NT$ {project.budget.toLocaleString()}</TableCell>
                      <TableCell>NT$ {project.spent.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{project.startDate}</TableCell>
                      <TableCell>{project.endDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.accounts.map((account, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {account}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>編輯專案</DropdownMenuItem>
                            <DropdownMenuItem>查看詳情</DropdownMenuItem>
                            <DropdownMenuItem>管理帳號</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              刪除專案
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}