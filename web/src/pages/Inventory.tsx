import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Badge, Banner, Pagination } from "../components/ui";
import { beans } from "../data";

const TABS = ["View all", "Green beans", "Other", "In stock", "Out of stock"] as const;

export default function Inventory() {
  const nav = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]>("View all");
  const [q, setQ] = useState("");

  const rows = beans.filter((b) => {
    if (q && !b.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (tab === "In stock") return b.status === "in";
    if (tab === "Out of stock") return b.status === "out";
    if (tab === "Other") return false;
    return true;
  });

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>Stock</h1>
            <div className="sub">Manage your Inventory for Green bean Stock and all accompanying Stock items.</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => nav("/inventory/new")}>
              <Icon name="plus" size={16} /> Add Stock
            </button>
          </div>
        </div>

        <div className="tabs-row">
          <div className="seg-tabs">
            {TABS.map((t) => (
              <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="search-filter">
            <div className="control">
              <Icon name="search" size={16} />
              <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <button className="btn btn-outline btn-sm"><Icon name="filter" size={15} /> Filter</button>
          </div>
        </div>

        <div className="table-card">
          <table className="uui">
            <thead>
              <tr>
                <th style={{ width: 34 }}><input type="checkbox" /></th>
                <th>Product</th>
                <th>Description</th>
                <th>Notes</th>
                <th>Product Group</th>
                <th>Last updated</th>
                <th>In stock</th>
                <th>Available</th>
                <th>Booked</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.code}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="cell-product">
                      <img src="/assets/bean-thumb.png" alt="" />
                      <div>
                        <div className="name">{b.name}</div>
                        <div className="sub">{b.code}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: 230, color: "var(--gray-500)" }}>{b.description}</td>
                  <td>
                    <span style={{ position: "relative", display: "inline-flex", color: "var(--navy-mid)" }}>
                      <Icon name="note" size={20} />
                      <span style={{
                        position: "absolute", top: -6, right: -8, background: "var(--navy)", color: "#fff",
                        fontSize: 8.5, fontWeight: 700, borderRadius: 999, padding: "1px 4px",
                      }}>{b.notes}</span>
                    </span>
                  </td>
                  <td>{b.group}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {b.status === "in" && <Badge kind="success">In stock</Badge>}
                      {b.status === "out" && <Badge kind="error">Out of stock</Badge>}
                      {b.status === "reorder" && <Badge kind="warning">Below Re-order</Badge>}
                      {b.booked && <Badge kind="info">Booked</Badge>}
                    </div>
                  </td>
                  <td><span className="kg-chip">{b.inStock} kg</span></td>
                  <td><span className="kg-chip">{b.available} kg</span></td>
                  <td><span className="kg-chip">{b.bookedKg} kg</span></td>
                  <td>
                    <button className="icon-btn" onClick={() => nav("/inventory/new")}>
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
