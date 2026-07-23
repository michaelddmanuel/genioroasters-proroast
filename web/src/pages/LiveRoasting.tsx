import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { Drawer, Stars, Toggle } from "../components/ui";
import { RoastChart } from "../components/RoastChart";
import { generateRoast, fmtClock, sampleAt, ROAST_DURATION } from "../sim/roast";

const SIM_SPEED = 14; // simulated seconds per real second — full roast ≈ 80s demo

const roastData = generateRoast(7);

type BatchStatus = "current" | "next" | "queued" | "done";
type Batch = { id: number; name: string; kg: number; progress: number; status: BatchStatus; time?: string };

const initialBatches: Batch[] = [
  { id: 1, name: "Costa Rica Fancy", kg: 4, progress: 40, status: "current", time: "02:34:44" },
  { id: 2, name: "Costa Rica Fancy", kg: 4, progress: 0, status: "next" },
  { id: 3, name: "Costa Rica Fancy", kg: 4, progress: 0, status: "queued" },
];

export default function LiveRoasting() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [tab, setTab] = useState<"current" | "queue" | "completed">("current");
  const [drawer, setDrawer] = useState(false);
  const [saveDefault, setSaveDefault] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [rating, setRating] = useState(8);
  const [notes, setNotes] = useState("");
  const [batches, setBatches] = useState(initialBatches);
  const raf = useRef<number | null>(null);
  const lastTs = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const step = (ts: number) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = ((ts - lastTs.current) / 1000) * SIM_SPEED;
      lastTs.current = ts;
      setElapsed((e) => {
        const next = e + dt;
        if (next >= ROAST_DURATION) {
          setRunning(false);
          return ROAST_DURATION;
        }
        return next;
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      lastTs.current = 0;
    };
  }, [running]);

  const cur = sampleAt(roastData, elapsed);
  const pctRoast = Math.round((elapsed / ROAST_DURATION) * 100);
  const fc = roastData.phases.firstCrack;
  const devPct = elapsed > fc ? ((elapsed - fc) / ROAST_DURATION) * 100 : 0;

  const start = () => {
    setElapsed(0);
    setRunning(true);
    setBatches((b) => b.map((x) => (x.id === 1 ? { ...x, progress: 0 } : x)));
  };
  const stop = () => setRunning(false);

  useEffect(() => {
    if (running) {
      setBatches((b) => b.map((x) => (x.id === 1 ? { ...x, progress: pctRoast, time: fmtClock(elapsed, true) } : x)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pctRoast, running]);

  const shownBatches =
    tab === "current" ? batches : tab === "queue" ? batches.filter((b) => b.status !== "current") : batches.filter(() => false);

  return (
    <div className="live">
      {/* header */}
      <div className="live-head">
        <img className="bean-avatar" src="/assets/bean-thumb.png" alt="" />
        <div>
          <h1>Casta Rica Fancy</h1>
          <div className={"mode " + (running ? "roasting" : "standby")}>
            {running ? "Roasting" : "Standby"} <small>Mode</small>
          </div>
          <div className="meta" style={{ marginTop: 2 }}>
            <span style={{ fontSize: 11.5, color: "var(--gray-500)" }}>Roast Session</span>
            <span className="chip">
              <Icon name="clock" size={13} />
              {running ? "Batch 1/24" : "No batches"}
            </span>
            <span className="chip">
              <Icon name="clock" size={13} />
              {running ? "02:20:30" : "00:00:00"}
            </span>
          </div>
        </div>
        <div className="right">
          <button className="collapse">
            <Icon name={running ? "chevron-down" : "chevron-up"} size={16} />
          </button>
          {running ? (
            <button className="btn btn-primary btn-sm" onClick={stop}>Stop Roast</button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={start}>Start Roast</button>
          )}
        </div>
      </div>

      <div className="live-body">
        {/* batch queue */}
        <div className="queue">
          <div className="queue-tabs">
            <button className={tab === "current" ? "active" : ""} onClick={() => setTab("current")}>Current</button>
            <button className={tab === "queue" ? "active" : ""} onClick={() => setTab("queue")}>In queue</button>
            <button className={tab === "completed" ? "active" : ""} onClick={() => setTab("completed")}>
              <Icon name="clock" size={12} /> Completed
            </button>
          </div>
          <div className="queue-list">
            <div className="queue-group-title">Costa Rica Fancy</div>
            <div className="queue-total">
              <div className="progress blue" style={{ margin: "8px 0 6px" }}>
                <div className="track"><div className="fill" style={{ width: `${Math.max(10, pctRoast / 3)}%` }} /></div>
                <span className="pct" style={{ color: "var(--primary-500)" }}>10%</span>
              </div>
              <div className="row">
                <Icon name="arrow-up" size={13} />
                <span>12kg</span>
                <span className="lbl">Rounded up</span>
                <span style={{ marginLeft: "auto" }}><Icon name="chevron-down" size={14} /></span>
              </div>
            </div>

            {shownBatches.length === 0 && <div style={{ color: "var(--gray-400)", fontSize: 12.5, textAlign: "center", padding: "30px 0" }}>No completed batches yet</div>}
            {shownBatches.map((b) => (
              <div className="batch-card" key={b.id}>
                <div className="t">{b.name}</div>
                <div className="progress">
                  <div className="track"><div className="fill" style={{ width: `${b.progress}%`, background: b.status === "current" ? "var(--navy-mid)" : "var(--gray-300)" }} /></div>
                  <span className="pct" style={{ color: b.status === "current" ? "var(--primary-500)" : "var(--gray-400)" }}>{b.progress}%</span>
                </div>
                <div className="foot">
                  <span className="kg">{b.kg}kg</span>
                  <span>Batch {b.id}</span>
                  {b.status === "current" && b.time && (
                    <span className="stat"><Icon name="clock" size={12} /> {b.time}</span>
                  )}
                  {b.status === "next" && <span className="stat"><Icon name="arrow-up" size={11} /> Up Next</span>}
                  {b.status === "queued" && <span className="stat"><Icon name="swap" size={11} /> In queue</span>}
                </div>
                {b.status === "current" && running && (
                  <div className="hover-actions">
                    <button className="mini light" onClick={stop}>Remove Roast</button>
                    <button className="mini dark" onClick={() => setDrawer(true)}>Save Roast profile</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* chart */}
        <div className="live-center">
          <RoastChart data={roastData} elapsed={elapsed} running={running || elapsed > 0} />
        </div>

        {/* roast data panel */}
        <div className="roast-panel">
          <div className="roast-panel-title">Roast Profile Data</div>
          <div className="roast-panel-section">
            <div className="sec-t">Roast Details</div>
            <div className="tiles">
              <Tile label="Roast Time" value={running || elapsed > 0 ? fmtClock(elapsed) : "14:33"} color="#FFE6D9" wide />
              <Tile label="Bean Temperature" value={`${cur.bean || 195.8} °C`} color="#FFE6D9" />
              <Tile label="Bean RoR" value={`${cur.ror || 12.6} °C/30s`} color="#FFE6D9" />
              <Tile label="Exhaust Temp" value={`${cur.exhaust || 207.3} °C`} color="#FFF5CE" />
              <Tile label="Recirculating Temp" value={`${cur.drum || 207.3} °C`} color="#FCE7F6" />
              <Tile label="First Crack" value={devPct > 0 ? `${devPct.toFixed(1)}%  |  ${fmtClock(elapsed - fc)}` : "19.5%  |  02:55"} color="#FFE6D9" />
              <Tile label="Development" value={devPct > 0 ? `${devPct.toFixed(1)}%  |  ${fmtClock(elapsed - fc)}` : "19.5%  |  02:55"} color="#FFE6D9" />
              <Tile label="Turn Point" value="75°C  |  01:36" color="#FFE6D9" />
              <Tile label="Green bean temp" value="76.5 °C" color="#FFE6D9" />
            </div>
          </div>
          <div className="roast-panel-section">
            <div className="sec-t">Roast Input Details</div>
            <div className="roast-inputs">
              <div className="field">
                <label>Bean Colour</label>
                <div className="control"><input placeholder="00" /><Icon name="info" size={15} className="hint" /></div>
              </div>
              <div className="field">
                <label>Ground Colour</label>
                <div className="control"><input placeholder="00" /><Icon name="info" size={15} /></div>
              </div>
              <div className="field">
                <label>Roasted Weight</label>
                <div className="control"><span style={{ color: "var(--gray-400)", fontSize: 14 }}>kg</span><input placeholder="00" /><Icon name="info" size={15} /></div>
              </div>
            </div>
          </div>
          <div className="panel-actions">
            <button className="btn btn-outline"><Icon name="trash" size={15} /> Reject Batch</button>
            <button className="btn btn-primary" onClick={() => setDrawer(true)}><Icon name="save" size={15} /> Save Batch</button>
          </div>
        </div>

        {/* far-right utility rail */}
        <div className="util-rail">
          {["grid", "wrench", "alert", "comment", "trend", "thermometer"].map((ic, i) => (
            <button key={ic} className={"rail-btn" + (i === 4 ? " active" : "")}>
              <Icon name={ic} size={18} />
            </button>
          ))}
        </div>
      </div>

      {drawer && (
        <Drawer
          icon="save"
          title="Save Roast profile"
          subtitle="Save this roast profile"
          onClose={() => setDrawer(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setDrawer(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setDrawer(false)}>Save</button>
            </>
          }
        >
          <div className="field">
            <label>Save roast profile as default§</label>
            <Toggle on={saveDefault} onChange={setSaveDefault} label={saveDefault ? "Yes" : "No"} />
          </div>
          <div className="field">
            <label>Name this roast profile</label>
            <div className="control">
              <input placeholder="Enter a roast profile name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Rate this roast profile</label>
            <Stars value={rating} onChange={setRating} />
          </div>
          <div className="field">
            <label>Profile notes</label>
            <textarea className="plain" placeholder="Add in roast profile notes about this roasts." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="field">
            <label>Roast profile snap shot</label>
            <div style={{ border: "1px solid var(--gray-200)", borderRadius: 8, padding: 6, height: 130, overflow: "hidden" }}>
              <MiniSnapshot />
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

function Tile({ label, value, color, wide }: { label: string; value: string; color: string; wide?: boolean }) {
  return (
    <div className={"tile" + (wide ? " wide" : "")}>
      <div className="lbl">
        <span className="ic" style={{ background: color }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--error-500)", display: "block" }} />
        </span>
        {label}
      </div>
      <span className="info"><Icon name="info" size={13} /></span>
      <div className="val">{value}</div>
    </div>
  );
}

function MiniSnapshot() {
  const d = roastData;
  const W = 320;
  const H = 118;
  const x = (t: number) => (t / ROAST_DURATION) * W;
  const y = (v: number) => H - ((v - 25) / (400 - 25)) * H;
  const p = (key: "bean" | "air" | "exhaust" | "drum") =>
    d.samples.map((s, i) => `${i === 0 ? "M" : "L"}${x(s.t).toFixed(1)},${y(s[key]).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
      {[100, 200, 300].map((v) => (
        <line key={v} x1={0} x2={W} y1={y(v)} y2={y(v)} stroke="#eef1f5" strokeWidth={0.8} />
      ))}
      <path d={p("exhaust")} fill="none" stroke="var(--c-exhaust)" strokeWidth={0.9} />
      <path d={p("air")} fill="none" stroke="var(--c-air)" strokeWidth={0.9} />
      <path d={p("bean")} fill="none" stroke="var(--c-bean)" strokeWidth={1.1} />
      <path d={p("drum")} fill="none" stroke="var(--c-drum)" strokeWidth={0.9} />
      {d.cracks.map((c, i) => (
        <rect key={i} x={x(c.t)} width={1.6} y={H - 18 * c.intensity - 10} height={18 * c.intensity} fill="var(--c-cracks)" />
      ))}
      <line x1={x(d.phases.yellowingEnd)} x2={x(d.phases.yellowingEnd)} y1={0} y2={H} stroke="var(--navy)" strokeWidth={1} />
      <line x1={x(d.phases.firstCrack)} x2={x(d.phases.firstCrack)} y1={0} y2={H} stroke="var(--navy)" strokeWidth={1} />
    </svg>
  );
}
