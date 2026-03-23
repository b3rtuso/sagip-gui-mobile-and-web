import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TriangleAlert,
  MapPin,
  Phone,
  Clock,
  Users,
  ArrowLeft,
  User,
  PhoneCall,
  CircleCheck,
  Circle,
  Send,
  Truck,
  Flag,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CallResult, RequestStatus } from "../types/incident";
import { useStore } from "../store";

export function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incidents = useStore((state) => state.incidents);
  const mockTeams = useStore((state) => state.teams);
  const updateIncidentStatus = useStore((state) => state.updateIncidentStatus);
  const updateIncidentDetails = useStore((state) => state.updateIncidentDetails);
  const addCallLog = useStore((state) => state.addCallLog);
  const incident = incidents.find((i) => i.id === id);
  
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [callResult, setCallResult] = useState<string>("");
  const [callNotes, setCallNotes] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    type: "",
    priority: "",
  });

  if (!incident) {
    return (
      <div className="text-center py-12">
        <TriangleAlert className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Request not found</p>
        <Button onClick={() => navigate("/requests")} className="mt-4 rounded-xl">
          Back to Requests
        </Button>
      </div>
    );
  }

  const selectedDeptData = mockTeams.find((t) => t.id === selectedDept);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-[#E3000F]";
      case "high": return "bg-[#FF7A00]";
      case "medium": return "bg-[#FFB020]";
      case "low": return "bg-[#00A699]";
      default: return "bg-gray-500";
    }
  };

  const getCallResultColor = (result: string) => {
    switch (result) {
      case "accepted": return "bg-[#00A699] text-white";
      case "no_response": return "bg-[#E3000F] text-white";
      case "pending": return "bg-[#FFB020] text-white";
      case "declined": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "update": return <Circle className="h-4 w-4" />;
      case "department_called": return <PhoneCall className="h-4 w-4" />;
      case "dispatched": return <Send className="h-4 w-4" />;
      case "arrived": return <Truck className="h-4 w-4" />;
      case "resolved": return <Flag className="h-4 w-4" />;
      case "status_change": return <CircleCheck className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case "update": return "bg-gray-400";
      case "department_called": return "bg-[#0056D2]";
      case "dispatched": return "bg-[#003B91]";
      case "arrived": return "bg-[#002255]";
      case "resolved": return "bg-[#00A699]";
      default: return "bg-gray-400";
    }
  };

  const handleMarkAsCalled = () => {
    if (!selectedDeptData) return;
    const phoneNumber = selectedDeptData.contactNumber.replace(/[^0-9+]/g, "");
    window.open(`tel:${phoneNumber}`, "_self");
    toast.success(`Calling ${selectedDeptData.abbreviation} — ${selectedDeptData.contactNumber}`);
  };

  const handleSaveCallLog = () => {
    if (!selectedDept || !callResult) {
      toast.error("Please select a department and call result");
      return;
    }
    const dept = mockTeams.find(t => t.id === selectedDept);
    if (dept && id) {
      addCallLog(id, {
        departmentId: dept.id,
        departmentName: dept.abbreviation,
        timestamp: new Date().toISOString(),
        result: callResult as CallResult,
        notes: callNotes || "No additional notes provided.",
        calledBy: "Admin User",
      });
      toast.success("Call log saved successfully");
      setCallResult("");
      setCallNotes("");
      setSelectedDept("");
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (id) {
      updateIncidentStatus(id, newStatus as RequestStatus, "Admin User");
      toast.success(`Status updated to ${getStatusLabel(newStatus)}`);
    }
  };

  const handleEditInit = () => {
    if (incident) {
      setEditData({
        title: incident.title,
        type: incident.type,
        priority: incident.priority,
      });
      setIsEditing(true);
    }
  };

  const handleSaveEdits = () => {
    if (id) {
      updateIncidentDetails(id, {
        title: editData.title,
        type: editData.type as any,
        priority: editData.priority as any,
      });
      setIsEditing(false);
      toast.success("Incident details updated successfully");
    }
  };

  const handleProcessTriage = () => {
    if (id) {
      updateIncidentDetails(id, {
        type: editData.type as any,
        priority: editData.priority as any,
        title: editData.title || "Emergency Assessment",
      });
      setIsEditing(false);
      toast.success("Emergency request has been processed and classified.");
    }
  };

  const isUnidentified = incident.type === "unidentified";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl mt-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-mono text-gray-500">{incident.id}</span>
            <Badge className={getStatusColor(incident.status)}>
              {getStatusLabel(incident.status)}
            </Badge>
            <Badge className={`${getPriorityColor(incident.priority)} text-white`}>
              {incident.priority}
            </Badge>
            <Badge variant="outline" className="capitalize">{incident.type}</Badge>
            {incident.type === "unidentified" && (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 animate-pulse">Needs Assessment</Badge>
            )}
          </div>
          {isEditing && !isUnidentified ? (
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="text" 
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="text-lg font-bold text-gray-900 border rounded-lg px-2 py-1 flex-1"
              />
              <select
                value={editData.type}
                onChange={(e) => setEditData({...editData, type: e.target.value})}
                className="border rounded-lg px-2 py-1 text-sm capitalize"
              >
                {['fire', 'flood', 'accident', 'medical', 'earthquake', 'landslide', 'typhoon', 'unidentified', 'other'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({...editData, priority: e.target.value})}
                className="border rounded-lg px-2 py-1 text-sm capitalize"
              >
                {['low', 'medium', 'high', 'critical'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <Button size="sm" onClick={handleSaveEdits} className="bg-green-600 hover:bg-green-700">Save</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : !isUnidentified ? (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{incident.title}</h1>
              <Button variant="ghost" size="sm" onClick={handleEditInit} className="text-[#0056D2] h-7 px-2 hover:bg-blue-50">
                Edit Details
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{incident.title}</h1>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Request Info + Call Department + Call Logging */}
        <div className="lg:col-span-2 space-y-6">

          {isUnidentified && (
            <Card className="rounded-2xl shadow-lg border-2 border-red-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
              <CardHeader className="bg-red-50 pb-4 border-b border-red-100">
                <CardTitle className="text-xl flex items-center gap-2 text-red-800">
                  <TriangleAlert className="h-6 w-6 text-red-600" />
                  Action Required: Process Emergency
                </CardTitle>
                <p className="text-sm text-red-600 mt-1">
                  This request was sent as a quick alert. Please review the attached media and location, then classify the emergency.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <Label className="font-bold text-gray-700">Emergency Type</Label>
                    <Select 
                      value={editData.type || incident.type} 
                      onValueChange={(val) => setEditData({...editData, type: val})}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 h-12">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fire">🔥 Fire</SelectItem>
                        <SelectItem value="flood">🌊 Flood</SelectItem>
                        <SelectItem value="accident">🚗 Accident</SelectItem>
                        <SelectItem value="medical">🚑 Medical</SelectItem>
                        <SelectItem value="earthquake">🏚️ Earthquake</SelectItem>
                        <SelectItem value="landslide">⛰️ Landslide</SelectItem>
                        <SelectItem value="typhoon">🌀 Typhoon</SelectItem>
                        <SelectItem value="other">❓ Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label className="font-bold text-gray-700">Severity Level</Label>
                    <Select 
                      value={editData.priority || incident.priority} 
                      onValueChange={(val) => setEditData({...editData, priority: val})}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 h-12">
                        <SelectValue placeholder="Select priority..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical" className="text-red-600 font-bold">Critical</SelectItem>
                        <SelectItem value="high" className="text-orange-500 font-bold">High</SelectItem>
                        <SelectItem value="medium" className="text-yellow-600 font-bold">Medium</SelectItem>
                        <SelectItem value="low" className="text-green-600 font-bold">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label className="font-bold text-gray-700">Set Title</Label>
                    <input 
                      type="text" 
                      placeholder="e.g. House Fire in Poblacion I"
                      value={editData.title || (incident.title !== 'Unidentified Emergency' ? incident.title : '')}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleProcessTriage} 
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-md"
                  disabled={!editData.type || editData.type === 'unidentified' || !editData.priority}
                >
                  <CircleCheck className="mr-2 h-5 w-5" />
                  Confirm Classification & Process
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Section 1: Request Information */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{incident.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Reported By</p>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-gray-400" />{incident.reportedBy.name}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />{incident.reportedBy.contact}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />{incident.location.barangay}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Affected</p>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-gray-400" />{incident.affectedPersons} persons
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Reported {new Date(incident.reportedAt).toLocaleString("en-PH")}
                {" · "}
                {incident.location.address}
              </div>

              {incident.images && incident.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-gray-900 mb-2">Attached Media Evidence</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {incident.images.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative">
                         {img === "mock-image-url" ? (
                           <img src="https://images.unsplash.com/photo-1628187895475-6014e3650058?q=80&w=600&auto=format&fit=crop" alt="Evidence" className="w-full h-full object-cover" />
                         ) : (
                           <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                         )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Call Department Panel */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-blue-500" />
                Call Department
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Department</Label>
                  <Select value={selectedDept} onValueChange={setSelectedDept}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose a department..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeams.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.abbreviation} — {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDeptData && (
                  <div className="p-4 bg-[#0056D2]/5 rounded-xl border border-[#0056D2]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-[#0056D2]">{selectedDeptData.abbreviation}</span>
                      <Badge className={`text-xs ${
                        selectedDeptData.status === "available" ? "bg-[#00A699] text-white" :
                        selectedDeptData.status === "deployed" ? "bg-[#0056D2] text-white" :
                        "bg-[#FFB020] text-[#7A5000]"
                      }`}>{selectedDeptData.status}</Badge>
                    </div>
                    <p className="text-sm text-blue-800">{selectedDeptData.headOfficer}</p>
                    <p className="text-lg font-mono font-bold text-[#0056D2] mt-1">{selectedDeptData.contactNumber}</p>
                    <Button 
                      onClick={handleMarkAsCalled}
                      className="w-full mt-3 bg-[#00A699] hover:bg-[#008A7E] rounded-xl text-white"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call {selectedDeptData.abbreviation}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Call Logging Form */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Log Call Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time of Call</Label>
                  <Input
                    value={new Date().toLocaleString("en-PH")}
                    readOnly
                    className="rounded-xl bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Call Result</Label>
                  <Select value={callResult} onValueChange={setCallResult}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select result..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="no_response">No Response</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Enter call notes..."
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <Button onClick={handleSaveCallLog} className="rounded-xl">
                Save Call Log
              </Button>
            </CardContent>
          </Card>

          {/* Previous Call Logs for this request */}
          {incident.callLogs.length > 0 && (
            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Call History ({incident.callLogs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incident.callLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="h-9 w-9 rounded-xl bg-[#0056D2]/10 flex items-center justify-center flex-shrink-0">
                        <PhoneCall className="h-4 w-4 text-[#0056D2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm">{log.departmentName}</span>
                          <Badge className={getCallResultColor(log.result)}>{log.result.replace("_", " ")}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{log.notes}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(log.timestamp).toLocaleString("en-PH")} · by {log.calledBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column — Call Timeline + Status Update */}
        <div className="space-y-6">
          {/* Call Timeline */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {incident.updates.map((update, index) => (
                  <div key={update.id} className="flex gap-3 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full ${getTimelineColor(update.type)} flex items-center justify-center text-white flex-shrink-0`}>
                        {getTimelineIcon(update.type)}
                      </div>
                      {index < incident.updates.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm text-gray-900">{update.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {new Date(update.timestamp).toLocaleString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-500">{update.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Update Panel */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "pending", label: "Pending", color: "bg-[#FFB020] hover:bg-[#E09900] text-[#7A5000]" },
                  { value: "called", label: "Called", color: "bg-[#0056D2]/20 hover:bg-[#0056D2]/30 text-[#0056D2]" },
                  { value: "dispatched", label: "Dispatched", color: "bg-[#0056D2] hover:bg-[#0047B3] text-white" },
                  { value: "en_route", label: "En Route", color: "bg-[#003B91] hover:bg-[#002B6B] text-white" },
                  { value: "arrived", label: "Arrived", color: "bg-[#002255] hover:bg-[#001538] text-white" },
                  { value: "resolved", label: "Resolved", color: "bg-[#00A699] hover:bg-[#008A7E] text-white" },
                ].map((s) => (
                  <Button
                    key={s.value}
                    onClick={() => handleStatusChange(s.value)}
                    className={`${s.color} text-white rounded-xl text-sm ${incident.status === s.value ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                    size="sm"
                  >
                    {s.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Current: <span className="font-medium">{getStatusLabel(incident.status)}</span>
              </p>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900">{incident.affectedPersons}</p>
                  <p className="text-xs text-gray-500">Affected</p>
                </div>
                <div className="text-center p-3 bg-[#FF7A00]/10 rounded-xl">
                  <p className="text-xl font-bold text-[#FF7A00]">{incident.injuries || 0}</p>
                  <p className="text-xs text-gray-500">Injuries</p>
                </div>
                <div className="text-center p-3 bg-[#E3000F]/10 rounded-xl">
                  <p className="text-xl font-bold text-[#E3000F]">{incident.casualties || 0}</p>
                  <p className="text-xs text-gray-500">Casualties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Department */}
          {incident.assignedDepartment && (() => {
            const dept = mockTeams.find(t => t.id === incident.assignedDepartment);
            if (!dept) return null;
            return (
              <Card className="rounded-2xl shadow-sm border-0 border-l-4 border-l-[#0056D2]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Lead Department</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{dept.abbreviation}</span>
                    <Badge className="bg-[#0056D2] text-white text-xs">{dept.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{dept.name}</p>
                  <p className="text-sm text-gray-500">{dept.headOfficer}</p>
                  <p className="text-sm font-mono font-semibold">{dept.contactNumber}</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => {
                      const num = dept.contactNumber.replace(/[^0-9+]/g, "");
                      window.open(`tel:${num}`, "_self");
                    }}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call {dept.abbreviation}
                  </Button>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

function Input({ value, readOnly, className }: { value: string; readOnly?: boolean; className?: string }) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className || ""}`}
    />
  );
}
