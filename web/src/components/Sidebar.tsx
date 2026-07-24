import { NavLink, useNavigate } from "react-router-dom";
import { Icon, LogoMark } from "./Icon";

const NAV = [
  { to: "/live", label: "Live Roasting", icon: "flame" },
  { to: "/profiles", label: "Roasting Profiles", icon: "trend" },
  { to: "/users", label: "User Management", icon: "users" },
  { to: "/schedule", label: "Schedule", icon: "layers" },
  { to: "/inventory", label: "Inventory", icon: "box" },
];

const FOOT = [
  { to: "/support", label: "Support", icon: "support" },
  { to: "/machine-settings", label: "MachineSettings", icon: "sliders" },
  { to: "/settings", label: "Settings", icon: "gear" },
];

export function Sidebar({ onToggle }: { onToggle?: () => void }) {
  const nav = useNavigate();
  return (
    <aside className="sidebar">
      {onToggle && (
        <button className="side-toggle" title="Collapse menu" onClick={onToggle}>
          <Icon name="chevron-left" size={15} />
        </button>
      )}
      <div className="brand">
        <LogoMark size={30} />
        <span>ProRoast</span>
      </div>
      <div className="search">
        <Icon name="search" size={17} />
        <input placeholder="Search" />
      </div>
      <nav className="nav-list">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
            <Icon name={n.icon} size={19} />
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="spacer" />
      <nav className="nav-list">
        {FOOT.map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
            <Icon name={n.icon} size={19} />
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-user">
        <img src="/assets/avatar-olivia.png" alt="Olivia Rhye" />
        <div>
          <div className="n">Olivia Rhye</div>
          <div className="e">olivia@motherland.com</div>
        </div>
        <button className="out" title="Log out" onClick={() => nav("/signin")}>
          <Icon name="logout" size={18} />
        </button>
      </div>
    </aside>
  );
}

/** Collapsed icon rail used on the Live Roasting cockpit */
export function Rail({ onToggle }: { onToggle?: () => void }) {
  const nav = useNavigate();
  return (
    <aside className="rail">
      {onToggle && (
        <button className="side-toggle" title="Expand menu" onClick={onToggle}>
          <Icon name="chevron-right" size={15} />
        </button>
      )}
      <div style={{ marginBottom: 10 }}>
        <LogoMark size={28} />
      </div>
      <button className="rail-btn" title="Search">
        <Icon name="search" size={19} />
      </button>
      {NAV.map((n) => (
        <NavLink key={n.to} to={n.to} className={({ isActive }) => "rail-btn" + (isActive ? " active" : "")} title={n.label}>
          <Icon name={n.icon} size={19} />
        </NavLink>
      ))}
      <div className="spacer" />
      {FOOT.map((n) => (
        <NavLink key={n.to} to={n.to} className={({ isActive }) => "rail-btn" + (isActive ? " active" : "")} title={n.label}>
          <Icon name={n.icon} size={19} />
        </NavLink>
      ))}
      <img className="avatar" src="/assets/avatar-olivia.png" alt="Olivia Rhye" onClick={() => nav("/signin")} style={{ cursor: "pointer" }} />
    </aside>
  );
}
