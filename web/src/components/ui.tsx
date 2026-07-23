import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Badge({ kind, children }: { kind: "success" | "warning" | "error" | "info" | "gray"; children: ReactNode }) {
  return (
    <span className={`badge badge-${kind}`}>
      <span className="dot" />
      {children}
    </span>
  );
}

export function Progress({ value, blue }: { value: number; blue?: boolean }) {
  return (
    <div className={"progress" + (blue ? " blue" : "")}>
      <div className="track">
        <div className="fill" style={{ width: `${value}%` }} />
      </div>
      <span className="pct">{value}%</span>
    </div>
  );
}

export function Pagination() {
  const pages = ["1", "2", "3", "…", "8", "9", "10"];
  return (
    <div className="pagination">
      <button className="nav">
        <Icon name="arrow-left" size={16} /> Previous
      </button>
      <div className="pages">
        {pages.map((p, i) => (
          <button key={i} className={"page" + (p === "1" ? " active" : "")}>{p}</button>
        ))}
      </div>
      <button className="nav">
        Next <Icon name="arrow-right" size={16} />
      </button>
    </div>
  );
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="breadcrumb">
      <Icon name="home" size={17} />
      {items.map((it) => (
        <span key={it} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Icon name="chevron-right" size={14} />
          <span className="crumb">{it}</span>
        </span>
      ))}
    </div>
  );
}

export function Banner() {
  return <div className="page-banner" style={{ backgroundImage: "url(/assets/beans-banner.jpg)" }} />;
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange?: (v: boolean) => void; label?: string }) {
  return (
    <span className="toggle">
      <button type="button" className={"track" + (on ? " on" : "")} onClick={() => onChange?.(!on)} aria-pressed={on} />
      {label}
    </span>
  );
}

export function Stars({ value, max = 10, onChange }: { value: number; max?: number; onChange?: (v: number) => void }) {
  return (
    <div className="stars">
      {Array.from({ length: max }, (_, i) => (
        <button key={i} type="button" onClick={() => onChange?.(i + 1)} aria-label={`${i + 1} stars`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={i < value ? "#FDB022" : "#E4E7EC"}>
            <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export function Drawer({
  icon = "save",
  title,
  subtitle,
  onClose,
  children,
  footer,
  scrim = true,
}: {
  icon?: string;
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
  scrim?: boolean;
}) {
  return (
    <>
      {scrim && <div className="drawer-scrim" onClick={onClose} />}
      <div className="drawer" role="dialog" aria-label={title}>
        <div className="drawer-head">
          <div className="ic">
            <Icon name={icon} size={19} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="t">{title}</div>
            <div className="s">{subtitle}</div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        <div className="drawer-foot">{footer}</div>
      </div>
    </>
  );
}
