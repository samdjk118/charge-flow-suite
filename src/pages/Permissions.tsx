import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Settings, Users, Shield } from "lucide-react";

const users = [
  {
    id: 1,
    name: "管理員",
    email: "admin@company.com",
    role: "admin",
    permissions: ["全部權限"],
    status: "active",
    lastLogin: "2024-01-15 10:30"
  },
  {
    id: 2,
    name: "財務經理",
    email: "finance@company.com",
    role: "finance_manager",
    permissions: ["帳務管理", "報表查看", "客戶管理"],
    status: "active",
    lastLogin: "2024-01-14 16:45"
  },
  {
    id: 3,
    name: "業務代表",
    email: "sales@company.com",
    role: "sales",
    permissions: ["客戶管理", "專案查看"],
    status: "active",
    lastLogin: "2024-01-13 14:20"
  },
  {
    id: 4,
    name: "系統操作員",
    email: "operator@company.com",
    role: "operator",
    permissions: ["儀表板查看", "基本操作"],
    status: "inactive",
    lastLogin: "2024-01-10 09:15"
  },
];

const roles = [
  {
    name: "admin",
    displayName: "系統管理員",
    description: "擁有系統所有權限",
    userCount: 1,
    permissions: ["全部權限"]
  },
  {
    name: "finance_manager",
    displayName: "財務經理",
    description: "管理帳務與財務報表",
    userCount: 1,
    permissions: ["帳務管理", "報表查看", "客戶管理", "折扣設定"]
  },
  {
    name: "sales",
    displayName: "業務代表",
    description: "管理客戶與專案",
    userCount: 1,
    permissions: ["客戶管理", "專案查看", "基本報表"]
  },
  {
    name: "operator",
    displayName: "系統操作員",
    description: "基本系統操作",
    userCount: 1,
    permissions: ["儀表板查看", "基本操作"]
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "admin":
      return <Badge variant="destructive">管理員</Badge>;
    case "finance_manager":
      return <Badge className="bg-info text-white">財務經理</Badge>;
    case "sales":
      return <Badge className="bg-success text-success-foreground">業務代表</Badge>;
    case "operator":
      return <Badge variant="secondary">操作員</Badge>;
    default:
      return <Badge variant="outline">未知</Badge>;
  }
};

export default function Permissions() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">權限管理</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            角色設定
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新增用戶
          </Button>
        </div>
      </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  總用戶數
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter(u => u.status === 'active').length} 位活躍用戶
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  角色數量
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.length}</div>
                <p className="text-xs text-muted-foreground">
                  4 種預設角色
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>用戶管理</CardTitle>
                <CardDescription>
                  管理系統用戶及其權限
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用戶</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>最後登入</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "活躍" : "停用"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>角色權限</CardTitle>
                <CardDescription>
                  系統角色及其權限配置
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{role.displayName}</h4>
                          <Badge variant="outline">{role.userCount} 用戶</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          編輯
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
        </Card>
      </div>
    </div>
  );
}