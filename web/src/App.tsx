import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { Rail, Sidebar } from "./components/Sidebar";
import { SignIn, SignUp, ResetPassword } from "./pages/Auth";
import LiveRoasting from "./pages/LiveRoasting";
import Profiles from "./pages/Profiles";
import ProfilesList from "./pages/ProfilesList";
import Users from "./pages/Users";
import Schedule from "./pages/Schedule";
import ScheduleNew from "./pages/ScheduleNew";
import Inventory from "./pages/Inventory";
import InventoryNew from "./pages/InventoryNew";
import Support from "./pages/Support";
import MachineSettings from "./pages/MachineSettings";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function Shell() {
  const { pathname } = useLocation();
  // rail by default on the cockpit + profile detail (frames 12/37); full sidebar elsewhere (frame 36)
  const routeDefault = pathname.startsWith("/live") || /^\/profiles\/.+/.test(pathname);
  const [manual, setManual] = useState<boolean | null>(null);
  const collapsed = manual ?? routeDefault;
  const toggle = () => setManual(!collapsed);
  return (
    <div className="shell">
      {collapsed ? <Rail onToggle={toggle} /> : <Sidebar onToggle={toggle} />}
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route element={<Shell />}>
          <Route path="/live" element={<LiveRoasting />} />
          <Route path="/profiles" element={<ProfilesList />} />
          <Route path="/profiles/:id" element={<Profiles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/new" element={<ScheduleNew />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/new" element={<InventoryNew />} />
          <Route path="/support" element={<Support />} />
          <Route path="/machine-settings" element={<MachineSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
