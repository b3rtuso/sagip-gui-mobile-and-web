import { useState } from "react";
import { AlertTriangle, MapPin, Camera, Image as ImageIcon, Loader2, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useStore } from "../../store";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { IncidentType, Priority } from "../../types/incident";

export function MobileReport() {
  const addIncident = useStore((state) => state.addIncident);
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);

  const handleCaptureImage = () => {
    // Simulate capturing an image
    setHasImage(true);
    toast.success("Image captured successfully");
  };

  const handleAddLocation = () => {
    // Simulate getting GPS location
    setHasLocation(true);
    toast.success("Location acquired: Poblacion I, Balayan");
  };

  const handleSubmit = () => {
    if (!hasLocation) {
      toast.error("Please add a location so responders can find you");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      addIncident({
        id: `inc-${Date.now()}`,
        type: "unidentified",
        title: "Unidentified Emergency",
        description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
        location: {
          address: "123 Balayan Street, Poblacion I",
          coordinates: { lat: 13.9388, lng: 120.7303 },
          barangay: "Poblacion I",
        },
        reportedBy: {
          name: "Current User",
          contact: "+63 912 345 6789"
        },
        reportedAt: new Date().toISOString(),
        status: "pending",
        priority: "high", // Default high until triaged
        affectedPersons: 0,
        callLogs: [],
        images: hasImage ? ["mock-image-url"] : [],
        updates: [{
          id: `upd-${Date.now()}`,
          timestamp: new Date().toISOString(),
          message: "Report received via mobile app (Quick Alert).",
          author: "System",
          type: "update"
        }]
      });
      
      toast.success("Emergency reported successfully");
      setIsSubmitting(false);
      navigate("/mobile/history");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 relative">
      {/* App Bar */}
      <div className="bg-white pt-8 md:pt-14 pb-4 px-4 sticky top-0 z-20 border-b border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex items-center gap-3">
        <Link to="/mobile" className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
          <ChevronLeft className="h-7 w-7 text-gray-800" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 flex items-center gap-2 tracking-tight">
            Quick SOS Alert
          </h1>
          <p className="text-sm font-medium text-gray-500">MDRRMO will assess & dispatch</p>
        </div>
      </div>

      <div className="px-6 py-8 flex flex-col gap-6 flex-1">
        
        {/* Helper Text */}
        <div className="text-center space-y-2 mb-4">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-[#E3000F]" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Need Help Fast?</h2>
          <p className="text-gray-500 font-medium">
            Just capture what you see and share your location. Our MDRRMO staff will classify the emergency and dispatch the right teams immediately.
          </p>
        </div>

        {/* Capture Image Button */}
        <button
          type="button"
          onClick={handleCaptureImage}
          className={`relative overflow-hidden w-full border-[3px] rounded-[1.5rem] py-8 flex flex-col items-center justify-center gap-3 transition-colors shadow-sm ${
            hasImage 
              ? "border-green-500 bg-green-50 text-green-700" 
              : "border-dashed border-[#3370D9]/30 bg-white text-[#3370D9] hover:bg-[#3370D9]/5 active:bg-[#3370D9]/10"
          }`}
        >
          {hasImage ? (
            <>
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1628187895475-6014e3650058?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 mb-2">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-lg font-bold">Image Captured</span>
                <span className="text-sm font-semibold opacity-80">Tap to retake</span>
              </div>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-[#3370D9]/10 flex items-center justify-center">
                <Camera className="h-8 w-8 text-[#3370D9]" />
              </div>
              <div className="text-center">
                <span className="text-lg font-extrabold block">Capture Image</span>
                <span className="text-sm font-medium opacity-80">Show us the situation</span>
              </div>
            </>
          )}
        </button>

        {/* Add Location Button */}
        <button
          type="button"
          onClick={handleAddLocation}
          className={`w-full border-[3px] rounded-[1.5rem] py-8 flex flex-col items-center justify-center gap-3 transition-colors shadow-sm ${
            hasLocation 
              ? "border-green-500 bg-green-50 text-green-700" 
              : "border-dashed border-[#E3000F]/30 bg-white text-[#E3000F] hover:bg-[#E3000F]/5 active:bg-[#E3000F]/10"
          }`}
        >
          {hasLocation ? (
            <>
              <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 mb-2">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <span className="text-lg font-bold">Location Added</span>
              <span className="text-sm font-semibold opacity-80">Poblacion I, Balayan</span>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-[#E3000F]/10 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-[#E3000F]" />
              </div>
              <div className="text-center">
                <span className="text-lg font-extrabold block">Pin Location</span>
                <span className="text-sm font-medium opacity-80">Share your exact GPS</span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 mt-auto w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 z-30 shadow-[0_-10px_30px_rgb(0,0,0,0.05)]">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || !hasLocation}
          className="w-full bg-[#E3000F] hover:bg-[#c2000d] text-white rounded-[1.25rem] py-5 font-black text-lg flex items-center justify-center gap-3 shadow-[0_8px_20px_rgb(227,0,15,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Transmitting...
            </>
          ) : (
            <>
              <AlertTriangle className="h-6 w-6" />
              SEND EMERGENCY ALERT
            </>
          )}
        </button>
        {!hasLocation && (
          <p className="text-center text-xs text-red-500 font-bold mt-3">
            * Location is required to send alert
          </p>
        )}
      </div>
    </div>
  );
}
