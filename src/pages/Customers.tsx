import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Eye } from "lucide-react";
import { useState } from "react";

const customers = [
  {
    id: 1,
    name: "科技公司 A",
    contact: "張經理",
    email: "manager@techA.com",
    contactPlatform: "電話",
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
    contactPlatform: "Line",
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
    contactPlatform: "微信",
    projects: 5,
    totalSpent: 320000,
    status: "inactive",
    lastActivity: "2024-12-20"
  },
];

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    contactPlatform: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡將來會串接API
    console.log("新增客戶:", formData);
    setOpen(false);
    setFormData({ name: "", email: "", contact: "", contactPlatform: "" });
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">客戶管理</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增客戶
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>新增客戶</DialogTitle>
              <DialogDescription>
                請填入客戶基本資訊
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    名稱
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    聯絡人
                  </Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactPlatform" className="text-right">
                    聯絡平台
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, contactPlatform: value })} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇聯絡平台" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="電話">電話</SelectItem>
                      <SelectItem value="Line">Line</SelectItem>
                      <SelectItem value="微信">微信</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">新增客戶</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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

      <Card>
        <CardHeader>
          <CardTitle>客戶列表</CardTitle>
          <CardDescription>
            管理所有客戶資訊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客戶名稱</TableHead>
                <TableHead>聯絡人</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>聯絡平台</TableHead>
                <TableHead>專案數</TableHead>
                <TableHead>總消費</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>最後活動</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.contactPlatform}</TableCell>
                  <TableCell>{customer.projects}</TableCell>
                  <TableCell>NT$ {customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "活躍" : "非活躍"}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
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