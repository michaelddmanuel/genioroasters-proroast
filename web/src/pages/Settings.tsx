import { useState } from "react";
import { Icon } from "../components/Icon";
import { Banner, Toggle } from "../components/ui";

/** No dedicated Figma frame — built from the ProRoast design system (flagged as adaptation). */
const TABS = ["My details", "Preferences", "Notifications", "Security"];

export default function Settings() {
  const [tab, setTab] = useState("My details");
  const [first, setFirst] = useState("Olivia");
  const [last, setLast] = useState("Rhye");
  const [email, setEmail] = useState("olivia@motherland.com");
  const [unit, setUnit] = useState("Celsius (°C)");
  const [clock, setClock] = useState("24-hour");
  const [speed, setSpeed] = useState("14× (demo)");
  const [nRoast, setNRoast] = useState(true);
  const [nCrack, setNCrack] = useState(true);
  const [nStock, setNStock] = useState(true);
  const [nDigest, setNDigest] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>Settings</h1>
            <div className="sub">Manage your workspace, preferences and account security.</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={save}><Icon name="save" size={15} /> Save</button>
          </div>
        </div>

        <div className="seg-tabs" style={{ marginBottom: 16 }}>
          {TABS.map((t) => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        {saved && <div className="panel-note" style={{ borderColor: "var(--success-500)", color: "#3F8927", background: "#EDF9E8", marginBottom: 14 }}>Settings saved.</div>}

        {tab === "My details" && (
          <div className="table-card" style={{ padding: "0 0 6px", maxWidth: 620 }}>
            <div className="card-sec-t">Personal info</div>
            <div className="form-col">
              <div className="field-row">
                <div className="field">
                  <label>First name</label>
                  <div className="control"><input value={first} onChange={(e) => setFirst(e.target.value)} /></div>
                </div>
                <div className="field">
                  <label>Last name</label>
                  <div className="control"><input value={last} onChange={(e) => setLast(e.target.value)} /></div>
                </div>
              </div>
              <div className="field">
                <label>Email</label>
                <div className="control"><Icon name="mail" size={16} /><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
              <div className="field">
                <label>Role</label>
                <div className="control is-readonly"><input readOnly value="Admin — Head Roaster" /></div>
              </div>
            </div>
          </div>
        )}

        {tab === "Preferences" && (
          <div className="table-card" style={{ padding: "0 0 6px", maxWidth: 620 }}>
            <div className="card-sec-t">Roasting preferences</div>
            <div className="form-col">
              <div className="field">
                <label>Temperature unit</label>
                <div className="control is-select">
                  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option>Celsius (°C)</option>
                    <option>Fahrenheit (°F)</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Clock format</label>
                <div className="control is-select">
                  <select value={clock} onChange={(e) => setClock(e.target.value)}>
                    <option>24-hour</option>
                    <option>12-hour</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Simulation speed</label>
                <div className="control is-select">
                  <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
                    <option>1× (real time)</option>
                    <option>7×</option>
                    <option>14× (demo)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="table-card" style={{ padding: "0 0 6px", maxWidth: 620 }}>
            <div className="card-sec-t">Notify me when…</div>
            <div className="form-col">
              <div className="field"><label>A roast completes (drop)</label><Toggle on={nRoast} onChange={setNRoast} label={nRoast ? "On" : "Off"} /></div>
              <div className="field"><label>First crack is detected</label><Toggle on={nCrack} onChange={setNCrack} label={nCrack ? "On" : "Off"} /></div>
              <div className="field"><label>Stock falls below re-order point</label><Toggle on={nStock} onChange={setNStock} label={nStock ? "On" : "Off"} /></div>
              <div className="field"><label>Weekly roastery digest</label><Toggle on={nDigest} onChange={setNDigest} label={nDigest ? "On" : "Off"} /></div>
            </div>
          </div>
        )}

        {tab === "Security" && (
          <div className="table-card" style={{ padding: "0 0 6px", maxWidth: 620 }}>
            <div className="card-sec-t">Password &amp; security</div>
            <div className="form-col">
              <div className="field">
                <label>Current password</label>
                <div className="control"><input type="password" placeholder="••••••••" /></div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>New password</label>
                  <div className="control"><input type="password" placeholder="••••••••" /></div>
                </div>
                <div className="field">
                  <label>Confirm new password</label>
                  <div className="control"><input type="password" placeholder="••••••••" /></div>
                </div>
              </div>
              <div className="field">
                <label>Two-factor authentication</label>
                <Toggle on={twoFa} onChange={setTwoFa} label={twoFa ? "Enabled" : "Disabled"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
