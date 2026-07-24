import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Banner, Drawer, Pagination, Stars } from "../components/ui";
import { beans, roastProfiles, roasters } from "../data";

/** Roasting Profiles table (frame 36 · 10506-441945). The design's Profile Name
 *  column reads "Green Beans" on every row (source content) — preserved; Profile IDs
 *  use the CRF-000xx-GEVO pattern from the edit drawer so rows stay distinguishable. */
export default function ProfilesList() {
  const nav = useNavigate();
  const [tab, setTab] = useState("All");
  const [rows, setRows] = useState(roastProfiles.map((p, i) => ({ ...p, key: p.id, roasterRef: roasters[i % roasters.length], description: beans[i % beans.length].description })));
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRoaster, setNewRoaster] = useState(roasters[0].name.replace("'s", "s"));
  const [newDefaultFor, setNewDefaultFor] = useState(beans[0].name);
  const [newRating, setNewRating] = useState(8);
  const [newNotes, setNewNotes] = useState("");

  const addProfile = () => {
    const bean = beans.find((b) => b.name === newDefaultFor) ?? beans[0];
    const initials = bean.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
    const id = `${initials} -00${140 + rows.length}- GEVO`;
    const roasterRef = roasters.find((r) => r.name.replace("'s", "s") === newRoaster) ?? roasters[0];
    setRows((r) => [...r, { name: newName.trim(), id, key: id, roaster: newRoaster, defaultFor: newDefaultFor, rating: newRating, notes: newNotes, roasterRef, description: bean.description }]);
    setAddOpen(false);
    setNewName(""); setNewRating(8); setNewNotes("");
  };

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>Rosting profiles</h1>
            <div className="sub">View all roasting profiles, edit and adjust to make the perfect roast</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => setAddOpen(true)}><Icon name="plus" size={16} /> Add Profile</button>
          </div>
        </div>
        <div className="table-card">
          <div className="seg-tabs" style={{ margin: "14px 16px 2px" }}>
            {["All", "Profile ID", "Roasters", "Score"].map((t) => (
              <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <table className="uui">
            <thead>
              <tr>
                <th>Profile Name</th>
                <th>Profile ID</th>
                <th>Rosters</th>
                <th>Roast Profile Score</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.key} style={{ cursor: "pointer" }} onClick={() => nav(`/profiles/${encodeURIComponent(p.key)}`)}>
                  <td style={{ fontWeight: 600, color: "var(--gray-900)" }}>Green Beans</td>
                  <td>{p.id}</td>
                  <td>
                    <div className="cell-product">
                      <img src="/assets/avatar-olivia.png" alt="" />
                      <div>
                        <div className="name">{p.roasterRef.name}</div>
                        <div className="sub">{p.roasterRef.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="score-stars">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                          <path
                            d="m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7L12 3Z"
                            fill={i < p.rating + 1 ? "var(--warning-500)" : "var(--gray-200)"}
                          />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="desc">{p.description}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 2 }}>
                      <button className="icon-btn" title="Delete profile" onClick={() => setToDelete(p.key)}>
                        <Icon name="trash" size={16} />
                      </button>
                      <button className="icon-btn" title="View profile" onClick={() => nav(`/profiles/${encodeURIComponent(p.key)}`)}>
                        <Icon name="eye" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>

      {addOpen && (
        <Drawer
          icon="plus"
          title="Add Roast profile"
          subtitle="Create a new roast profile"
          onClose={() => setAddOpen(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={!newName.trim()} onClick={addProfile}>Add Profile</button>
            </>
          }
        >
          <div className="field">
            <label>Roast profile name</label>
            <div className="control">
              <input placeholder="Enter a roast profile name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Roster</label>
            <div className="control is-select">
              <select value={newRoaster} onChange={(e) => setNewRoaster(e.target.value)}>
                {roasters.map((r) => (
                  <option key={r.handle} value={r.name.replace("'s", "s")}>{r.name.replace("'s", "s")}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Save as default for:</label>
            <div className="control is-select">
              <select value={newDefaultFor} onChange={(e) => setNewDefaultFor(e.target.value)}>
                {beans.map((b) => (
                  <option key={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Rate this roast profile</label>
            <Stars value={newRating} onChange={setNewRating} />
          </div>
          <div className="field">
            <label>Profile notes</label>
            <textarea className="plain" placeholder="Add in roast profile notes." value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
          </div>
        </Drawer>
      )}

      {toDelete && (
        <div className="modal-scrim" onClick={() => setToDelete(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon"><Icon name="alert" size={20} /></div>
            <div className="modal-title">You are about to Delete this roasting profile</div>
            {/* copy is verbatim from frame 35 (incl. "Raost") — preserved (1:1) */}
            <div className="modal-sub">
              Once removed this roasting profile will alter your roasts settings. all Raost profiles associated with this profile will be set to default.
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setRows((r) => r.filter((x) => x.key !== toDelete));
                  setToDelete(null);
                }}
              >
                Remove roast profile
              </button>
              <button className="btn btn-cancel" onClick={() => setToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
