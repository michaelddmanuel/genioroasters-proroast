import { useState } from "react";
import { Icon } from "../components/Icon";
import { Banner } from "../components/ui";

/** No dedicated Figma frame — built from the ProRoast design system (flagged as adaptation). */
const FAQS = [
  { q: "My roaster won't connect to ProRoast", a: "Check the probe link cable and restart the ProRoast Evolution control unit. In this demo build the telemetry is simulated, so no hardware connection is required — press Start Roast on Live Roasting to see it stream." },
  { q: "How do I save a roast profile?", a: "During or after a roast, hover the current batch in the queue and choose “Save Roast profile”, or use Save Batch in the Roast Profile Data panel. Saved profiles appear under Roasting Profiles." },
  { q: "How is Rate of Rise calculated?", a: "Bean RoR is the change in bean temperature over a rolling 30-second window (°C/30s), derived from the probe curve after the turning point." },
  { q: "What do the roast modes mean?", a: "Preheat brings the drum to charge temperature, Roasting is the active roast, Cooldown runs the cooling tray cycle, and Standby means the machine is idle and ready." },
  { q: "Can ProRoast control the roaster's heat?", a: "No — v1 telemetry is read-only for safety. ProRoast reads temperatures, fan, power and RPM but never commands the burner. Heat control remains on the machine." },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div>
      <Banner />
      <div className="page-body">
        <div className="page-head">
          <div>
            <h1>Support</h1>
            <div className="sub">We're here to help you get the most out of your ProRoast Evolution.</div>
          </div>
        </div>

        <div className="support-cards">
          <div className="support-card">
            <div className="ic"><Icon name="mail" size={20} /></div>
            <div className="t">Email support</div>
            <div className="s">Replies within one business day.</div>
            <a href="mailto:support@genioroasters.co.za">support@genioroasters.co.za</a>
          </div>
          <div className="support-card">
            <div className="ic"><Icon name="note" size={20} /></div>
            <div className="t">Documentation</div>
            <div className="s">Machine manuals and roasting guides.</div>
            <a href="#" onClick={(e) => e.preventDefault()}>ProRoast Evolution manual</a>
          </div>
          <div className="support-card">
            <div className="ic"><Icon name="comment" size={20} /></div>
            <div className="t">Talk to us</div>
            <div className="s">Mon–Fri, 08:00–17:00 SAST.</div>
            <a href="tel:+27219450000">+27 21 945 0000</a>
          </div>
        </div>

        <div className="settings-grid">
          <div className="table-card" style={{ padding: "6px 0" }}>
            <div className="card-sec-t">Frequently asked questions</div>
            {FAQS.map((f, i) => (
              <div className={"faq" + (open === i ? " open" : "")} key={f.q}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <Icon name="chevron-down" size={16} />
                </button>
                {open === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>

          <div className="table-card" style={{ padding: "0 0 16px" }}>
            <div className="card-sec-t">Contact us</div>
            <div className="form-col">
              <div className="field">
                <label>Your name</label>
                <div className="control"><input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} /></div>
              </div>
              <div className="field">
                <label>Email</label>
                <div className="control"><Icon name="mail" size={16} /><input placeholder="you@roastery.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
              <div className="field">
                <label>How can we help?</label>
                <textarea className="plain" placeholder="Describe the issue…" value={msg} onChange={(e) => setMsg(e.target.value)} />
              </div>
              {sent && <div className="panel-note" style={{ borderColor: "var(--success-500)", color: "#3F8927", background: "var(--success-tint, #EDF9E8)" }}>Message sent — we'll get back to you shortly.</div>}
              <button
                className="btn btn-primary"
                disabled={!name.trim() || !email.trim() || !msg.trim()}
                onClick={() => { setSent(true); setName(""); setEmail(""); setMsg(""); }}
              >
                <Icon name="mail" size={15} /> Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
