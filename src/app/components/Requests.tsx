import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router";
import type { RequestStatus, Priority } from "../types/incident";
import { useStore } from "../store";

export function Requests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const incidents = useStore((state) => state.incidents);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.reportedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.barangay.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-[#FFB020] text-[#7A5000]";
      case "called": return "bg-[#0056D2]/20 text-[#0056D2]";
      case "dispatched": return "bg-[#0056D2] text-white";
      case "en_route": return "bg-[#003B91] text-white";
      case "arrived": return "bg-[#002255] text-white";
      case "resolved": return "bg-[#00A699] text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "called": return "Called";
      case "dispatched": return "Dispatched";
      case "en_route": return "En Route";
      case "arrived": return "Arrived";
      case "resolved": return "Completed";
      default: return status;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "critical": return "text-[#E3000F] bg-[#E3000F]/10 border-[#E3000F]/20";
      case "high": return "text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/20";
      case "medium": return "text-[#996A00] bg-[#FFB020]/10 border-[#FFB020]/30";
      case "low": return "text-[#00A699] bg-[#00A699]/10 border-[#00A699]/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage emergency requests and dispatch departments</p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by ID, name, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl bg-gray-50"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="called">Called</SelectItem>
                <SelectItem value="dispatched">Dispatched</SelectItem>
                <SelectItem value="en_route">En Route</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
                <SelectItem value="resolved">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="landslide">Landslide</SelectItem>
                <SelectItem value="typhoon">Typhoon</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="unidentified">Unidentified / Quick Alert</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{filteredIncidents.length} Request{filteredIncidents.length !== 1 ? "s" : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No requests found matching your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Request ID</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Type of Emergency</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Time Reported</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map((req) => (
                    <tr key={req.id} className="border-b last:border-0 hover:bg-[#0056D2]/5 transition-colors cursor-pointer group">
                      <td className="py-3.5">
                        <Link to={`/requests/${req.id}`} className="font-mono text-xs text-[#0056D2] hover:underline font-medium">
                          {req.id}
                        </Link>
                      </td>
                      <td className="py-3.5">
                        <Link to={`/requests/${req.id}`} className="block">
                          <p className="font-medium text-gray-900">{req.reportedBy.name}</p>
                          <p className="text-xs text-gray-500">{req.reportedBy.contact}</p>
                        </Link>
                      </td>
                      <td className="py-3.5">
                        <Link to={`/requests/${req.id}`} className="block">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`capitalize ${getPriorityColor(req.priority)}`}>
                              {req.priority}
                            </Badge>
                            <span className="capitalize">{req.type}</span>
                            {req.type === "unidentified" && (
                              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Needs Assessment"></span>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="py-3.5">
                        <Link to={`/requests/${req.id}`} className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          {req.location.barangay}
                        </Link>
                      </td>
                      <td className="py-3.5">
                        <Link to={`/requests/${req.id}`} className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                          {new Date(req.reportedAt).toLocaleString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </Link>
                      </td>
                      <td className="py-3.5">
                        <Badge className={getStatusColor(req.status)}>
                          {getStatusLabel(req.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
