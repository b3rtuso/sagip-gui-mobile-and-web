import { AlertTriangle, MapPin, ChevronRight, Flame, Waves, HeartPulse, Phone } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../store";

export function MobileHome() {
  const incidents = useStore((state) => state.incidents);
  const myIncidents = incidents.filter(i => i.reportedBy.name === "Juan Dela Cruz" || i.reportedBy.name === "Current User");

  return (
    <div className="flex flex-col min-h-full">
      {/* Header section */}
      <div className="bg-[#3370D9] pt-8 md:pt-14 pb-8 px-6 rounded-b-[2.5rem] shadow-xl shadow-blue-900/10 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <p className="text-blue-100 text-sm font-medium opacity-90">Welcome back,</p>
            <h1 className="text-3xl font-bold tracking-tight">Juan</h1>
          </div>
          <div className="h-14 w-14 rounded-full border-[3px] border-white/20 bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center font-bold text-xl backdrop-blur-sm shadow-inner">
            JD
          </div>
        </div>

        {/* Emergency SOS Button */}
        <Link 
          to="/mobile/report"
          className="relative z-10 w-full bg-[#E3000F] hover:bg-[#c2000d] transition-all rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-[0_8px_30px_rgb(227,0,15,0.4)] active:scale-[0.98]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75" />
            <div className="relative h-20 w-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <AlertTriangle className="h-10 w-10 text-white drop-shadow-md" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white drop-shadow-sm">Send Emergency Alert</h2>
            <p className="text-sm text-red-100 mt-1 font-medium">Tap to send an instant alert</p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="px-6 py-8 flex-1 flex flex-col gap-8 pb-32">
        
        {/* Emergency Hotlines */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4 text-lg">Emergency Hotlines</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:911" className="bg-white p-4 rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
              <div className="h-10 w-10 rounded-full bg-red-50 text-[#E3000F] flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900">National Emergency</div>
                <div className="text-[#E3000F] font-black text-lg mt-0.5">911</div>
              </div>
            </a>
            <a href="tel:143" className="bg-white p-4 rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-[#3370D9] flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900">Red Cross</div>
                <div className="text-[#3370D9] font-black text-lg mt-0.5">143</div>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Tips */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4 text-lg">Quick Tips</h3>
          <div className="flex flex-col gap-3">
            <div className="bg-white p-4 rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Fire Emergency</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">Stay low to avoid smoke. Check doors for heat before opening. Use the stairs, never the elevator.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Waves className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Flood Warning</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">Move immediately to higher ground. Do not walk or drive through flood waters. Turn off utilities.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-red-50 text-[#E3000F] flex items-center justify-center flex-shrink-0 mt-0.5">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Medical Emergency</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">Do not move the injured person unless in immediate danger. Apply pressure to bleeding wounds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-900 font-bold text-lg">Recent Reports</h3>
            <Link to="/mobile/history" className="text-sm text-[#3370D9] font-semibold flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {myIncidents.length === 0 ? (
              <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 text-center text-gray-500 text-sm shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                You have no active reports. Stay safe!
              </div>
            ) : (
              myIncidents.slice(0, 3).map((incident) => (
                <Link key={incident.id} to="/mobile/history" className="bg-white p-4 rounded-[1.25rem] border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex gap-4 items-center block active:bg-gray-50 transition-colors">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    incident.status === "pending" ? "bg-amber-100 text-amber-600" :
                    incident.status === "resolved" ? "bg-green-100 text-green-600" :
                    "bg-blue-100 text-[#3370D9]"
                  }`}>
                    <AlertTriangle className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-base">{incident.title}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1 truncate font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      {incident.location.barangay}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs font-bold capitalize px-3 py-1.5 rounded-lg ${
                      incident.status === "pending" ? "bg-amber-50 text-amber-700" :
                      incident.status === "resolved" ? "bg-green-50 text-green-700" :
                      "bg-blue-50 text-[#3370D9]"
                    }`}>
                      {incident.status.replace("_", " ")}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
