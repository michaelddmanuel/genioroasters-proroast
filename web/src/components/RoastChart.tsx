import { Fragment } from "react";
import type { RoastData } from "../sim/roast";
import { ROAST_DURATION, fmtClock, sampleAt } from "../sim/roast";

const W = 1000;
const H_TOP = 260;
const H_BOT = 92;

const T_MIN = 25;
const T_MAX = 400;
const P_MIN = 20;
const P_MAX = 98;

type Series = "bean" | "air" | "exhaust" | "drum";

const SERIES_COLORS: Record<string, string> = {
  bean: "var(--c-bean)",
  air: "var(--c-air)",
  ror: "var(--c-ror)",
  exhaust: "var(--c-exhaust)",
  drum: "var(--c-drum)",
};

const xOf = (t: number) => (t / ROAST_DURATION) * W;
const yTemp = (v: number) => H_TOP - ((v - T_MIN) / (T_MAX - T_MIN)) * H_TOP;
const yPow = (v: number) => H_BOT - ((v - P_MIN) / (P_MAX - P_MIN)) * H_BOT;
const rorScale = (r: number) => Math.max(T_MIN, Math.min(T_MAX, r * 16 + 30));

function path(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

export function RoastChart({
  data,
  elapsed,
  running,
  review = false,
}: {
  data: RoastData;
  elapsed: number; // seconds of roast progressed (0 in standby)
  running: boolean;
  /** review mode: draw the complete historical curve with a fixed cursor (Roasting Profiles page) */
  review?: boolean;
}) {
  const upto = review ? ROAST_DURATION : running ? elapsed : 0;
  const visible = data.samples.filter((s) => s.t <= upto);
  const cursorT = review ? 8 * 60 + 34 : running ? elapsed : 8 * 60 + 34; // standby shows frozen cursor like the design
  const cur = sampleAt(data, review ? 8 * 60 + 34 : running ? elapsed : 0);
  const now = sampleAt(data, cursorT);
  const cracksSoFar = data.cracks.filter((c) => c.t <= upto);

  const tempGrid = [];
  for (let v = T_MIN; v <= T_MAX; v += 25) tempGrid.push(v);
  const powGrid = [20, 33, 46, 59, 72, 85, 98];
  const timeTicks = [];
  for (let t = 60; t < ROAST_DURATION; t += 30) timeTicks.push(t);
  const timeLabels = timeTicks.filter((t) => t % 60 === 0);

  const phaseX = [xOf(data.phases.yellowingEnd), xOf(data.phases.firstCrack)];
  const cursorX = xOf(cursorT);
  const pct = (x: number) => `${(x / W) * 100}%`;

  const tagValues: { label: string; value: string; color: string; series: Series | "ror" }[] = running || review
    ? [
        { label: "Exhaust Temp", value: review ? "270 °C" : `${Math.round(cur.exhaust)} °C`, color: SERIES_COLORS.exhaust, series: "exhaust" },
        { label: "Air Temp", value: review ? "230 °C" : `${Math.round(cur.air)} °C`, color: SERIES_COLORS.air, series: "air" },
        { label: "Bean Temp", value: review ? "230 °C" : `${Math.round(cur.bean)} °C`, color: SERIES_COLORS.bean, series: "bean" },
        { label: "Drum Temp", value: review ? "230 °C" : `${Math.round(cur.drum)} °C`, color: SERIES_COLORS.drum, series: "drum" },
      ]
    : [
        { label: "Air Temp", value: "230 °C", color: SERIES_COLORS.air, series: "air" },
        { label: "Exhaust Temp", value: "270 °C", color: SERIES_COLORS.exhaust, series: "exhaust" },
        { label: "Drum Temp", value: "230 °C", color: SERIES_COLORS.drum, series: "drum" },
      ];

  // standby tag stacking mimics frame 12 (fixed positions); running mode pins to curves
  const tagTop = (i: number, series: Series | "ror") => {
    if (!running && !review) return 38 + i * 10;
    const v = series === "ror" ? rorScale(now.ror) : now[series];
    return (yTemp(v) / H_TOP) * 100;
  };

  const isLive = running || review || elapsed > 0;

  return (
    <div className="chart-wrap">
      {/* ---------- top pane: temperatures ---------- */}
      <div className="chart-pane top">
        <span className="y-axis-label">Live roasting Graph Rate of Temperature</span>
        <svg viewBox={`0 0 ${W} ${H_TOP}`} preserveAspectRatio="none">
          {tempGrid.map((v) => (
            <line key={v} x1={0} x2={W} y1={yTemp(v)} y2={yTemp(v)} stroke="var(--gray-200)" strokeDasharray="3 4" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
          ))}
          {timeTicks.map((t) => (
            <line key={t} x1={xOf(t)} x2={xOf(t)} y1={0} y2={H_TOP} stroke="var(--gray-100)" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
          ))}
          {/* phase divider lines */}
          {phaseX.map((x, i) => (
            <line key={i} x1={x} x2={x} y1={0} y2={H_TOP} stroke="var(--navy)" strokeWidth={2.4} vectorEffect="non-scaling-stroke" />
          ))}
          {/* crack histogram */}
          {cracksSoFar.map((c, i) => (
            <rect key={i} x={xOf(c.t) - 1.6} width={3.2} y={H_TOP - 38 * c.intensity - 26} height={38 * c.intensity} fill="var(--c-cracks)" rx={1} />
          ))}
          {/* curves */}
          {isLive && visible.length > 1 && (
            <>
              <path d={path(visible.map((s) => [xOf(s.t), yTemp(s.exhaust)]))} fill="none" stroke={SERIES_COLORS.exhaust} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
              <path d={path(visible.map((s) => [xOf(s.t), yTemp(s.air)]))} fill="none" stroke={SERIES_COLORS.air} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
              <path d={path(visible.map((s) => [xOf(s.t), yTemp(s.bean)]))} fill="none" stroke={SERIES_COLORS.bean} strokeWidth={1.8} vectorEffect="non-scaling-stroke" />
              <path d={path(visible.map((s) => [xOf(s.t), yTemp(s.drum)]))} fill="none" stroke={SERIES_COLORS.drum} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
              <path d={path(visible.filter((s) => s.t > 150 && s.ror > 0).map((s) => [xOf(s.t), yTemp(rorScale(s.ror))]))} fill="none" stroke={SERIES_COLORS.ror} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
            </>
          )}
          {/* cursor */}
          <line x1={cursorX} x2={cursorX} y1={0} y2={H_TOP} stroke="var(--navy)" strokeWidth={1.2} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* floating value tags */}
        {tagValues.map((tag, i) => (
          <div key={tag.label} className="value-tag" style={{ left: pct(cursorX), top: `${tagTop(i, tag.series)}%` }}>
            <span className="pill">
              <span className="dot" style={{ background: tag.color }} />
              {tag.label}: {tag.value}
            </span>
            <span className="node">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="7" />
              </svg>
            </span>
          </div>
        ))}
        {isLive && cracksSoFar.length > 0 && (
          <div className="value-tag" style={{ left: pct(xOf(Math.min(cursorT + 40, ROAST_DURATION))), top: "84%" }}>
            <span className="pill">
              <span className="dot" style={{ background: "var(--c-cracks)" }} />
              Cracks ({String(cracksSoFar.length).padStart(2, "0")}): 0
            </span>
          </div>
        )}
      </div>

      {/* ---------- time axis ---------- */}
      <div className="time-axis">
        {timeLabels.map((t) => (
          <span key={t} style={{ left: pct(xOf(t)) }}>{fmtClock(t)}</span>
        ))}
        <div className="value-tag" style={{ left: pct(cursorX), top: "50%" }}>
          <span className="pill">
            <span className="dot" style={{ background: "var(--sky)" }} />
            Time {running ? fmtClock(elapsed, true) : "08:34:03"}
          </span>
          <span className="node">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="7" /><path d="M12 8v4l2.5 1.5" /></svg>
          </span>
        </div>
      </div>

      {/* ---------- bottom pane: fan / power / rpm ---------- */}
      <div className="chart-pane bottom">
        <span className="y-axis-label">Rate Of Rise Graph</span>
        <svg viewBox={`0 0 ${W} ${H_BOT}`} preserveAspectRatio="none">
          {powGrid.map((v) => (
            <line key={v} x1={0} x2={W} y1={yPow(v)} y2={yPow(v)} stroke="var(--gray-200)" strokeDasharray="3 4" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
          ))}
          {phaseX.map((x, i) => (
            <line key={i} x1={x} x2={x} y1={0} y2={H_BOT} stroke="var(--navy)" strokeWidth={2.4} vectorEffect="non-scaling-stroke" />
          ))}
          {/* setpoint lines */}
          <line x1={0} x2={W} y1={yPow(85)} y2={yPow(85)} stroke="var(--c-fan)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <line x1={0} x2={W} y1={yPow(63)} y2={yPow(63)} stroke="var(--c-power)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <line x1={0} x2={W} y1={yPow(55)} y2={yPow(55)} stroke="var(--c-rpm)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          {/* actual modulation */}
          <path
            d={path((running ? visible : data.samples).map((s) => [xOf(s.t), yPow(s.actual)]))}
            fill="none"
            stroke="var(--c-actual)"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
          />
          <line x1={cursorX} x2={cursorX} y1={0} y2={H_BOT} stroke="var(--navy)" strokeWidth={1.2} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        </svg>
        {[
          { label: "Fan", value: `${data.setpoints.fan}%`, color: "var(--c-fan)", y: 30 },
          { label: "Power", value: `${data.setpoints.power}%`, color: "var(--c-power)", y: 55 },
          { label: "RPM", value: `${data.setpoints.rpm} RPM`, color: "var(--c-rpm)", y: 78 },
        ].map((tag) => (
          <div key={tag.label} className="value-tag" style={{ left: pct(cursorX), top: `${tag.y}%` }}>
            <span className="pill">
              <span className="dot" style={{ background: tag.color }} />
              {tag.label}: {tag.value}
            </span>
            <span className="node">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="7" /></svg>
            </span>
          </div>
        ))}
      </div>

      {/* ---------- phase progress bar ---------- */}
      <PhaseBar data={data} elapsed={upto} running={running} />

      {/* ---------- legend ---------- */}
      <div className="legend-bar">
        {[
          { label: "Bean temp", color: SERIES_COLORS.bean },
          { label: "Air temp", color: SERIES_COLORS.air },
          { label: "Rate of Rise", color: SERIES_COLORS.ror },
          { label: "Exhaust temp", color: SERIES_COLORS.exhaust },
          { label: "Drum temp", color: SERIES_COLORS.drum },
        ].map((l) => (
          <span key={l.label} className="item">
            <span className="swatch" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
        <span className="item">
          <span className="swatch dot" style={{ background: "var(--c-cracks)" }} />
          Cracks ({String(cracksSoFar.length).padStart(2, "0")})
        </span>
      </div>
    </div>
  );
}

function PhaseBar({ data, elapsed, running }: { data: RoastData; elapsed: number; running: boolean }) {
  const { yellowingEnd, firstCrack, drop } = data.phases;
  const segs = [
    { from: 0, to: yellowingEnd, name: "Yellowing", temp: 270, bg: "var(--navy)" },
    { from: yellowingEnd, to: firstCrack, name: "First Crack", temp: 370, bg: "var(--navy-mid)" },
    { from: firstCrack, to: drop, name: "Drop", temp: 170, bg: "var(--sky)" },
  ];
  return (
    <div className="phase-bar">
      {segs.map((s) => {
        const dur = s.to - s.from;
        const done = Math.min(Math.max(elapsed - s.from, 0), dur);
        const pctDone = running ? (done / dur) * 100 : s.name === "Yellowing" ? 100 : s.name === "First Crack" ? 54.13 : 0;
        const timeIn = running ? done : s.name === "Yellowing" ? 370 : s.name === "First Crack" ? 520 : 0;
        return (
          <Fragment key={s.name}>
            <div className="seg" style={{ width: `${(dur / drop) * 100}%`, background: s.bg }}>
              {fmtClock(timeIn)} ({pctDone.toFixed(2)}%) – {s.name}: {s.temp} °C
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
