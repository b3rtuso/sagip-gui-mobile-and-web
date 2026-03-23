export type IncidentType = 
  | "flood"
  | "fire"
  | "earthquake"
  | "landslide"
  | "typhoon"
  | "accident"
  | "medical"
  | "unidentified"
  | "other";

export type RequestStatus = 
  | "pending"
  | "called"
  | "dispatched"
  | "en_route"
  | "arrived"
  | "resolved";

export type Priority = "low" | "medium" | "high" | "critical";

export type CallResult = "accepted" | "no_response" | "pending" | "declined";

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
    barangay: string;
  };
  reportedBy: {
    name: string;
    contact: string;
  };
  reportedAt: string;
  status: RequestStatus;
  priority: Priority;
  affectedPersons: number;
  casualties?: number;
  injuries?: number;
  assignedDepartment?: string;
  callLogs: CallLog[];
  updates: IncidentUpdate[];
  images?: string[];
}

export interface IncidentUpdate {
  id: string;
  timestamp: string;
  message: string;
  author: string;
  type: "status_change" | "department_called" | "update" | "dispatched" | "arrived" | "resolved";
}

export interface CallLog {
  id: string;
  requestId: string;
  departmentId: string;
  departmentName: string;
  timestamp: string;
  result: CallResult;
  notes: string;
  calledBy: string;
}

export interface ResponseTeam {
  id: string;
  name: string;
  abbreviation: string;
  type: "fire" | "police" | "medical" | "rescue" | "engineering" | "social_welfare";
  jurisdiction: string;
  headOfficer: string;
  contactNumber: string;
  members: number;
  status: "available" | "deployed" | "standby";
  currentIncident?: string;
  equipment: string[];
  description: string;
}

// Keep for backwards compat but unused
export type IncidentStatus = RequestStatus;
