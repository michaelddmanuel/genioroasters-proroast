import { Icon } from "../components/Icon";
import { Badge, Banner, Pagination } from "../components/ui";
import { roasters } from "../data";

/** No dedicated Figma frame was captured for User Management — this page reuses the
 *  Schedule/Stock table pattern from the same design system (flagged as inferred). */
export default function Users() {
  const roles = ["Admin", "Head Roaster", "Roaster", "Roaster", "Quality Lab", "Roaster"];
  const status: ("success" | "gray")[] = ["success", "success", "success", "gray", "success", "success"];
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
            <button className="btn btn-primary"><Icon name="plus" size={16} /> Add User</button>
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
              {roasters.map((r, i) => (
                <tr key={r.handle}>
                  <td>
                    <div className="cell-product">
                      <img src="/assets/avatar-olivia.png" alt="" />
                      <div>
                        <div className="name">{r.name}</div>
                        <div className="sub">{r.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td>{roles[i]}</td>
                  <td><Badge kind={status[i]}>{status[i] === "success" ? "Active" : "Invited"}</Badge></td>
                  <td>{r.handle.slice(1)}@genioroasters.co.za</td>
                  <td>{[4, 7, 3, 5, 2, 6][i]}</td>
                  <td><button className="icon-btn"><Icon name="pencil" size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
