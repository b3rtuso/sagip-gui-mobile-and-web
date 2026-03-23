import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FileText, 
  ChartColumn,
  Menu,
  Bell,
  Settings,
  Siren,
  Building2,
  PhoneIncoming,
  Search,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";
import { useStore } from "../store";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "figma:asset/4558e936a223c460ebc16418eb91c5d11f0dc10e.png";

export function Root() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const incidents = useStore((state) => state.incidents);

  const pendingCount = incidents.filter(
    (i) => i.status === "pending"
  ).length;

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Requests", path: "/requests", icon: FileText },
    { name: "Call Logs", path: "/call-logs", icon: PhoneIncoming },
    { name: "Analytics & Reports", path: "/analytics", icon: ChartColumn },
    { name: "Departments", path: "/departments", icon: Building2 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-[#3370D9] text-white transition-all duration-300 flex flex-col ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className={`flex items-center p-4 border-b border-white/10 ${sidebarOpen ? "justify-between" : "flex-col gap-2"}`}>
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2.5">
                <ImageWithFallback 
                  src={logoImage}
                  alt="Logo"
                  className="h-10 w-10 rounded-xl object-cover flex-shrink-0 shadow-lg shadow-[#E3000F]/20"
                />
                <div>
                  <h1 className="text-lg font-bold tracking-tight">SendResqPls</h1>
                  <p className="text-xs text-blue-200">MDRRMO Balayan</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <ImageWithFallback 
                src={logoImage}
                alt="Logo"
                className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-[#E3000F]/20"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-white/10 mt-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/" 
              ? location.pathname === "/" 
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm font-medium"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="flex-1">{item.name}</span>
                )}
                {sidebarOpen && item.name === "Requests" && pendingCount > 0 && (
                  <Badge className="bg-[#FFB020] text-[#7A5000] border-none font-bold text-xs h-5 min-w-5 flex items-center justify-center">
                    {pendingCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#E3000F] to-[#B3000C] flex items-center justify-center text-white text-sm font-semibold shadow-md">
                AD
              </div>
              <div className="text-sm min-w-0 flex-1">
                <p className="font-medium truncate text-white">Admin User</p>
                <p className="text-blue-200 text-xs truncate">Operations Chief</p>
              </div>
              <Button variant="ghost" size="icon" className="text-blue-200 hover:text-white hover:bg-white/10 h-8 w-8" onClick={() => toast.success("Logging out...")}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests, departments..."
                  className="pl-10 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Live Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00A699]/10 border border-[#00A699]/20 rounded-full text-sm text-[#008A7E] font-medium">
                <div className="h-2 w-2 rounded-full bg-[#00A699] animate-pulse" />
                System Active
              </div>

              <Button variant="outline" size="icon" className="relative rounded-xl border-gray-200 text-gray-500 hover:text-[#0056D2] hover:bg-[#0056D2]/5" onClick={() => toast.success("Opening notifications...")}>
                <Bell className="h-5 w-5" />
                {pendingCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FFB020] text-[#7A5000] border-none font-bold text-xs shadow-sm">
                    {pendingCount}
                  </Badge>
                )}
              </Button>

              <div className="flex items-center gap-2 pl-3 border-l">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#0056D2] to-[#003B91] flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  AD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
