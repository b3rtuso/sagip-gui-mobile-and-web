import { useStore } from "../../store";
import { CircleCheck, Clock, Truck, MapPin } from "lucide-react";

export function MobileHistory() {
  const incidents = useStore((state) => state.incidents);
  const myIncidents = incidents.filter(i => i.reportedBy.name === "Juan Dela Cruz" || i.reportedBy.name === "Current User");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CircleCheck className="h-6 w-6 text-green-500" />;
      case "en_route": 
      case "dispatched":
      case "arrived":
        return <Truck className="h-6 w-6 text-[#3370D9]" />;
      default:
        return <Clock className="h-6 w-6 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-50 text-green-700 border-green-200 shadow-green-100";
      case "en_route": 
      case "dispatched":
      case "arrived":
        return "bg-blue-50 text-[#3370D9] border-blue-200 shadow-blue-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100";
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-32">
      <div className="bg-white pt-8 md:pt-14 pb-6 px-6 sticky top-0 z-20 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Report History</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Track your active and past alerts</p>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {myIncidents.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No History Found</h3>
            <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">
              You haven't made any emergency reports yet. Your submitted reports will appear here.
            </p>
          </div>
        ) : (
          myIncidents.map(incident => (
            <div key={incident.id} className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-gray-100 transition-all active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-2xl flex-shrink-0 ${
                    incident.status === 'resolved' ? 'bg-green-50' : 
                    ['en_route','dispatched','arrived'].includes(incident.status) ? 'bg-blue-50' : 
                    'bg-amber-50'
                  }`}>
                    {getStatusIcon(incident.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight mb-1">{incident.title}</h3>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {incident.location.barangay}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reported On</span>
                  <span className="text-xs font-semibold text-gray-600 mt-0.5">
                    {new Date(incident.reportedAt).toLocaleDateString()} • {new Date(incident.reportedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl border ${getStatusColor(incident.status)} shadow-sm`}>
                  {incident.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
