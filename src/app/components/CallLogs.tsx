import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
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
  PhoneCall,
  PhoneOff,
  PhoneMissed,
  Clock,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../store";

export function CallLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const incidents = useStore((state) => state.incidents);
  const mockTeams = useStore((state) => state.teams);
  const allCallLogs = incidents.flatMap(inc => inc.callLogs);

  const sortedLogs = [...allCallLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredLogs = sortedLogs.filter((log) => {
    const matchesSearch = 
      log.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || log.departmentId === deptFilter;
    const matchesResult = resultFilter === "all" || log.result === resultFilter;
    return matchesSearch && matchesDept && matchesResult;
  });

  const getResultColor = (result: string) => {
    switch (result) {
      case "accepted": return "bg-[#00A699] text-white";
      case "no_response": return "bg-[#E3000F] text-white";
      case "pending": return "bg-[#FFB020] text-[#7A5000]";
      case "declined": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "accepted": return <PhoneCall className="h-4 w-4" />;
      case "no_response": return <PhoneMissed className="h-4 w-4" />;
      case "declined": return <PhoneOff className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Stats
  const totalCalls = allCallLogs.length;
  const acceptedCalls = allCallLogs.filter(l => l.result === "accepted").length;
  const noResponseCalls = allCallLogs.filter(l => l.result === "no_response").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Call Logs</h1>
        <p className="text-gray-500 text-sm mt-0.5">History of all department calls made for emergency requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm text-gray-500">Total Calls</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalCalls}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm text-gray-500">Accepted</p>
            <p className="text-3xl font-bold text-[#00A699] mt-1">{acceptedCalls}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm text-gray-500">No Response</p>
            <p className="text-3xl font-bold text-[#E3000F] mt-1">{noResponseCalls}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm text-gray-500">Acceptance Rate</p>
            <p className="text-3xl font-bold text-[#0056D2] mt-1">{totalCalls > 0 ? ((acceptedCalls / totalCalls) * 100).toFixed(0) : 0}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by request ID, department, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl bg-gray-50"
              />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {mockTeams.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.abbreviation}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="w-[150px] rounded-xl">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="no_response">No Response</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Call Logs Table */}
      <Card className="rounded-2xl shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{filteredLogs.length} Call Log{filteredLogs.length !== 1 ? "s" : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No call logs found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${
                    log.result === "accepted" ? "bg-[#00A699]" :
                    log.result === "no_response" ? "bg-[#E3000F]" :
                    log.result === "declined" ? "bg-gray-500" :
                    "bg-[#FFB020]"
                  }`}>
                    {getResultIcon(log.result)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{log.departmentName}</span>
                      <Badge className={getResultColor(log.result)}>{log.result.replace("_", " ")}</Badge>
                      <Link to={`/requests/${log.requestId}`} className="text-xs font-mono text-[#0056D2] hover:underline ml-auto">
                        {log.requestId}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">{log.notes}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(log.timestamp).toLocaleString("en-PH")}
                      </span>
                      <span>by {log.calledBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
