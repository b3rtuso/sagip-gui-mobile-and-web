Design a modern web-based admin dashboard UI for an emergency request management system called “SendReqPls”, used by MDRRMO staff (Municipal Disaster Risk Reduction and Management Office).

The design should be clean, professional, and similar to modern admin dashboards (like iOS-style or minimalist SaaS dashboards). Use a light theme with clear visual hierarchy, rounded cards, and subtle shadows.

LAYOUT:

* Left sidebar navigation (fixed)
* Top header bar with search, notifications, and admin profile
* Main content area with responsive cards and tables

SIDEBAR MENU ITEMS:

* Dashboard
* Requests
* Call Logs
*  Analytics & Incident Reports 

* Departments
* Settings

DASHBOARD PAGE:

* Summary cards:

  * Total Requests
  * Pending Requests
  * Dispatched
  * Completed
* Line or bar chart showing number of requests over time
* Recent requests table with status indicators

REQUEST MANAGEMENT PAGE:

* Table layout with columns:

  * Request ID
  * Name
  * Type of Emergency
  * Location
  * Time Reported
  * Status (color-coded: red = critical, yellow = pending, green = completed)
* Row click opens a detailed REQUEST PANEL

REQUEST DETAIL PANEL (IMPORTANT FOCUS):

* Section 1: Request Information

  * Name, contact, location, description
* Section 2: Call Department Panel

  * Dropdown: Select Department (Fire, Police, Medical)
  * Display contact number
  * Button: “Mark as Called”
* Section 3: Call Logging Form

  * Time of call (auto timestamp)
  * Call result (Accepted / No Response / Pending)
  * Notes field
  * Save log button

CALL TIMELINE COMPONENT:

* Vertical timeline showing:

  * Request received
  * Department called
  * Accepted / No response
  * Dispatched
  * Arrived
  * Resolved

STATUS UPDATE PANEL:

* Buttons or dropdown:

  * Pending
  * Called
  * Dispatched
  * En Route
  * Arrived
  * Resolved

INCIDENT REPORT FORM:

* Text area for incident summary
* Fields for actions taken, outcome, damages
* Upload section for images/files

ANALYTICS PAGE:

* Charts:

  * Incident trends by type
  * Requests per day/week
  * Average response time
* Cards showing performance metrics

DEPARTMENT DIRECTORY PAGE:

* Card or table layout showing:

  * Department name
  * Contact numbers
  * Availability status

DESIGN STYLE:

* Minimalist, modern, clean
* Use soft colors:

  * Red (critical)
  * Yellow (pending)
  * Green (resolved)
  * Blue (primary UI)
* Rounded corners and card-based layout
* Clear typography and spacing

Make the UI highly usable for emergency coordination, with emphasis on clarity, fast actions, and real-time tracking.