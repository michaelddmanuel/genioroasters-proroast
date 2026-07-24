import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Badge, Banner } from "../components/ui";

/** Account page for the sidebar user block. No dedicated Figma frame — design-system adaptation. */
export default function Profile() {
  const nav = useNavigate();
  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="profile-head">
          <img className="profile-avatar" src="/assets/avatar-olivia.png" alt="Olivia Rhye" />
          <div>
            <h1>Olivia Rhye</h1>
            <div className="sub">olivia@motherland.com</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <Badge kind="info">Admin</Badge>
              <Badge kind="success">Head Roaster</Badge>
            </div>
          </div>
          <div className="actions" style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button className="btn btn-outline" onClick={() => nav("/settings")}><Icon name="gear" size={15} /> Edit in Settings</button>
            <button className="btn btn-primary" onClick={() => nav("/signin")}><Icon name="logout" size={15} /> Log out</button>
          </div>
        </div>

        <div className="tiles profile-tiles">
          <div className="stat-tile"><div className="k">Sessions this week</div><div className="v">4</div></div>
          <div className="stat-tile"><div className="k">Roasts completed</div><div className="v">128</div></div>
          <div className="stat-tile"><div className="k">Profiles saved</div><div className="v">21</div></div>
          <div className="stat-tile"><div className="k">Avg profile score</div><div className="v">8.6<span style={{ fontSize: 13, color: "var(--gray-400)" }}> / 10</span></div></div>
          <div className="stat-tile"><div className="k">Member since</div><div className="v">Jan 2023</div></div>
        </div>

        <div className="table-card" style={{ marginTop: 16, padding: "0 0 10px" }}>
          <div className="card-sec-t">Recent activity</div>
          <div className="event-list" style={{ padding: "4px 18px 8px" }}>
            <div className="event-row hit"><span className="dot success" /><div><div className="l">Completed Batch 1 — Costa Rica Fancy, 4kg</div><div className="s">Today · 09:41</div></div></div>
            <div className="event-row hit"><span className="dot info" /><div><div className="l">Saved roast profile "Morning Roast" (CRF -00090- GEVO)</div><div className="s">Today · 09:12</div></div></div>
            <div className="event-row hit"><span className="dot warn" /><div><div className="l">Kenyan AA flagged below re-order point (20 kg available)</div><div className="s">Yesterday · 16:03</div></div></div>
            <div className="event-row hit"><span className="dot info" /><div><div className="l">Scheduled "Morning roast session" for 14 Jan — 3 products, 57 batches</div><div className="s">Yesterday · 11:47</div></div></div>
            <div className="event-row hit"><span className="dot success" /><div><div className="l">Added 400 kg Jamaican Blue Mountain to stock (A-002267)</div><div className="s">Mon · 14:20</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
