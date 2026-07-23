import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Badge, Banner, Breadcrumb, Pagination, Progress } from "../components/ui";
import { scheduleRows } from "../data";

const statusKind: Record<string, "success" | "warning" | "error"> = {
  Done: "success",
  Paused: "warning",
  Error: "error",
};

export default function Schedule() {
  const nav = useNavigate();
  return (
    <div>
      <Banner />
      <div className="page-body">
        <Breadcrumb items={["Add new"]} />
        <div className="page-head">
          <div>
            <h1>Schedule</h1>
            <div className="sub">View, Add remove Roasting Schedule</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => nav("/schedule/new")}>
              <Icon name="plus" size={16} /> Roasting Session
            </button>
          </div>
        </div>

        <div className="table-card">
          <table className="uui">
            <thead>
              <tr>
                <th>Product</th>
                <th>User</th>
                <th>Date Scheduled</th>
                <th>Total Yield</th>
                <th>Progress</th>
                <th>Roast session status</th>
                <th>Machine</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((r) => (
                <tr key={r.code}>
                  <td>
                    <div className="cell-product">
                      <img src="/assets/bean-thumb.png" alt="" />
                      <div>
                        <div className="name">{r.product}</div>
                        <div className="sub">{r.code}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-user">
                      <div className="name">{r.user.name}</div>
                      <div className="sub">{r.user.handle}</div>
                    </div>
                  </td>
                  <td>{r.date}</td>
                  <td>{r.yieldKg} kg</td>
                  <td><Progress value={r.progress} /></td>
                  <td><Badge kind={statusKind[r.status]}>{r.status === "Paused" ? "Pasued" : r.status}</Badge></td>
                  <td>{r.machine}</td>
                  <td style={{ maxWidth: 220, color: "var(--gray-500)" }}>{r.description}</td>
                  <td>
                    <button className="icon-btn" onClick={() => nav("/schedule/new")}>
                      <Icon name="pencil" size={16} />
                    </button>
                  </td>
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
