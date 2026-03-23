import { create } from 'zustand';
import { Incident, ResponseTeam, CallLog, IncidentUpdate, RequestStatus, CallResult } from './types/incident';
import { mockIncidents, mockTeams } from './data/mockData';

interface AppState {
  incidents: Incident[];
  teams: ResponseTeam[];
  addIncident: (incident: Incident) => void;
  updateIncidentStatus: (id: string, status: RequestStatus, by: string) => void;
  addCallLog: (incidentId: string, log: Omit<CallLog, "id" | "requestId">) => void;
  updateIncidentDetails: (id: string, updates: Partial<Incident>) => void;
  updateTeamStatus: (id: string, status: "available" | "deployed" | "standby") => void;
  updateSettings: (settings: any) => void;
  submitAnalyticsReport: (report: any) => void;
}

export const useStore = create<AppState>((set) => ({
  incidents: mockIncidents,
  teams: mockTeams,
  addIncident: (incident) => set((state) => ({
    incidents: [incident, ...state.incidents]
  })),
  updateIncidentStatus: (id, status, by) => set((state) => ({
    incidents: state.incidents.map((inc) => {
      if (inc.id === id) {
        const newUpdate: IncidentUpdate = {
          id: `update-${Date.now()}`,
          type: "status_change",
          message: `Status updated to ${status}`,
          author: by,
          timestamp: new Date().toISOString()
        };
        return { ...inc, status, updates: [...inc.updates, newUpdate] };
      }
      return inc;
    })
  })),
  updateIncidentDetails: (id, updates) => set((state) => ({
    incidents: state.incidents.map((inc) => {
      if (inc.id === id) {
        return { ...inc, ...updates };
      }
      return inc;
    })
  })),
  addCallLog: (incidentId, log) => set((state) => ({
    incidents: state.incidents.map((inc) => {
      if (inc.id === incidentId) {
        const newLog: CallLog = { ...log, id: `log-${Date.now()}`, requestId: incidentId };
        const newUpdate: IncidentUpdate = {
          id: `update-call-${Date.now()}`,
          type: "department_called",
          message: `Called ${log.departmentName} - Result: ${log.result.replace("_", " ")}`,
          author: log.calledBy,
          timestamp: new Date().toISOString()
        };
        return { ...inc, callLogs: [newLog, ...inc.callLogs], updates: [...inc.updates, newUpdate] };
      }
      return inc;
    })
  })),
  updateTeamStatus: (id, status) => set((state) => ({
    teams: state.teams.map((team) => team.id === id ? { ...team, status } : team)
  })),
  updateSettings: (settings) => set((state) => ({
    // Placeholder if we add a settings state
  })),
  submitAnalyticsReport: (report) => set((state) => ({
    // Placeholder if we store reports
  }))
}));
