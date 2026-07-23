import { View, Text, StyleSheet } from "react-native";
import Svg, { Polyline, Rect, Line } from "react-native-svg";
import { colors, radius } from "./theme";
import { RoastData, ROAST_DURATION, fmtClock } from "./sim";

const W = 1000;
const H = 240;
const T_MIN = 25;
const T_MAX = 400;
const xOf = (t: number) => (t / ROAST_DURATION) * W;
const yOf = (v: number) => H - ((v - T_MIN) / (T_MAX - T_MIN)) * H;
const rorScale = (r: number) => Math.max(T_MIN, Math.min(T_MAX, r * 16 + 30));

function pts(points: [number, number][]) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

export function MobileChart({ data, elapsed }: { data: RoastData; elapsed: number }) {
  const visible = data.samples.filter((s) => s.t <= Math.max(elapsed, 1));
  const { yellowingEnd, firstCrack } = data.phases;

  const series: { key: "bean" | "air" | "exhaust" | "drum"; color: string }[] = [
    { key: "exhaust", color: colors.chart.exhaust },
    { key: "air", color: colors.chart.air },
    { key: "drum", color: colors.chart.drum },
    { key: "bean", color: colors.chart.bean },
  ];

  return (
    <View style={st.wrap}>
      <Svg width="100%" height={200} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* grid */}
        {[0.25, 0.5, 0.75].map((k) => (
          <Line key={k} x1={0} x2={W} y1={H * k} y2={H * k} stroke={colors.border} strokeWidth={1} />
        ))}
        {/* phase markers */}
        {elapsed >= yellowingEnd && (
          <Line x1={xOf(yellowingEnd)} x2={xOf(yellowingEnd)} y1={0} y2={H} stroke={colors.navy} strokeWidth={2} opacity={0.75} />
        )}
        {elapsed >= firstCrack && (
          <Line x1={xOf(firstCrack)} x2={xOf(firstCrack)} y1={0} y2={H} stroke={colors.navy} strokeWidth={2} opacity={0.75} />
        )}
        {/* cracks */}
        {data.cracks
          .filter((c) => c.t <= elapsed)
          .map((c, i) => (
            <Rect key={i} x={xOf(c.t) - 3} y={H * 0.62 - c.intensity * 70} width={6} height={c.intensity * 70 + 14} fill={colors.chart.crack} rx={2} />
          ))}
        {/* temp series */}
        {series.map(({ key, color }) =>
          visible.length > 1 ? (
            <Polyline key={key} points={pts(visible.map((s) => [xOf(s.t), yOf(s[key])]))} fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round" />
          ) : null
        )}
        {/* RoR (scaled onto temp axis, drawn after turn point like the web cockpit) */}
        {visible.filter((s) => s.t > 150).length > 1 && (
          <Polyline
            points={pts(visible.filter((s) => s.t > 150 && s.ror > 0).map((s) => [xOf(s.t), yOf(rorScale(s.ror))]))}
            fill="none"
            stroke={colors.chart.ror}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
        {/* cursor */}
        <Line x1={xOf(Math.min(elapsed, ROAST_DURATION))} x2={xOf(Math.min(elapsed, ROAST_DURATION))} y1={0} y2={H} stroke={colors.borderStrong} strokeWidth={1.5} strokeDasharray="6 5" />
      </Svg>
      <View style={st.axis}>
        {["00:00", "04:00", "08:00", "12:00", "18:30"].map((l) => (
          <Text key={l} style={st.axisLabel}>{l}</Text>
        ))}
      </View>
      <PhaseBar elapsed={elapsed} data={data} />
    </View>
  );
}

function PhaseBar({ elapsed, data }: { elapsed: number; data: RoastData }) {
  const { yellowingEnd, firstCrack, drop } = data.phases;
  const p1 = Math.min(1, elapsed / yellowingEnd);
  const p2 = Math.min(1, Math.max(0, (elapsed - yellowingEnd) / (firstCrack - yellowingEnd)));
  const p3 = Math.min(1, Math.max(0, (elapsed - firstCrack) / (drop - firstCrack)));
  const segs = [
    { label: `Yellowing ${fmtClock(Math.min(elapsed, yellowingEnd))}`, frac: p1, color: colors.navy },
    { label: `First Crack ${(p2 * 100).toFixed(0)}%`, frac: p2, color: colors.blue },
    { label: `Drop ${(p3 * 100).toFixed(0)}%`, frac: p3, color: colors.sky },
  ];
  return (
    <View style={st.phaseRow}>
      {segs.map((s) => (
        <View key={s.label} style={st.phaseSeg}>
          <View style={[st.phaseFill, { width: `${s.frac * 100}%`, backgroundColor: s.color }]} />
          <Text style={[st.phaseLabel, s.frac > 0.5 && { color: "#fff" }]} numberOfLines={1}>
            {s.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { gap: 8 },
  axis: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2 },
  axisLabel: { fontSize: 10, color: colors.faint, fontVariant: ["tabular-nums"] },
  phaseRow: { flexDirection: "row", gap: 4 },
  phaseSeg: { flex: 1, height: 26, borderRadius: radius.sm, backgroundColor: "#EEF2F6", overflow: "hidden", justifyContent: "center" },
  phaseFill: { position: "absolute", left: 0, top: 0, bottom: 0 },
  phaseLabel: { fontSize: 9.5, fontWeight: "600", color: colors.sub, paddingHorizontal: 6 },
});
