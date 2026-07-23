import Svg, { Path, Circle } from "react-native-svg";

const paths: Record<string, string[]> = {
  flame: ["M12 3c1.5 3-1.5 4.5-1.5 7a3.5 3.5 0 0 0 7 .3C19.5 13 20 15 20 16a8 8 0 1 1-16 0c0-5 5-7 8-13Z"],
  trend: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  layers: ["M12 3 3 8l9 5 9-5-9-5Z", "M3 12l9 5 9-5", "M3 16l9 5 9-5"],
  box: ["M21 8v8l-9 5-9-5V8l9-5 9 5Z", "M3.3 8.3 12 13l8.7-4.7", "M12 13v8"],
  play: ["M7 5v14l12-7L7 5Z"],
  stop: ["M6 6h12v12H6Z"],
  star: ["m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7L12 3Z"],
  clock: ["M12 7v5l3 2"],
  thermo: ["M10 4a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0V4Z", "M12 9v7"],
  bean: ["M6.5 4.5c4-2.5 9.5-1 11.5 3s.5 9-3.5 11.5-9.5 1-11.5-3 .5-9 3.5-11.5Z", "M8 6c3 2 3 5 2 8s-1 5 1 6"],
  chevR: ["m9 6 6 6-6 6"],
  gauge: ["M5 19a9 9 0 1 1 14 0", "M12 13l4-4"],
};

export function Icon({
  name,
  size = 22,
  color = "#667085",
  strokeWidth = 1.8,
}: {
  name: keyof typeof paths | string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const d = paths[name] ?? paths.box;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "clock" && <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />}
      {d.map((p, i) => (
        <Path key={i} d={p} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={name === "star" ? "none" : "none"} />
      ))}
    </Svg>
  );
}

export function Star({ filled, size = 18 }: { filled: boolean; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7L12 3Z"
        fill={filled ? "#FFAD0A" : "#EAECF0"}
        stroke={filled ? "#FFAD0A" : "#D0D5DD"}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34">
      <Path d="M6 0h22a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Z" fill="#0F4C81" />
      <Path
        d="M17 7a10 10 0 1 0 10 10h-4.2a5.8 5.8 0 1 1-1.7-4.1H17v4.1h10V7h-3.4v2.4A9.97 9.97 0 0 0 17 7Z"
        fill="#fff"
      />
    </Svg>
  );
}
