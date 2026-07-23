/**
 * Simulated roast engine — generates a realistic 18:30 drum-roast telemetry set
 * (bean/air/exhaust/drum temps, rate-of-rise, fan/power/rpm modulation, crack events)
 * so the cockpit demos live with zero hardware.
 */

export const ROAST_DURATION = 18.5 * 60; // seconds
export const TICK = 5; // seconds per sample

export type Sample = {
  t: number; // seconds
  bean: number;
  air: number;
  exhaust: number;
  drum: number;
  ror: number; // °C / 30s
  actual: number; // modulation output %, noisy
};

export type RoastData = {
  samples: Sample[];
  cracks: { t: number; intensity: number }[];
  phases: { yellowingEnd: number; firstCrack: number; drop: number };
  setpoints: { fan: number; power: number; rpm: number };
};

// deterministic pseudo-random
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function generateRoast(seed = 7): RoastData {
  const rnd = mulberry32(seed);
  const samples: Sample[] = [];
  const yellowingEnd = 5 * 60 + 10; // 05:10
  const firstCrack = 11 * 60 + 5; //  11:05
  const drop = ROAST_DURATION; //     18:30

  const turnT = 95; // turn point ~1:35
  const charge = 200;
  const turn = 76.5;
  const dropTemp = 228;

  let prevBeanClean = charge;
  for (let t = 0; t <= ROAST_DURATION; t += TICK) {
    // Bean temp: exponential drop to turn point then eased climb to drop temp
    let beanClean: number;
    if (t <= turnT) {
      const k = t / turnT;
      beanClean = charge - (charge - turn) * (1 - Math.pow(1 - k, 2.2));
    } else {
      const k = (t - turnT) / (drop - turnT);
      beanClean = turn + (dropTemp - turn) * Math.pow(k, 0.72);
    }
    const bean = beanClean + Math.sin(t / 37) * 0.6 + (rnd() - 0.5) * 0.8;

    // RoR: derivative °C/30s from the noise-free curve (design shows a smooth arc)
    const ror = ((beanClean - prevBeanClean) / TICK) * 30;
    prevBeanClean = beanClean;

    // Air temp: rises quickly to ~235, gentle arc
    const air = 150 + 85 * smoothstep(0, 200, t) + 8 * Math.sin(t / 180) + (rnd() - 0.5) * 1.2;

    // Exhaust: peaks ~272 mid-roast
    const exhaust = 205 + 65 * smoothstep(0, 320, t) - 18 * smoothstep(720, drop, t) + (rnd() - 0.5) * 1.5;

    // Drum: slow steady climb 170 → 232
    const drum = 170 + 62 * smoothstep(0, drop, t) + (rnd() - 0.5) * 1.0;

    // actual modulation output: noisy around 55-80
    const actual =
      64 +
      13 * Math.sin(t / 55) +
      7 * Math.sin(t / 17 + 2) +
      (rnd() - 0.5) * 9 +
      10 * smoothstep(firstCrack - 60, firstCrack + 40, t) * Math.sin(t / 9);

    samples.push({
      t,
      bean: round1(bean),
      air: round1(air),
      exhaust: round1(exhaust),
      drum: round1(drum),
      ror: round1(t < TICK ? 0 : ror),
      actual: round1(Math.min(97, Math.max(22, actual))),
    });
  }

  // Crack events: cluster after first crack
  const cracks: { t: number; intensity: number }[] = [];
  for (let t = firstCrack - 45; t < firstCrack + 150; t += 8 + rnd() * 14) {
    const c = Math.exp(-Math.pow((t - (firstCrack + 40)) / 70, 2));
    if (rnd() < c * 0.95) cracks.push({ t, intensity: 0.25 + rnd() * c });
  }

  return {
    samples,
    cracks,
    phases: { yellowingEnd, firstCrack, drop },
    setpoints: { fan: 75, power: 63, rpm: 55 },
  };
}

function round1(x: number) {
  return Math.round(x * 10) / 10;
}

export function fmtClock(sec: number, withHours = false): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const mm = String(m).padStart(2, "0");
  const sss = String(ss).padStart(2, "0");
  return withHours ? `${String(h).padStart(2, "0")}:${mm}:${sss}` : `${mm}:${sss}`;
}

/** value of every series at elapsed t (linear interp) */
export function sampleAt(data: RoastData, t: number): Sample {
  const { samples } = data;
  if (t <= 0) return samples[0];
  const last = samples[samples.length - 1];
  if (t >= last.t) return last;
  const i = Math.floor(t / TICK);
  const a = samples[i];
  const b = samples[Math.min(i + 1, samples.length - 1)];
  const k = (t - a.t) / TICK;
  const lerp = (x: number, y: number) => x + (y - x) * k;
  return {
    t,
    bean: round1(lerp(a.bean, b.bean)),
    air: round1(lerp(a.air, b.air)),
    exhaust: round1(lerp(a.exhaust, b.exhaust)),
    drum: round1(lerp(a.drum, b.drum)),
    ror: round1(lerp(a.ror, b.ror)),
    actual: round1(lerp(a.actual, b.actual)),
  };
}
