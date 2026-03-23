import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import { monthlyIncidentHistory, barangayResponseData } from "../data/mockData";
import { TrendingUp, TrendingDown, Activity, Clock, Target, ChartColumn, Download, FileText, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "../store";

export function Analytics() {
  const [activeTab, setActiveTab] = useState<"analytics" | "reports" | "incident_report">("analytics");
  const [incidentType, setIncidentType] = useState<string>("all");
  const [barangayFilter, setBarangayFilter] = useState<string>("all");
  const mockIncidents = useStore((state) => state.incidents);

  // Incident Report form state
  const [reportSummary, setReportSummary] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [outcome, setOutcome] = useState("");
  const [damages, setDamages] = useState("");

  // Analytics data
  const disasterTypeFrequency = [
    { type: "Flood", total: monthlyIncidentHistory.reduce((s, m) => s + m.flood, 0), color: "#3b82f6" },
    { type: "Fire", total: monthlyIncidentHistory.reduce((s, m) => s + m.fire, 0), color: "#ef4444" },
    { type: "Typhoon", total: monthlyIncidentHistory.reduce((s, m) => s + m.typhoon, 0), color: "#10b981" },
    { type: "Medical", total: monthlyIncidentHistory.reduce((s, m) => s + m.medical, 0), color: "#f59e0b" },
    { type: "Landslide", total: monthlyIncidentHistory.reduce((s, m) => s + m.landslide, 0), color: "#8b5cf6" },
    { type: "Accident", total: monthlyIncidentHistory.reduce((s, m) => s + m.accident, 0), color: "#f97316" },
    { type: "Earthquake", total: monthlyIncidentHistory.reduce((s, m) => s + m.earthquake, 0), color: "#6366f1" },
  ].sort((a, b) => b.total - a.total);

  const grandTotal = disasterTypeFrequency.reduce((s, d) => s + d.total, 0);

  const trendData = monthlyIncidentHistory.map((m, idx) => ({
    id: `trend-${idx}`,
    name: m.month.split(" ")[0],
    month: m.month.split(" ")[0],
    total: m.total,
    resolved: m.resolved,
  }));

  const responseTimeTrend = monthlyIncidentHistory.map((m, idx) => ({
    id: `time-${idx}`,
    name: m.month.split(" ")[0],
    month: m.month.split(" ")[0],
    avgResponseMin: m.avgResponseMin,
  }));

  const avgResponseTime = +(monthlyIncidentHistory.reduce((s, m) => s + m.avgResponseMin, 0) / monthlyIncidentHistory.length).toFixed(1);
  const resolvedTotal = monthlyIncidentHistory.reduce((s, m) => s + m.resolved, 0);
  const resolutionRate = ((resolvedTotal / grandTotal) * 100).toFixed(1);

  // Reports filtered data
  const filteredIncidents = mockIncidents.filter((incident) => {
    const typeMatch = incidentType === "all" || incident.type === incidentType;
    const barangayMatch = barangayFilter === "all" || incident.location.barangay === barangayFilter;
    return typeMatch && barangayMatch;
  });

  const reportStats = {
    total: filteredIncidents.length,
    resolved: filteredIncidents.filter((i) => i.status === "resolved").length,
    pending: filteredIncidents.filter((i) => i.status === "pending").length,
    affectedPersons: filteredIncidents.reduce((sum, i) => sum + i.affectedPersons, 0),
  };

  const uniqueBarangays = [...new Set(mockIncidents.map(i => i.location.barangay))].sort();

  const handleExportReport = (fmt: string) => {
    toast.success(`Exporting report as ${fmt.toUpperCase()}...`);
  };

  const handleSubmitIncidentReport = () => {
    if (!reportSummary) {
      toast.error("Please fill in the incident summary");
      return;
    }
    toast.success("Incident report submitted successfully");
    setReportSummary("");
    setActionsTaken("");
    setOutcome("");
    setDamages("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Incident Reports</h1>
          <p className="text-gray-500 text-sm mt-0.5">Performance metrics, trends, and incident documentation</p>
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { key: "analytics", label: "Analytics" },
            { key: "reports", label: "Reports" },
            { key: "incident_report", label: "Incident Report" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-white shadow text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "analytics" && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl shadow-sm border-0">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-gray-500">Total Incidents (12mo)</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{grandTotal}</p>
                <p className="text-xs text-gray-400 mt-1">~{(grandTotal / 12).toFixed(0)} per month</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm border-0">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-gray-500">Resolution Rate</p>
                <p className="text-3xl font-bold text-[#00A699] mt-1">{resolutionRate}%</p>
                <p className="text-xs text-[#00A699] flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />+5% improvement</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm border-0">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <p className="text-3xl font-bold text-[#0056D2] mt-1">{avgResponseTime}m</p>
                <p className="text-xs text-[#0056D2] flex items-center gap-1 mt-1"><TrendingDown className="h-3 w-3" />-3min faster</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm border-0">
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-gray-500">Most Common</p>
                <p className="text-3xl font-bold text-[#E3000F] mt-1 capitalize">{disasterTypeFrequency[0].type}</p>
                <p className="text-xs text-gray-400 mt-1">{disasterTypeFrequency[0].total} incidents ({((disasterTypeFrequency[0].total / grandTotal) * 100).toFixed(0)}%)</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Incident Trends (12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData} key="area-chart" id="analytics-area" accessibilityLayer={false}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="xaxis" dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis key="yaxis" tick={{ fontSize: 11 }} />
                    <Tooltip key="tooltip" />
                    <Legend key="legend" />
                    <Area key="area-total" type="monotone" dataKey="total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} name="Total" />
                    <Area key="area-resolved" type="monotone" dataKey="resolved" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Requests Per Day/Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trendData} key="bar-chart" id="analytics-bar" accessibilityLayer={false}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="xaxis" dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis key="yaxis" tick={{ fontSize: 11 }} />
                    <Tooltip key="tooltip" />
                    <Bar key="bar-total" dataKey="total" fill="#3b82f6" name="Total" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Incident Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart key="pie-chart" id="analytics-pie" accessibilityLayer={false}>
                    <Pie
                      key="pie"
                      data={disasterTypeFrequency}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      dataKey="total"
                      nameKey="type"
                      label={({ type, total }) => `${type}: ${total}`}
                      labelLine={false}
                    >
                      {disasterTypeFrequency.map((entry) => (
                        <Cell key={`cell-${entry.type}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip key="tooltip" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Avg Response Time Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={responseTimeTrend} key="line-chart" id="analytics-line" accessibilityLayer={false}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis key="xaxis" dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis key="yaxis" tick={{ fontSize: 11 }} />
                    <Tooltip key="tooltip" />
                    <Line key="line-avg" type="monotone" dataKey="avgResponseMin" stroke="#3b82f6" strokeWidth={2} name="Avg (min)" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Disaster Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {disasterTypeFrequency.map((d) => (
                    <div key={d.type}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-sm">{d.type}</span>
                        </div>
                        <span className="text-sm font-bold">{d.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${(d.total / disasterTypeFrequency[0].total) * 100}%`, backgroundColor: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === "reports" && (
        <>
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Generate Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="space-y-2 min-w-[150px]">
                  <Label>Incident Type</Label>
                  <Select value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="landslide">Landslide</SelectItem>
                      <SelectItem value="typhoon">Typhoon</SelectItem>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 min-w-[150px]">
                  <Label>Barangay</Label>
                  <Select value={barangayFilter} onValueChange={setBarangayFilter}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Barangays</SelectItem>
                      {uniqueBarangays.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl" onClick={() => handleExportReport("pdf")}><Download className="mr-2 h-4 w-4" />PDF</Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => handleExportReport("excel")}><Download className="mr-2 h-4 w-4" />Excel</Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => handleExportReport("csv")}><Download className="mr-2 h-4 w-4" />CSV</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl shadow-sm border-0"><CardContent className="pt-5 pb-5 text-center"><p className="text-2xl font-bold">{reportStats.total}</p><p className="text-xs text-gray-500">Total</p></CardContent></Card>
            <Card className="rounded-2xl shadow-sm border-0"><CardContent className="pt-5 pb-5 text-center"><p className="text-2xl font-bold text-[#00A699]">{reportStats.resolved}</p><p className="text-xs text-gray-500">Resolved</p></CardContent></Card>
            <Card className="rounded-2xl shadow-sm border-0"><CardContent className="pt-5 pb-5 text-center"><p className="text-2xl font-bold text-[#FFB020]">{reportStats.pending}</p><p className="text-xs text-gray-500">Pending</p></CardContent></Card>
            <Card className="rounded-2xl shadow-sm border-0"><CardContent className="pt-5 pb-5 text-center"><p className="text-2xl font-bold text-[#E3000F]">{reportStats.affectedPersons}</p><p className="text-xs text-gray-500">Affected</p></CardContent></Card>
          </div>

          {/* Table */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Filtered Data ({filteredIncidents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Title</th>
                      <th className="pb-3 font-medium">Barangay</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Affected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((inc) => (
                      <tr key={inc.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 font-mono text-xs">{inc.id}</td>
                        <td className="py-3 capitalize">{inc.type}</td>
                        <td className="py-3 max-w-[200px] truncate">{inc.title}</td>
                        <td className="py-3">{inc.location.barangay}</td>
                        <td className="py-3"><Badge variant="outline" className="capitalize">{inc.status}</Badge></td>
                        <td className="py-3 text-center">{inc.affectedPersons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "incident_report" && (
        <>
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Create Incident Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Incident Summary *</Label>
                <Textarea
                  placeholder="Provide a detailed summary of the incident..."
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  rows={4}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Actions Taken</Label>
                  <Textarea
                    placeholder="Describe the actions taken during the response..."
                    value={actionsTaken}
                    onChange={(e) => setActionsTaken(e.target.value)}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Textarea
                    placeholder="Describe the outcome and resolution..."
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Damages / Losses</Label>
                <Textarea
                  placeholder="List any damages, losses, or property damage..."
                  value={damages}
                  onChange={(e) => setDamages(e.target.value)}
                  rows={3}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Images/Files</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#0056D2] transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitIncidentReport} className="rounded-xl">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => handleExportReport("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Incident Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Monthly Incident Summary - March 2026", date: "2026-03-05", type: "Summary Report" },
                  { name: "Flood Incidents Analysis - Q1 2026", date: "2026-03-01", type: "Statistical Analysis" },
                  { name: "Response Time Report - February 2026", date: "2026-02-28", type: "Response Time Analysis" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-[#0056D2]" />
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">{report.name}</h3>
                        <p className="text-xs text-gray-500">{report.type} · {new Date(report.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleExportReport("pdf")}>
                      <Download className="mr-2 h-4 w-4" />Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
