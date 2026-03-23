import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "../../assets/logo.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@sendresqpls.gov");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#0056D2]/5 border border-gray-100 overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#0056D2] to-[#E3000F]" />
        
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <ImageWithFallback 
              src={logoImage} 
              alt="SendResqPls Logo"
              className="h-24 w-24 rounded-2xl object-cover mb-4 shadow-md shadow-gray-200" 
            />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SendResqPls</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Operations Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#0056D2] focus:ring-[#0056D2] rounded-xl"
                  placeholder="admin@sendresqpls.gov"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#0056D2] focus:ring-[#0056D2] rounded-xl"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#0056D2] hover:bg-[#0047B3] text-white rounded-xl text-base font-medium transition-all shadow-md shadow-[#0056D2]/20"
            >
              {isLoading ? "Authenticating..." : (
                <span className="flex items-center gap-2">
                  Access Dashboard
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-400">
        Secure Access Portal • MDRRMO
      </p>
    </div>
  );
}
