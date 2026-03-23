import { Incident, ResponseTeam, CallLog } from "../types/incident";

export const barangays = [
  "Poblacion", "Alangilan", "Calan", "Caloocan", "Carenahan",
  "Cawit", "Dao", "Dilao", "Durungao", "Gimalas",
  "Lagnas", "Lanatan", "Magabe", "Malalay", "Munting Tubig",
  "Palikpikan", "Patugo", "Sampaga", "San Juan", "San Roque",
  "Santa Ana", "Santo Niño", "Subic Ibaba", "Subic Ilaya", "Sukol"
];

export const mockTeams: ResponseTeam[] = [
  {
    id: "DEPT-001",
    name: "Bureau of Fire Protection - Balayan",
    abbreviation: "BFP",
    type: "fire",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "FI Renato Reyes",
    contactNumber: "(043) 740-1234",
    members: 25,
    status: "available",
    equipment: ["Fire Truck (2)", "Water Tanker", "Aerial Ladder", "Protective Gear", "Breathing Apparatus"],
    description: "Handles all fire-related incidents, fire prevention, and fire safety inspections in Balayan."
  },
  {
    id: "DEPT-002",
    name: "Philippine National Police - Balayan MPS",
    abbreviation: "PNP",
    type: "police",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "PLTCOL Marco dela Cruz",
    contactNumber: "(043) 740-5678",
    members: 45,
    status: "available",
    equipment: ["Patrol Vehicles (5)", "Communication Radios", "Traffic Barriers", "Rescue Tools"],
    description: "Provides law enforcement support, traffic management, and crowd control during disaster incidents."
  },
  {
    id: "DEPT-003",
    name: "Municipal Health Office - Balayan",
    abbreviation: "MHO",
    type: "medical",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "Dr. Maria Santos",
    contactNumber: "(043) 740-9012",
    members: 18,
    status: "available",
    equipment: ["Ambulance (2)", "Medical Supplies", "Stretchers", "Defibrillator", "Emergency Medicine Kit"],
    description: "Provides emergency medical services, first aid, and health-related disaster response."
  },
  {
    id: "DEPT-004",
    name: "MDRRMO - Balayan",
    abbreviation: "MDRRMO",
    type: "rescue",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "Engr. Ricardo Villanueva",
    contactNumber: "(043) 740-3456",
    members: 30,
    status: "available",
    equipment: ["Rescue Boats (3)", "Life Vests", "Ropes & Harnesses", "Megaphones", "Emergency Lights", "Communication Radios"],
    description: "Lead agency for disaster preparedness, response, and coordination. Handles rescue operations especially during floods and typhoons."
  },
  {
    id: "DEPT-005",
    name: "Municipal Engineering Office",
    abbreviation: "MEO",
    type: "engineering",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "Engr. Jose Aquino",
    contactNumber: "(043) 740-7890",
    members: 15,
    status: "available",
    equipment: ["Backhoe", "Dump Truck (2)", "Chainsaw", "Heavy Equipment", "Safety Barriers"],
    description: "Handles infrastructure assessment, road clearing, debris removal, and structural evaluation during disasters."
  },
  {
    id: "DEPT-006",
    name: "DSWD - Balayan Field Office",
    abbreviation: "DSWD",
    type: "social_welfare",
    jurisdiction: "Municipality of Balayan",
    headOfficer: "Ms. Elena Ramos",
    contactNumber: "(043) 740-2345",
    members: 12,
    status: "available",
    equipment: ["Relief Goods", "Family Food Packs", "Hygiene Kits", "Sleeping Mats", "Tarpaulins"],
    description: "Manages evacuation centers, distributes relief goods, and provides social welfare assistance to disaster-affected families."
  },
];

export const mockIncidents: Incident[] = [
  {
    id: "REQ-2026-001",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "Purok 3, San Roque", barangay: "San Roque", coordinates: { lat: 14.5995, lng: 120.9842 } },
    reportedBy: { name: "Maria Santos", contact: "0917-123-4567" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-001", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-002",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "123 Rizal Street, Poblacion", barangay: "Poblacion", coordinates: { lat: 14.6000, lng: 120.9850 } },
    reportedBy: { name: "Juan dela Cruz", contact: "0918-234-5678" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-002", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-003",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "Municipal Gymnasium", barangay: "Poblacion", coordinates: { lat: 14.6010, lng: 120.9860 } },
    reportedBy: { name: "Barangay Health Worker", contact: "0919-345-6789" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-003", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-004",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "Mountain View Road, Km 5", barangay: "Sukol", coordinates: { lat: 14.6020, lng: 120.9870 } },
    reportedBy: { name: "Traffic Officer", contact: "0920-456-7890" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-004", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-005",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "Riverside Area, Calan", barangay: "Calan", coordinates: { lat: 14.5980, lng: 120.9830 } },
    reportedBy: { name: "Barangay Captain Reyes", contact: "0921-567-8901" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-005", timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-006",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "Agricultural Zone, Palikpikan", barangay: "Palikpikan", coordinates: { lat: 14.5970, lng: 120.9815 } },
    reportedBy: { name: "Farmer Pedro Garcia", contact: "0922-678-9012" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: "UPD-006", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  },
  {
    id: "REQ-2026-007",
    type: "unidentified",
    title: "Unidentified Emergency",
    description: "Reported with media and location via quick alert. Awaiting MDRRMO staff review and classification.",
    location: { address: "123 Balayan Street, Poblacion", barangay: "Poblacion", coordinates: { lat: 13.9388, lng: 120.7303 } },
    reportedBy: { name: "Current User", contact: "+63 912 345 6789" },
    reportedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    status: "pending",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    callLogs: [],
    images: ["mock-image-url"],
    updates: [
      { id: `UPD-${Date.now()}`, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), message: "Report received via mobile app (Quick Alert).", author: "System", type: "update" }
    ]
  }
];

