import { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Drawer, Stars } from "../components/ui";
import { RoastChart } from "../components/RoastChart";
import { generateRoast } from "../sim/roast";
import { beans, roastProfiles, roasters } from "../data";

const reviewData = generateRoast(7);

/** Profile detail (frames 13/37) — chart review + Edit drawer, reached from the profiles table */
export default function Profiles() {
  const { id } = useParams();
  const selected = roastProfiles.find((p) => p.id === id) ?? roastProfiles[0];
  const [drawer, setDrawer] = useState(true);
  const [profile, setProfile] = useState(selected);
  const [rating, setRating] = useState(selected.rating);

  return (
    <div className="live" style={{ height: "100%" }}>
      <div className="live-head" style={{ borderBottom: 0, paddingBottom: 0 }}>
        <div>
          <h1 style={{ fontSize: 24 }}>Rosting profiles</h1>
          <div style={{ color: "var(--gray-500)", fontSize: 13, marginTop: 4 }}>
            View all roasting profiles, edit and adjust to make the perfect roast
          </div>
        </div>
        <div className="right">
          <button className="btn btn-primary btn-sm" onClick={() => setDrawer(true)}>
            <Icon name="plus" size={15} /> Add Profile
          </button>
        </div>
      </div>
      <div className="live-body">
        <div className="live-center" style={{ padding: "16px 20px 14px" }}>
          <RoastChart data={reviewData} elapsed={0} running={false} review />
        </div>
      </div>

      {drawer && (
        <Drawer
          icon="pencil"
          title="Edit Roast profile"
          subtitle="Edit this roast profile"
          onClose={() => setDrawer(false)}
          scrim={false}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setDrawer(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => setDrawer(false)}>Edit</button>
            </>
          }
        >
          <div className="field">
            <label>Roast profile name</label>
            <div className="control">
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label>Roast profile ID</label>
            <div className="control is-readonly"><input readOnly value={profile.id} /></div>
          </div>
          <div className="field">
            <label>Roster</label>
            <div className="control is-select">
              <select value={profile.roaster} onChange={(e) => setProfile({ ...profile, roaster: e.target.value })}>
                {roasters.map((r) => (
                  <option key={r.handle} value={r.name.replace("'s", "s")}>{r.name.replace("'s", "s")}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Save as default for:</label>
            <div className="control is-select">
              <select value={profile.defaultFor} onChange={(e) => setProfile({ ...profile, defaultFor: e.target.value })}>
                {beans.map((b) => (
                  <option key={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Rate this roast profile</label>
            <Stars value={rating} onChange={setRating} />
          </div>
          <div className="field">
            <label>Profile notes</label>
            <textarea className="plain" value={profile.notes} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} />
          </div>
        </Drawer>
      )}
    </div>
  );
}
