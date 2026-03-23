import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "figma:asset/4558e936a223c460ebc16418eb91c5d11f0dc10e.png";

export function MobileLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      navigate("/mobile");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Logo/Icon */}
        <div className="mb-8 flex flex-col items-center">
          <ImageWithFallback 
            src={logoImage}
            alt="Logo"
            className="h-24 w-24 rounded-[1.75rem] object-cover mb-5 shadow-md shadow-gray-200"
          />
          <h1 className="text-3xl font-black text-gray-900 tracking-tight text-center">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-medium mt-2 text-center">
            Log in to SendResqPls to report and track emergencies.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#3370D9]/50 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#3370D9]/50 focus:bg-white rounded-2xl pl-12 pr-12 py-4 text-base font-medium text-gray-900 outline-none transition-colors"
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

          <div className="flex justify-end pb-2">
            <button type="button" className="text-sm font-bold text-[#3370D9]">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3370D9] hover:bg-[#285bb3] text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-[0_8px_20px_rgb(51,112,217,0.2)] active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                Log In
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/mobile/signup" className="text-[#E3000F] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
