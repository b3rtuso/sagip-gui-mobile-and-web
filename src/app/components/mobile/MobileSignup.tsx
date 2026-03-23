import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, Phone, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react";

export function MobileSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      navigate("/mobile");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-10">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            Sign up to report emergencies securely.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 flex-1 flex flex-col">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E3000F]/50 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
                placeholder="Juan Dela Cruz"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E3000F]/50 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
                placeholder="+63 900 000 0000"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E3000F]/50 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
                placeholder="juan@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E3000F]/50 focus:bg-white rounded-2xl pl-12 pr-12 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-auto pt-8 pb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E3000F] hover:bg-[#c2000d] text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-[0_8px_20px_rgb(227,0,15,0.2)] active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Create Account
                  <CheckCircle className="h-5 w-5" />
                </>
              )}
            </button>
            <div className="mt-6 text-center">
              <p className="text-gray-500 font-medium">
                Already have an account?{" "}
                <Link to="/mobile/login" className="text-[#3370D9] font-bold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
