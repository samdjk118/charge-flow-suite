import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Projects from "./pages/Projects";
import Billing from "./pages/Billing";
import Permissions from "./pages/Permissions";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function AuthenticatedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-6 bg-background">
            <SidebarTrigger className="mr-4" />
            <h2 className="text-lg font-semibold">計費管理系統</h2>
          </header>
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/invoices" element={<Billing />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/permissions" element={<Permissions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<AuthenticatedLayout />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;