type IconProps = {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
};

const paths: Record<string, React.ReactNode> = {
  flame: (
    <path d="M12 3c.5 3-1.5 4.5-2.8 6C7.8 10.6 7 12.2 7 14a5 5 0 0 0 10 0c0-1.5-.5-2.9-1.4-4.1-.4 1-1 1.6-1.8 2.1.3-2.6-.3-6.4-1.8-9z" />
  ),
  trend: (
    <>
      <path d="M3 17l5.5-5.5 3.5 3.5L21 6.5" />
      <path d="M15.5 6.5H21V12" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <path d="M15.5 5.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.5 15.3c1.7.6 2.7 1.9 3 4.2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 20.5 7.5v9L12 21l-8.5-4.5v-9L12 3z" />
      <path d="M3.5 7.5 12 12l8.5-4.5" />
      <path d="M12 12v9" />
    </>
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M5.7 5.7l3.9 3.9M14.4 14.4l3.9 3.9M18.3 5.7l-3.9 3.9M9.6 14.4l-3.9 3.9" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 21v-6M5 11V3M12 21v-9M12 8V3M19 21v-4M19 13V3" />
      <path d="M2.8 15h4.4M9.8 8h4.4M16.8 17h4.4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4-4" />
    </>
  ),
  logout: (
    <>
      <path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15" />
      <path d="M10 8l-4 4 4 4M6 12h10" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5z" />
    </>
  ),
  "chevron-right": <path d="M9 5l7 7-7 7" />,
  "chevron-down": <path d="M5 9l7 7 7-7" />,
  "chevron-up": <path d="M5 15l7-7 7 7" />,
  pencil: (
    <>
      <path d="M4 20h4.5L20 8.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20z" />
      <path d="M14.5 6 18 9.5" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M6.5 7l1 12.4a1.6 1.6 0 0 0 1.6 1.6h5.8a1.6 1.6 0 0 0 1.6-1.6l1-12.4" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  note: (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6V3.5z" />
      <path d="M14 3.5V8h5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  calendar: (
    <>
      <rect x="4" y="6" width="16" height="15" rx="2" />
      <path d="M4 10.5h16M8.5 3.5V7M15.5 3.5V7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  "arrow-up": <path d="M12 19V5M6 11l6-6 6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  swap: <path d="M7 4v13M4 14.5 7 17.5l3-3M17 20V7M14 9.5 17 6.5l3 3" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.8v.3" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14.5 12.5l-3-3 3.2-3.2z" />
  ),
  alert: (
    <>
      <path d="M12 3.5 22 20H2L12 3.5z" />
      <path d="M12 10v4.5M12 17.3v.3" />
    </>
  ),
  comment: (
    <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12z" />
  ),
  thermometer: (
    <>
      <path d="M10 13.7V5a2 2 0 1 1 4 0v8.7a4.5 4.5 0 1 1-4 0z" />
      <circle cx="12" cy="17.5" r="1.6" />
    </>
  ),
  save: (
    <>
      <path d="M5 4h11l3 3v13H5V4z" />
      <path d="M8 4v5h7V4M8 20v-6h8v6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7 12 13l8.5-6" />
    </>
  ),
};

export function Icon({ name, size = 20, stroke = 1.7, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

/** ProRoast "G" logo mark */
export function LogoMark({ size = 30, color = "#fff", accent = "#6BB2EA" }: { size?: number; color?: string; accent?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 3a13 13 0 1 0 13 13h-5.2A7.8 7.8 0 1 1 16 8.2V3z"
        fill={color}
      />
      <path d="M16 12.5h11.5V16H16v-3.5z" fill={color} />
      <circle cx="24.5" cy="6.5" r="3" fill={accent} />
    </svg>
  );
}
