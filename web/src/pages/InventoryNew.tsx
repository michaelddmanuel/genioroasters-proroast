import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner, Breadcrumb } from "../components/ui";

export default function InventoryNew() {
  const nav = useNavigate();
  const [desc, setDesc] = useState(
    "Costa Rica Fancy is a high-quality coffee variety known for its exceptional taste. It offers a medium body, bright acidity, and a well-balanced flavor profile. This coffee often exhibits notes of citrus, chocolate, and caramel, with a hint of floral or fruity undertones. Costa Rica Fancy is highly regarded for its consistent quality and is a popular choice among coffee enthusiasts seeking a delightful and satisfying cup of coffee."
  );

  return (
    <div>
      <Banner />
      <div className="page-body">
        <Breadcrumb items={["Inventory"]} />
        <div className="page-head">
          <div>
            <h1>Add new stock</h1>
            <div className="sub">Add stock items to inventory List, Mange control and check Inventory stock.</div>
          </div>
          <div className="actions">
            <button className="btn btn-outline btn-sm" onClick={() => nav("/inventory")}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => nav("/inventory")}>Save</button>
          </div>
        </div>

        <div style={{ maxWidth: 1080 }}>
          <div style={{ marginTop: 8 }}>
            <div className="form-section-title">Stock item details</div>
            <div className="form-section-sub">This will be displayed on inventory Table</div>
            <div className="form-grid-3">
              <div className="field">
                <label>Item Group</label>
                <div className="control is-select">
                  <select defaultValue="Green Beans">
                    <option>Green Beans</option>
                    <option>Packaging</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Item Name</label>
                <div className="control"><input defaultValue="Costa Rica" /></div>
              </div>
              <div className="field">
                <label>Item Number</label>
                <div className="control"><input placeholder="A-00000-G" /></div>
              </div>
              <div className="field">
                <label>Location</label>
                <div className="control is-select">
                  <select defaultValue="Costa Rica">
                    <option>Costa Rica</option>
                    <option>Warehouse A</option>
                    <option>Warehouse B</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>UoM</label>
                <div className="control is-select">
                  <select defaultValue="kg">
                    <option>kg</option>
                    <option>lb</option>
                    <option>bags</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Reorder Point</label>
                <div className="control"><input placeholder="000" /></div>
              </div>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <label>My Description</label>
              <textarea className="plain" style={{ minHeight: 110 }} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>

          <div className="divider" />

          <div>
            <div className="form-section-title">Green Bean attributes</div>
            <div className="form-section-sub">This will be displayed on inventory Table</div>
            <div className="form-grid-3">
              <div className="field">
                <label>Country of Origin</label>
                <div className="control is-select">
                  <select defaultValue="Costa Rica">
                    <option>Costa Rica</option>
                    <option>Ethiopia</option>
                    <option>Colombia</option>
                    <option>Jamaica</option>
                    <option>Kenya</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Full Name</label>
                <div className="control"><input placeholder="Costa Rica Fancy" /></div>
              </div>
              <div className="field">
                <label>Processing Method</label>
                <div className="control is-select">
                  <select defaultValue="">
                    <option value="">Washed</option>
                    <option>Natural</option>
                    <option>Honey</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Region</label>
                <div className="control"><input placeholder="Tarrazú" /></div>
              </div>
              <div className="field">
                <label>Altitude</label>
                <div className="control"><input placeholder="1,200 – 1,800 masl" /></div>
              </div>
              <div className="field">
                <label>Screen Size</label>
                <div className="control"><input placeholder="16/17" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
