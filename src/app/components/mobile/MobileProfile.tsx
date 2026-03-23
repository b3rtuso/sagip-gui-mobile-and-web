import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

export function MobileProfile() {
  const navigate = useNavigate();
  const profileMenu = [
    { name: "Account Details", icon: User },
    { name: "Emergency Contacts", icon: Shield },
    { name: "Notification Settings", icon: Settings },
    { name: "Help & Support Center", icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-32">
      <div className="bg-[#3370D9] pt-8 md:pt-16 pb-12 px-6 rounded-b-[2.5rem] text-center shadow-xl shadow-blue-900/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 h-28 w-28 mx-auto rounded-full border-[4px] border-white/20 bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center font-bold text-5xl text-white mb-6 shadow-inner backdrop-blur-sm">
          JD
        </div>
        <h1 className="relative z-10 text-3xl font-extrabold text-white tracking-tight">Juan Dela Cruz</h1>
        <p className="relative z-10 text-blue-100 mt-1.5 font-medium opacity-90">+63 912 345 6789</p>
        <span className="relative z-10 inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
          <Shield className="h-3.5 w-3.5" />
          Verified Resident
        </span>
      </div>

      <div className="px-6 py-4 flex-1 mt-4 relative z-20">
        <div className="bg-white rounded-[1.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          {profileMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.name}
                className={`w-full flex items-center gap-5 p-5 text-left active:bg-gray-50 transition-colors ${
                  index !== profileMenu.length - 1 ? "border-b border-gray-50" : ""
                }`}
                onClick={() => toast.success("Feature coming soon")}
              >
                <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="flex-1 font-bold text-gray-800 text-[15px]">{item.name}</span>
                <ChevronRight className="h-5 w-5 text-gray-300" />
              </button>
            )
          })}
        </div>

        <button 
          className="w-full flex items-center justify-center gap-2.5 p-5 mt-8 text-[#E3000F] font-black text-[15px] bg-white rounded-[1.25rem] shadow-[0_4px_15px_rgb(227,0,15,0.06)] border border-red-100 active:scale-[0.98] transition-all hover:bg-red-50"
          onClick={() => {
            toast.success("Logged out successfully");
            navigate("/mobile/login");
          }}
        >
          <LogOut className="h-5 w-5" />
          LOG OUT SECURELY
        </button>

        {/* Small Admin Link strictly for testing */}
        <div className="mt-10 text-center pb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#3370D9] transition-colors uppercase tracking-wider">
            Switch to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
