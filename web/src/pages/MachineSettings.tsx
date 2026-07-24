import { useState } from "react";
import { Icon } from "../components/Icon";
import { Badge, Banner, Toggle } from "../components/ui";

/** No dedicated Figma frame — built from the ProRoast design system (flagged as adaptation). */
export default function MachineSettings() {
  const [sampleRate, setSampleRate] = useState("5 seconds");
  const [fan, setFan] = useState("75");
  const [power, setPower] = useState("63");
  const [rpm, setRpm] = useState("55");
  const [autoStart, setAutoStart] = useState(true);
  const [crackDetect, setCrackDetect] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>Machine Settings</h1>
            <div className="sub">Configure your ProRoast Evolution connection and roast defaults.</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
              <Icon name="save" size={15} /> Save changes
            </button>
          </div>
        </div>
        {saved && <div className="panel-note" style={{ borderColor: "var(--success-500)", color: "#3F8927", background: "#EDF9E8", marginBottom: 14 }}>Machine settings saved.</div>}

        <div className="settings-grid">
          <div className="table-card" style={{ padding: "0 0 6px" }}>
            <div className="card-sec-t">Machine</div>
            <div className="kv-list">
              <div className="kv"><span className="k">Model</span><span className="v">ProRoast Evolution</span></div>
              <div className="kv"><span className="k">Serial number</span><span className="v">GEVO-2024-0117</span></div>
              <div className="kv"><span className="k">Capacity</span><span className="v">4 kg / batch</span></div>
              <div className="kv"><span className="k">Firmware</span><span className="v">v2.4.1 <Badge kind="success">Up to date</Badge></span></div>
              <div className="kv"><span className="k">Probe link</span><span className="v"><Badge kind="info">Simulated</Badge></span></div>
            </div>
            <div className="form-col" style={{ paddingTop: 4 }}>
              <div className="field">
                <label>Telemetry sample rate</label>
                <div className="control is-select">
                  <select value={sampleRate} onChange={(e) => setSampleRate(e.target.value)}>
                    <option>1 second</option>
                    <option>5 seconds</option>
                    <option>10 seconds</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
                <Icon name="swap" size={15} /> Reconnect probe link
              </button>
            </div>
          </div>

          <div className="table-card" style={{ padding: "0 0 6px" }}>
            <div className="card-sec-t">Roast defaults</div>
            <div className="form-col">
              <div className="field">
                <label>Fan speed</label>
                <div className="control"><input value={fan} onChange={(e) => setFan(e.target.value)} /><span className="unit">%</span></div>
              </div>
              <div className="field">
                <label>Burner power</label>
                <div className="control"><input value={power} onChange={(e) => setPower(e.target.value)} /><span className="unit">%</span></div>
              </div>
              <div className="field">
                <label>Drum speed</label>
                <div className="control"><input value={rpm} onChange={(e) => setRpm(e.target.value)} /><span className="unit">RPM</span></div>
              </div>
              <div className="field">
                <label>Auto-start batch timer at charge</label>
                <Toggle on={autoStart} onChange={setAutoStart} label={autoStart ? "Yes" : "No"} />
              </div>
              <div className="field">
                <label>Automatic crack detection</label>
                <Toggle on={crackDetect} onChange={setCrackDetect} label={crackDetect ? "On" : "Off"} />
              </div>
            </div>
          </div>
        </div>

        <div className="table-card" style={{ marginTop: 16, padding: "0 0 14px" }}>
          <div className="card-sec-t">Safety</div>
          <div className="form-col">
            <div className="panel-note">
              v1 telemetry is <strong>read-only</strong> — ProRoast reads bean, air, exhaust and drum temperatures plus fan/power/RPM, but never commands the burner. Heat control remains on the machine.
            </div>
            <div className="field">
              <label>Remote heat control</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Toggle on={false} onChange={() => {}} label="Disabled" />
                <Badge kind="gray">Coming with certified hardware link</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
