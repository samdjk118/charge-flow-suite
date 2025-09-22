import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Eye } from "lucide-react";
import { useState } from "react";

const billingRecords = [
  {
    id: "B-2024-001",
    customer: "科技公司 A",
    service: "雲端運算",
    amount: 45000,
    discount: 10,
    finalAmount: 40500,
    status: "paid",
    date: "2024-01-15",
    dueDate: "2024-02-15"
  },
  {
    id: "B-2024-002",
    customer: "新創企業 B",
    service: "資料庫服務",
    amount: 28000,
    discount: 5,
    finalAmount: 26600,
    status: "pending",
    date: "2024-01-10",
    dueDate: "2024-02-10"
  },
  {
    id: "B-2024-003",
    customer: "傳統製造 C",
    service: "CDN服務",
    amount: 15000,
    discount: 15,
    finalAmount: 12750,
    status: "overdue",
    date: "2024-12-20",
    dueDate: "2024-01-20"
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-success text-success-foreground">已付款</Badge>;
    case "pending":
      return <Badge variant="secondary">待付款</Badge>;
    case "overdue":
      return <Badge variant="destructive">逾期</Badge>;
    default:
      return <Badge variant="outline">未知</Badge>;
  }
};

export default function Billing() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    month: "",
    customer: "",
    service: "",
    discount: "",
    originalPrice: "",
    finalAmount: "",
    date: ""
  });

  const calculateFinalAmount = (originalPrice: string, discount: string) => {
    const price = parseFloat(originalPrice) || 0;
    const discountPercent = parseFloat(discount) || 0;
    return price * (1 - discountPercent / 100);
  };

  const handleOriginalPriceChange = (value: string) => {
    setFormData(prev => {
      const newData = { ...prev, originalPrice: value };
      newData.finalAmount = calculateFinalAmount(value, prev.discount).toString();
      return newData;
    });
  };

  const handleDiscountChange = (value: string) => {
    setFormData(prev => {
      const newData = { ...prev, discount: value };
      newData.finalAmount = calculateFinalAmount(prev.originalPrice, value).toString();
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡將來會串接API
    console.log("新增帳單:", formData);
    setOpen(false);
    setFormData({
      month: "",
      customer: "",
      service: "",
      discount: "",
      originalPrice: "",
      finalAmount: "",
      date: ""
    });
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">帳務模組</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            匯出
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新增帳單
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>新增帳單</DialogTitle>
                <DialogDescription>
                  請填入帳單詳細資訊
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="month" className="text-right">
                      月份
                    </Label>
                    <Input
                      id="month"
                      type="month"
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">
                      客戶
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
                    <Label htmlFor="service" className="text-right">
                      服務/專案
                    </Label>
                    <Input
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="col-span-3"
                      placeholder="輸入服務或專案名稱"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="originalPrice" className="text-right">
                      原價
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleOriginalPriceChange(e.target.value)}
                      className="col-span-3"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount" className="text-right">
                      折扣 (%)
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleDiscountChange(e.target.value)}
                      className="col-span-3"
                      placeholder="0"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="finalAmount" className="text-right">
                      實付金額
                    </Label>
                    <Input
                      id="finalAmount"
                      type="number"
                      value={formData.finalAmount}
                      className="col-span-3"
                      readOnly
                      placeholder="自動計算"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      日期
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">新增帳單</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  本月總收入
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">NT$ 79,850</div>
                <p className="text-xs text-muted-foreground">
                  +15.2% 較上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  待收款項
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">NT$ 26,600</div>
                <p className="text-xs text-muted-foreground">
                  1 筆待付款
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  逾期款項
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">NT$ 12,750</div>
                <p className="text-xs text-muted-foreground">
                  1 筆逾期
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  平均折扣
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10.0%</div>
                <p className="text-xs text-muted-foreground">
                  本月平均折扣率
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>帳單記錄</CardTitle>
              <CardDescription>
                管理客戶的服務費用與折扣
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>帳單編號</TableHead>
                    <TableHead>客戶</TableHead>
                    <TableHead>服務</TableHead>
                    <TableHead>原價</TableHead>
                    <TableHead>折扣</TableHead>
                    <TableHead>實付金額</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>到期日</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.customer}</TableCell>
                      <TableCell>{record.service}</TableCell>
                      <TableCell>NT$ {record.amount.toLocaleString()}</TableCell>
                      <TableCell>{record.discount}%</TableCell>
                      <TableCell className="font-medium">
                        NT$ {record.finalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.dueDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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