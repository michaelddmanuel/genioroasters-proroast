import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Rail, Sidebar } from "./components/Sidebar";
import { SignIn, SignUp, ResetPassword } from "./pages/Auth";
import LiveRoasting from "./pages/LiveRoasting";
import Profiles from "./pages/Profiles";
import Users from "./pages/Users";
import Schedule from "./pages/Schedule";
import ScheduleNew from "./pages/ScheduleNew";
import Inventory from "./pages/Inventory";
import InventoryNew from "./pages/InventoryNew";
import { Icon } from "./components/Icon";

function Shell() {
  const { pathname } = useLocation();
  const collapsed = pathname.startsWith("/live") || pathname.startsWith("/profiles");
  return (
    <div className="shell">
      {collapsed ? <Rail /> : <Sidebar />}
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}

function Stub({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="stub-page">
      <div style={{ display: "inline-grid", placeItems: "center", width: 56, height: 56, borderRadius: 14, background: "var(--primary-100)", color: "var(--navy-mid)", marginBottom: 16 }}>
        <Icon name="gear" size={26} />
      </div>
      <h1>{title}</h1>
      <p>{blurb}</p>
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
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/new" element={<ScheduleNew />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/new" element={<InventoryNew />} />
          <Route path="/support" element={<Stub title="Support" blurb="Contact Genio Roasters support — support@genioroasters.co.za" />} />
          <Route path="/machine-settings" element={<Stub title="MachineSettings" blurb="ProRoast Evolution machine configuration." />} />
          <Route path="/settings" element={<Stub title="Settings" blurb="Workspace and account settings." />} />
        </Route>
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
