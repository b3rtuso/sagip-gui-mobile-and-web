import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  AlertTriangle, 
  CircleCheck, 
  Clock,
  MapPin,
  ArrowRight,
  Radio,
  FileText,
  Send,
  PhoneCall,
} from "lucide-react";
import { monthlyIncidentHistory } from "../data/mockData";
import { Link } from "react-router";
import { toast } from "sonner";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { useStore } from "../store";

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const mockIncidents = useStore((state) => state.incidents);
  const mockTeams = useStore((state) => state.teams);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalRequests = mockIncidents.length;
  const pendingRequests = mockIncidents.filter(i => i.status === "pending").length;
  const dispatchedRequests = mockIncidents.filter(i => 
    i.status === "dispatched" || i.status === "en_route" || i.status === "arrived" || i.status === "called"
  ).length;
  const completedRequests = mockIncidents.filter(i => i.status === "resolved").length;

  const recentTrend = monthlyIncidentHistory.slice(-6).map((item, idx) => ({
    ...item,
    id: `trend-${idx}`,
    name: item.month
  }));

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

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-[#E3000F]";
      case "high": return "bg-[#FF7A00]";
      case "medium": return "bg-[#FFB020]";
      case "low": return "bg-[#00A699]";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {currentTime.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            <span className="font-mono">{currentTime.toLocaleTimeString("en-PH")}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFB020]/10 border border-[#FFB020]/30 rounded-xl text-sm text-[#996A00] font-medium">
            <Radio className="h-4 w-4 animate-pulse" />
            {pendingRequests} pending
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm border-0 bg-white">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0 bg-white">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-[#996A00] mt-1">{pendingRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#FFB020]/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-[#996A00]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0 bg-white">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Dispatched</p>
                <p className="text-3xl font-bold text-[#0056D2] mt-1">{dispatchedRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#0056D2]/10 flex items-center justify-center">
                <Send className="h-6 w-6 text-[#0056D2]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0 bg-white">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-[#00A699] mt-1">{completedRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#00A699]/10 flex items-center justify-center">
                <CircleCheck className="h-6 w-6 text-[#00A699]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 rounded-2xl shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Requests Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={recentTrend} key="requests-barchart" id="dashboard-bar" accessibilityLayer={false}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis" id="dashboard-x" dataKey="month" tick={{ fontSize: 12 }} tickFormatter={(v) => v.split(" ")[0]} />
                <YAxis key="yaxis" id="dashboard-y" tick={{ fontSize: 12 }} />
                <Tooltip key="tooltip" />
                <Legend key="legend" />
                <Bar key="bar-total" dataKey="total" fill="#0056D2" name="Total Requests" radius={[6, 6, 0, 0]} />
                <Bar key="bar-resolved" dataKey="resolved" fill="#00A699" name="Completed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Status */}
        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Department Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {mockTeams.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{dept.abbreviation}</p>
                    <p className="text-xs text-gray-500 truncate">{dept.headOfficer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${dept.contactNumber.replace(/[^0-9+]/g, "")}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#00A699] hover:bg-[#00A699]/10" onClick={() => toast.success(`Calling ${dept.headOfficer}...`)}>
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </a>
                    <Badge className={`text-xs ${
                      dept.status === "available" ? "bg-[#00A699] text-white" :
                      dept.status === "deployed" ? "bg-[#0056D2] text-white" :
                      "bg-[#FFB020] text-[#7A5000]"
                    }`}>
                      {dept.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests Table */}
      <Card className="rounded-2xl shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Recent Requests</CardTitle>
          <Link to="/requests">
            <Button variant="outline" size="sm" className="rounded-xl">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Request ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Time Reported</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockIncidents.slice(0, 8).map((req) => (
                  <tr key={req.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3">
                      <Link to={`/requests/${req.id}`} className="font-mono text-xs text-[#0056D2] hover:underline font-semibold">
                        {req.id}
                      </Link>
                    </td>
                    <td className="py-3">{req.reportedBy.name}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${getPriorityDot(req.priority)}`} />
                        <span className="capitalize">{req.type}</span>
                        {req.type === "unidentified" && (
                          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Needs Assessment"></span>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-3.5 w-3.5" />{req.location.barangay}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(req.reportedAt).toLocaleString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge className={getStatusColor(req.status)}>
                        {getStatusLabel(req.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
