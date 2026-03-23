import { Outlet, Link, useLocation } from "react-router";
import { Home, PlusCircle, History, User } from "lucide-react";

export function MobileLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/mobile", icon: Home },
    { name: "Report", path: "/mobile/report", icon: PlusCircle },
    { name: "History", path: "/mobile/history", icon: History },
    { name: "Profile", path: "/mobile/profile", icon: User },
  ];

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-gray-100 overflow-hidden">
      <div className="relative w-full h-full md:max-w-[420px] bg-gray-50 flex flex-col overflow-hidden md:shadow-2xl">
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-[80px]">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 pt-2 px-6 pb-6 md:pb-8 flex justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 min-w-[64px] ${
                  isActive ? "text-[#E3000F]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-[#E3000F]/10 scale-110" : "bg-transparent scale-100"}`}>
                  <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-[#E3000F]" : "text-gray-500"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
