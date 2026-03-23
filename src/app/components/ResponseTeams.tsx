import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Phone, Package, MapPin, Building2, User, Shield } from "lucide-react";
import { useStore } from "../store";
import { toast } from "sonner";

export function ResponseTeams() {
  const mockTeams = useStore((state) => state.teams);
  const mockIncidents = useStore((state) => state.incidents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-[#00A699] text-white";
      case "deployed": return "bg-[#0056D2] text-white";
      case "standby": return "bg-[#FFB020] text-[#7A5000]";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fire": return "text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/20";
      case "police": return "text-[#0056D2] bg-[#0056D2]/10 border-[#0056D2]/20";
      case "medical": return "text-[#E3000F] bg-[#E3000F]/10 border-[#E3000F]/20";
      case "rescue": return "text-[#00A699] bg-[#00A699]/10 border-[#00A699]/20";
      case "engineering": return "text-[#996A00] bg-[#FFB020]/10 border-[#FFB020]/20";
      case "social_welfare": return "text-purple-600 bg-purple-50 border-purple-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "fire": return "Fire Response";
      case "police": return "Law Enforcement";
      case "medical": return "Medical Services";
      case "rescue": return "Rescue & Response";
      case "engineering": return "Engineering & Infrastructure";
      case "social_welfare": return "Social Welfare";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Responding Departments</h1>
          <p className="text-gray-500 mt-1">Government agencies and offices coordinated by MDRRMO for disaster response</p>
        </div>
        <Button onClick={() => toast.success("Opening Add Department modal...")}>Add Department</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-3xl font-bold text-[#00A699]">
                  {mockTeams.filter((t) => t.status === "available").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00A699]/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#00A699]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Currently Deployed</p>
                <p className="text-3xl font-bold text-[#0056D2]">
                  {mockTeams.filter((t) => t.status === "deployed").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#0056D2]/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#0056D2]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Standby</p>
                <p className="text-3xl font-bold text-[#FFB020]">
                  {mockTeams.filter((t) => t.status === "standby").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#FFB020]/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#996A00]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeams.map((dept) => {
          const currentIncident = dept.currentIncident
            ? mockIncidents.find((i) => i.id === dept.currentIncident)
            : null;

          return (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">{dept.abbreviation}</span>
                      <Badge className={getStatusColor(dept.status)}>
                        {dept.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{dept.name}</CardTitle>
                    <Badge variant="outline" className={`mt-2 ${getTypeColor(dept.type)}`}>
                      {getTypeLabel(dept.type)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{dept.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Head Officer</p>
                      <p className="font-medium">{dept.headOfficer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Contact</p>
                      <p className="font-medium">{dept.contactNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">{dept.members}</span> personnel
                </div>

                {currentIncident && (
                  <div className="p-3 bg-[#0056D2]/5 rounded-lg border border-[#0056D2]/20">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-[#0056D2] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#0056D2]">Currently Responding To</p>
                        <p className="text-xs text-blue-800 mt-0.5">{currentIncident.title}</p>
                        <p className="text-xs text-blue-700 mt-0.5">{currentIncident.location.barangay}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    Equipment & Resources
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {dept.equipment.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm" onClick={() => toast.success(`Viewing details for ${dept.abbreviation}`)}>
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm" onClick={() => {
                    const phoneNumber = dept.contactNumber.replace(/[^0-9+]/g, "");
                    window.open(`tel:${phoneNumber}`, "_self");
                  }}>
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