// All call logs extracted for the Call Logs page
export const allCallLogs: CallLog[] = mockIncidents.flatMap(inc => inc.callLogs);

// Historical monthly data for analytics (past 12 months)
export const monthlyIncidentHistory = [
  { month: "Apr 2025", total: 8, flood: 3, fire: 2, medical: 1, landslide: 1, typhoon: 0, earthquake: 0, accident: 1, other: 0, resolved: 7, avgResponseMin: 18 },
  { month: "May 2025", total: 6, flood: 1, fire: 1, medical: 2, landslide: 0, typhoon: 0, earthquake: 1, accident: 1, other: 0, resolved: 6, avgResponseMin: 16 },
  { month: "Jun 2025", total: 14, flood: 6, fire: 1, medical: 2, landslide: 2, typhoon: 2, earthquake: 0, accident: 1, other: 0, resolved: 12, avgResponseMin: 15 },
  { month: "Jul 2025", total: 18, flood: 8, fire: 2, medical: 3, landslide: 1, typhoon: 3, earthquake: 0, accident: 1, other: 0, resolved: 16, avgResponseMin: 14 },
  { month: "Aug 2025", total: 22, flood: 10, fire: 1, medical: 2, landslide: 3, typhoon: 4, earthquake: 0, accident: 2, other: 0, resolved: 19, avgResponseMin: 17 },
  { month: "Sep 2025", total: 20, flood: 9, fire: 2, medical: 3, landslide: 2, typhoon: 3, earthquake: 0, accident: 1, other: 0, resolved: 18, avgResponseMin: 13 },
  { month: "Oct 2025", total: 16, flood: 5, fire: 3, medical: 2, landslide: 2, typhoon: 2, earthquake: 1, accident: 1, other: 0, resolved: 15, avgResponseMin: 12 },
  { month: "Nov 2025", total: 11, flood: 4, fire: 2, medical: 2, landslide: 1, typhoon: 1, earthquake: 0, accident: 1, other: 0, resolved: 10, avgResponseMin: 14 },
  { month: "Dec 2025", total: 9, flood: 2, fire: 3, medical: 1, landslide: 1, typhoon: 0, earthquake: 1, accident: 1, other: 0, resolved: 9, avgResponseMin: 11 },
  { month: "Jan 2026", total: 7, flood: 2, fire: 2, medical: 1, landslide: 0, typhoon: 0, earthquake: 1, accident: 1, other: 0, resolved: 7, avgResponseMin: 10 },
  { month: "Feb 2026", total: 10, flood: 3, fire: 2, medical: 2, landslide: 0, typhoon: 0, earthquake: 0, accident: 3, other: 0, resolved: 10, avgResponseMin: 12 },
  { month: "Mar 2026", total: 21, flood: 6, fire: 4, medical: 3, landslide: 2, typhoon: 2, earthquake: 1, accident: 2, other: 1, resolved: 17, avgResponseMin: 13 },
];

// Response time data per barangay
export const barangayResponseData = [
  { barangay: "Poblacion", avgResponseMin: 8, incidentCount: 6, resolvedCount: 6 },
  { barangay: "San Roque", avgResponseMin: 12, incidentCount: 4, resolvedCount: 3 },
  { barangay: "Calan", avgResponseMin: 15, incidentCount: 3, resolvedCount: 3 },
  { barangay: "Durungao", avgResponseMin: 14, incidentCount: 2, resolvedCount: 2 },
  { barangay: "Carenahan", avgResponseMin: 18, incidentCount: 2, resolvedCount: 2 },
  { barangay: "Sampaga", avgResponseMin: 16, incidentCount: 2, resolvedCount: 2 },
  { barangay: "Dilao", avgResponseMin: 11, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Palikpikan", avgResponseMin: 20, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Sukol", avgResponseMin: 25, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Magabe", avgResponseMin: 22, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Cawit", avgResponseMin: 17, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Alangilan", avgResponseMin: 13, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Santa Ana", avgResponseMin: 19, incidentCount: 1, resolvedCount: 1 },
  { barangay: "Lagnas", avgResponseMin: 21, incidentCount: 1, resolvedCount: 1 },
];