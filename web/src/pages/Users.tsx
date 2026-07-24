import { useState } from "react";
import { Icon } from "../components/Icon";
import { Badge, Banner, Drawer, Pagination, Toggle } from "../components/ui";
import { roasters } from "../data";

type User = { name: string; handle: string; role: string; active: boolean; email: string; sessions: number };

const ROLES = ["Admin", "Head Roaster", "Roaster", "Roaster", "Quality Lab", "Roaster"];

const initialUsers: User[] = roasters.map((r, i) => ({
  name: r.name,
  handle: r.handle,
  role: ROLES[i],
  active: i !== 3,
  email: `${r.handle.slice(1)}@genioroasters.co.za`,
  sessions: [4, 7, 3, 5, 2, 6][i],
}));

/** No dedicated Figma frame was captured for User Management — table pattern reuses the
 *  design system; delete confirmation mirrors the frame 35/38 modal. */
export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [addOpen, setAddOpen] = useState(false);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Roaster");
  const [active, setActive] = useState(true);

  const addUser = () => {
    const handle = "@" + (name.trim().split(" ")[0] || "user").toLowerCase();
    setUsers((u) => [...u, { name: name.trim(), handle, role, active, email: email.trim(), sessions: 0 }]);
    setAddOpen(false);
    setName(""); setEmail(""); setRole("Roaster"); setActive(true);
  };

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>User Management</h1>
            <div className="sub">Manage roastery users, roles and access.</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => setAddOpen(true)}><Icon name="plus" size={16} /> Add User</button>
          </div>
        </div>
        <div className="table-card">
          <table className="uui">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email</th>
                <th>Sessions this week</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.handle + u.email}>
                  <td>
                    <div className="cell-product">
                      <img src="/assets/avatar-olivia.png" alt="" />
                      <div>
                        <div className="name">{u.name}</div>
                        <div className="sub">{u.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.role}</td>
                  <td><Badge kind={u.active ? "success" : "gray"}>{u.active ? "Active" : "Invited"}</Badge></td>
                  <td>{u.email}</td>
                  <td>{u.sessions}</td>
                  <td>
                    <div style={{ display: "flex", gap: 2 }}>
                      <button className="icon-btn" title="Delete user" onClick={() => setToDelete(u)}>
                        <Icon name="trash" size={16} />
                      </button>
                      <button className="icon-btn" title="Edit user"><Icon name="pencil" size={16} /></button>
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
          icon="users"
          title="Add a new user"
          subtitle="Invite a user to your roastery workspace"
          onClose={() => setAddOpen(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={!name.trim() || !email.trim()} onClick={addUser}>Add User</button>
            </>
          }
        >
          <div className="field">
            <label>Full name</label>
            <div className="control">
              <input placeholder="Enter the user's full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="control">
              <Icon name="mail" size={16} />
              <input placeholder="user@genioroasters.co.za" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Role</label>
            <div className="control is-select">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {["Admin", "Head Roaster", "Roaster", "Quality Lab"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Activate immediately</label>
            <Toggle on={active} onChange={setActive} label={active ? "Yes" : "No"} />
          </div>
        </Drawer>
      )}

      {toDelete && (
        <div className="modal-scrim" onClick={() => setToDelete(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon"><Icon name="alert" size={20} /></div>
            <div className="modal-title">You are about to Delete this user</div>
            <div className="modal-sub">
              Once removed, {toDelete.name} will lose access to ProRoast. All roast profiles associated with this user will be set to default.
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setUsers((u) => u.filter((x) => x !== toDelete));
                  setToDelete(null);
                }}
              >
                Remove user
              </button>
              <button className="btn btn-cancel" onClick={() => setToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
