import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Banner, Breadcrumb, Toggle } from "../components/ui";
import { productOptions, roasters } from "../data";

type Row = { product: string; amount: string; roundUp: boolean };
const BATCH_KG = 4;

export default function ScheduleNew() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { product: "", amount: "", roundUp: true },
    { product: "", amount: "", roundUp: true },
    { product: "", amount: "", roundUp: true },
  ]);
  const [description, setDescription] = useState("");

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  const batches = (r: Row) => {
    const amt = parseFloat(r.amount);
    if (!amt || amt <= 0) return "";
    return String(r.roundUp ? Math.ceil(amt / BATCH_KG * 1.14) : Math.floor(amt / BATCH_KG));
  };
  const newAmount = (r: Row) => {
    const b = batches(r);
    return b ? String(parseInt(b) * BATCH_KG) : "";
  };

  return (
    <div>
      <Banner />
      <div className="page-body">
        <Breadcrumb items={["Schedule"]} />
        <div className="page-head">
          <div>
            <h1>Add a new roast session to schedule</h1>
            <div className="sub">Plan a upcoming roast session.</div>
          </div>
          <div className="actions">
            <button className="btn btn-outline btn-sm" onClick={() => nav("/schedule")}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => nav("/schedule")}>Save</button>
          </div>
        </div>

        <div className="form-grid-3" style={{ maxWidth: 1080 }}>
          <div className="field">
            <label>User (Roaster)</label>
            <div className="control is-select">
              <select value={user} onChange={(e) => setUser(e.target.value)}>
                <option value="">Select Roaster</option>
                {roasters.map((r) => (
                  <option key={r.handle}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Roast session date</label>
            <div className="control">
              <input placeholder="Enter a date to schedule a roast session" value={date} onChange={(e) => setDate(e.target.value)} />
              <Icon name="calendar" size={17} />
            </div>
          </div>
          <div className="field">
            <label>Name this roast session</label>
            <div className="control">
              <input placeholder="Enter a roast session name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20, maxWidth: 1080 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div className="row-num">{i + 1}</div>
              <div className="field" style={{ flex: 2 }}>
                <label>Product</label>
                <div className="control is-select">
                  <select value={r.product} onChange={(e) => setRow(i, { product: e.target.value })}>
                    <option value="">Green beans</option>
                    {productOptions.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field" style={{ flex: 1.6 }}>
                <label>Roast amount</label>
                <div className="control">
                  <span style={{ color: "var(--gray-400)" }}>kg</span>
                  <input placeholder="000" value={r.amount} onChange={(e) => setRow(i, { amount: e.target.value.replace(/[^0-9.]/g, "") })} />
                </div>
              </div>
              <div className="field" style={{ width: 92 }}>
                <label>Round up</label>
                <div style={{ paddingTop: 10 }}>
                  <Toggle on={r.roundUp} onChange={(v) => setRow(i, { roundUp: v })} label={r.roundUp ? "Yes" : "No"} />
                </div>
              </div>
              <div className="field" style={{ width: 90 }}>
                <label>No. Batches</label>
                <div className="control is-readonly"><input readOnly placeholder="000" value={batches(r)} /></div>
              </div>
              <div className="field" style={{ width: 130 }}>
                <label>New Roast amount</label>
                <div className="control is-readonly">
                  <span style={{ color: "var(--gray-400)" }}>kg</span>
                  <input readOnly placeholder="000" value={newAmount(r)} />
                </div>
              </div>
              <button
                className="icon-btn"
                style={{ marginTop: 30, border: "1px solid var(--gray-300)", borderRadius: 8 }}
                onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          ))}
          <button className="add-product-btn" onClick={() => setRows((rs) => [...rs, { product: "", amount: "", roundUp: true }])}>
            <Icon name="plus" size={15} /> Add product
          </button>
        </div>

        <div className="divider" style={{ maxWidth: 1080 }} />
        <div className="field" style={{ maxWidth: 1080 }}>
          <label>Description</label>
          <textarea className="plain" placeholder="Enter roast session description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
