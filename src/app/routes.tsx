import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Requests } from "./components/Requests";
import { RequestDetail } from "./components/RequestDetail";
import { CallLogs } from "./components/CallLogs";
import { Analytics } from "./components/Analytics";
import { ResponseTeams } from "./components/ResponseTeams";
import { Settings } from "./components/Settings";

// Mobile App
import { MobileLayout } from "./components/mobile/MobileLayout";
import { MobileHome } from "./components/mobile/MobileHome";
import { MobileReport } from "./components/mobile/MobileReport";
import { MobileHistory } from "./components/mobile/MobileHistory";
import { MobileProfile } from "./components/mobile/MobileProfile";
import { MobileLogin } from "./components/mobile/MobileLogin";
import { MobileSignup } from "./components/mobile/MobileSignup";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "requests", Component: Requests },
      { path: "requests/:id", Component: RequestDetail },
      { path: "call-logs", Component: CallLogs },
      { path: "analytics", Component: Analytics },
      { path: "departments", Component: ResponseTeams },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/mobile/login",
    Component: MobileLogin,
  },
  {
    path: "/mobile/signup",
    Component: MobileSignup,
  },
  {
    path: "/mobile",
    Component: MobileLayout,
    children: [
      { index: true, Component: MobileHome },
      { path: "report", Component: MobileReport },
      { path: "history", Component: MobileHistory },
      { path: "profile", Component: MobileProfile },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
