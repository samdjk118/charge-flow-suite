import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    status: "",
    startDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡將來會串接API
    console.log("新增專案:", formData);
    setOpen(false);
    setFormData({ name: "", customer: "", status: "", startDate: "" });
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">專案管理</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增專案
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>新增專案</DialogTitle>
              <DialogDescription>
                請填入專案基本資訊
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    服務/專案名
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                    placeholder="輸入專案名稱"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    客戶名
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, customer: value })} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇客戶" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="科技公司 A">科技公司 A</SelectItem>
                      <SelectItem value="新創企業 B">新創企業 B</SelectItem>
                      <SelectItem value="傳統製造 C">傳統製造 C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    狀態
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, status: value })} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="啟用">啟用</SelectItem>
                      <SelectItem value="停用">停用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    啟用日
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">新增專案</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
  );
}