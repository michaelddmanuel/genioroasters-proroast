/**
 * ProRoast Companion — Genio Roasters (Expo SDK 54)
 * Mobile cockpit ADAPTED from the ProRoast Evolution desktop app (Figma
 * x6NZnbTFzcGU9DCvYHIftH contains desktop frames only). Tokens, data and the
 * simulated-roast engine are shared 1:1 with the web app.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, shadowCard } from "./src/theme";
import { generateRoast, sampleAt, fmtClock, ROAST_DURATION } from "./src/sim";
import { MobileChart } from "./src/MobileChart";
import { Icon, Star, LogoMark } from "./src/Icon";
import { beans, batches, profiles } from "./src/data";

const SIM_SPEED = 14;

type Tab = "live" | "queue" | "profiles" | "stock";

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}

function Root() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("live");

  // ---- shared roast session state ----
  const data = useMemo(() => generateRoast(7), []);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const loop = () => {
      const e = ((Date.now() - startRef.current) / 1000) * SIM_SPEED;
      if (e >= ROAST_DURATION) {
        setElapsed(ROAST_DURATION);
        setRunning(false);
        return;
      }
      setElapsed(e);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const start = () => {
    startRef.current = Date.now();
    setElapsed(0.01);
    setRunning(true);
  };
  const stop = () => setRunning(false);

  return (
    <View style={[st.app, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <Header running={running} />
      <ScrollView style={st.body} contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 12 }}>
        {tab === "live" && <LiveScreen data={data} elapsed={elapsed} running={running} onStart={start} onStop={stop} />}
        {tab === "queue" && <QueueScreen elapsed={elapsed} running={running} />}
        {tab === "profiles" && <ProfilesScreen />}
        {tab === "stock" && <StockScreen />}
      </ScrollView>
      <TabBar tab={tab} setTab={setTab} bottom={insets.bottom} />
    </View>
  );
}

function Header({ running }: { running: boolean }) {
  return (
    <View style={st.header}>
      <LogoMark size={32} />
      <View style={{ flex: 1 }}>
        <Text style={st.headerTitle}>ProRoast Companion</Text>
        <Text style={st.headerSub}>Genio Roasters</Text>
      </View>
      <View style={[st.modeChip, running && st.modeChipLive]}>
        <View style={[st.dot, { backgroundColor: running ? colors.dangerBright : colors.success }]} />
        <Text style={[st.modeChipText, running && { color: colors.danger }]}>{running ? "Roasting" : "Standby"}</Text>
      </View>
    </View>
  );
}

function LiveScreen({
  data,
  elapsed,
  running,
  onStart,
  onStop,
}: {
  data: ReturnType<typeof generateRoast>;
  elapsed: number;
  running: boolean;
  onStart: () => void;
  onStop: () => void;
}) {
  const now = sampleAt(data, elapsed);
  const cracks = data.cracks.filter((c) => c.t <= elapsed).length;
  const dev = elapsed > data.phases.firstCrack ? ((elapsed - data.phases.firstCrack) / elapsed) * 100 : 0;

  return (
    <>
      <View style={st.card}>
        <View style={st.rowBetween}>
          <View>
            <Text style={st.beanName}>Costa Rica Fancy</Text>
            <Text style={st.sub}>Batch 1 / 3 · 4kg · ProRoast Evolution</Text>
          </View>
          <Text style={st.timer}>{fmtClock(elapsed, true)}</Text>
        </View>
        <MobileChart data={data} elapsed={elapsed} />
        <View style={st.legend}>
          {[
            ["Bean", colors.chart.bean],
            ["Air", colors.chart.air],
            ["RoR", colors.chart.ror],
            ["Exhaust", colors.chart.exhaust],
            ["Drum", colors.chart.drum],
            [`Cracks (${String(cracks).padStart(2, "0")})`, colors.chart.crack],
          ].map(([label, c]) => (
            <View key={label} style={st.legendItem}>
              <View style={[st.legendSwatch, { backgroundColor: c }]} />
              <Text style={st.legendText}>{label}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={running ? onStop : onStart}
          style={({ pressed }) => [st.cta, running && st.ctaStop, pressed && { opacity: 0.85 }]}
        >
          <Icon name={running ? "stop" : "play"} size={18} color="#fff" strokeWidth={2.2} />
          <Text style={st.ctaText}>{running ? "Stop Roast" : "Start Roast"}</Text>
        </Pressable>
      </View>

      <View style={st.tileGrid}>
        <Tile label="Bean Temperature" value={`${now.bean.toFixed(1)} °C`} />
        <Tile label="Bean RoR" value={`${now.ror.toFixed(1)} °C/30s`} />
        <Tile label="Exhaust Temp" value={`${now.exhaust.toFixed(1)} °C`} />
        <Tile label="Drum Temp" value={`${now.drum.toFixed(1)} °C`} />
        <Tile label="First Crack" value={elapsed >= data.phases.firstCrack ? fmtClock(data.phases.firstCrack) : "—"} />
        <Tile label="Development" value={`${dev.toFixed(1)}%`} />
        <Tile label="Fan / Power / RPM" value={`${data.setpoints.fan}% · ${data.setpoints.power}% · ${data.setpoints.rpm}`} wide />
      </View>
    </>
  );
}

function Tile({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <View style={[st.tile, wide && { flexBasis: "100%" }]}>
      <View style={st.tileHead}>
        <View style={st.tileDot} />
        <Text style={st.tileLabel}>{label}</Text>
      </View>
      <Text style={st.tileValue}>{value}</Text>
    </View>
  );
}

function QueueScreen({ elapsed, running }: { elapsed: number; running: boolean }) {
  const pct = Math.min(100, (elapsed / ROAST_DURATION) * 100);
  return (
    <>
      <Text style={st.screenTitle}>Roast queue</Text>
      {batches.map((b, i) => {
        const isCurrent = b.status === "current";
        const progress = isCurrent ? pct : 0;
        return (
          <View key={b.label} style={st.card}>
            <View style={st.rowBetween}>
              <Text style={st.beanName}>Costa Rica Fancy</Text>
              <Text style={[st.pct, isCurrent && { color: colors.blue }]}>{progress.toFixed(0)}%</Text>
            </View>
            <View style={st.progressTrack}>
              <View style={[st.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={st.rowBetween}>
              <Text style={st.sub}>
                {b.kg}kg · {b.label}
              </Text>
              {isCurrent ? (
                <Text style={[st.badge, running ? st.badgeLive : st.badgeDone]}>{running ? "Roasting" : elapsed >= ROAST_DURATION ? `Done ${fmtClock(ROAST_DURATION, true)}` : "Ready"}</Text>
              ) : (
                <Text style={[st.badge, st.badgeQueue]}>{i === 1 ? "Up Next" : "In queue"}</Text>
              )}
            </View>
          </View>
        );
      })}
    </>
  );
}

function ProfilesScreen() {
  return (
    <>
      <Text style={st.screenTitle}>Roasting profiles</Text>
      {profiles.map((p) => (
        <View key={p.id} style={st.card}>
          <View style={st.rowBetween}>
            <Text style={st.beanName}>{p.name}</Text>
            <Icon name="chevR" size={18} color={colors.faint} />
          </View>
          <Text style={st.sub}>
            {p.id} · {p.roaster}
          </Text>
          <View style={{ flexDirection: "row", gap: 2, marginTop: 6 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Star key={i} filled={i < p.stars} size={16} />
            ))}
          </View>
          <Text style={[st.sub, { marginTop: 6 }]}>{p.notes}</Text>
        </View>
      ))}
    </>
  );
}

function StockScreen() {
  return (
    <>
      <Text style={st.screenTitle}>Stock</Text>
      {beans.map((b) => (
        <View key={b.code} style={st.card}>
          <View style={st.rowBetween}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={st.beanAvatar}>
                <Icon name="bean" size={18} color={colors.brand} />
              </View>
              <View>
                <Text style={st.beanName}>{b.name}</Text>
                <Text style={st.sub}>{b.code}</Text>
              </View>
            </View>
            <Text
              style={[
                st.badge,
                b.status === "In stock" && st.badgeDone,
                b.status === "Out of stock" && st.badgeError,
                b.status === "Below Re-order" && st.badgeWarn,
              ]}
            >
              {b.status}
            </Text>
          </View>
          <View style={[st.rowBetween, { marginTop: 10 }]}>
            <Text style={st.sub}>In stock <Text style={st.kg}>{b.stock} kg</Text></Text>
            <Text style={st.sub}>Available <Text style={st.kg}>{b.available} kg</Text></Text>
          </View>
        </View>
      ))}
    </>
  );
}

function TabBar({ tab, setTab, bottom }: { tab: Tab; setTab: (t: Tab) => void; bottom: number }) {
  const items: { key: Tab; label: string; icon: string }[] = [
    { key: "live", label: "Live", icon: "flame" },
    { key: "queue", label: "Queue", icon: "layers" },
    { key: "profiles", label: "Profiles", icon: "trend" },
    { key: "stock", label: "Stock", icon: "box" },
  ];
  return (
    <View style={[st.tabBar, { paddingBottom: Math.max(bottom, 10) }]}>
      {items.map((it) => {
        const active = tab === it.key;
        return (
          <Pressable key={it.key} onPress={() => setTab(it.key)} style={st.tabItem}>
            <Icon name={it.icon} size={22} color={active ? colors.brand : colors.faint} strokeWidth={active ? 2.1 : 1.8} />
            <Text style={[st.tabLabel, active && { color: colors.brand, fontWeight: "700" }]}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const st = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  headerSub: { fontSize: 11, color: colors.sub },
  modeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  modeChipLive: { backgroundColor: colors.dangerTint, borderColor: "#F5B5B8" },
  modeChipText: { fontSize: 12, fontWeight: "600", color: colors.sub },
  dot: { width: 7, height: 7, borderRadius: 4 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 10, ...shadowCard },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  beanName: { fontSize: 15, fontWeight: "700", color: colors.text },
  sub: { fontSize: 12, color: colors.sub },
  timer: { fontSize: 18, fontWeight: "700", color: colors.navy, fontVariant: ["tabular-nums"] },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendSwatch: { width: 12, height: 3, borderRadius: 2 },
  legendText: { fontSize: 10.5, color: colors.sub },
  cta: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: radius.md,
    paddingVertical: 12,
  },
  ctaStop: { backgroundColor: colors.danger },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  tileGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: {
    flexGrow: 1,
    flexBasis: "47%",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    gap: 6,
    ...shadowCard,
  },
  tileHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  tileDot: { width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: colors.dangerBright, backgroundColor: "#fff" },
  tileLabel: { fontSize: 11, color: colors.sub },
  tileValue: { fontSize: 17, fontWeight: "700", color: colors.text, fontVariant: ["tabular-nums"] },
  screenTitle: { fontSize: 20, fontWeight: "700", color: colors.text, marginBottom: 2 },
  pct: { fontSize: 13, fontWeight: "700", color: colors.sub, fontVariant: ["tabular-nums"] },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: "#EEF2F6", overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: colors.blue },
  badge: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    overflow: "hidden",
    color: colors.sub,
    backgroundColor: "#EEF2F6",
  },
  badgeLive: { backgroundColor: colors.dangerTint, color: colors.danger },
  badgeDone: { backgroundColor: colors.successTint, color: "#3F8927" },
  badgeQueue: { backgroundColor: colors.blueTint, color: colors.brand },
  badgeError: { backgroundColor: colors.dangerTint, color: colors.danger },
  badgeWarn: { backgroundColor: colors.warnTint, color: "#B57705" },
  beanAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blueTint,
    alignItems: "center",
    justifyContent: "center",
  },
  kg: { fontWeight: "700", color: colors.text },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tabItem: { flex: 1, alignItems: "center", gap: 3 },
  tabLabel: { fontSize: 10.5, color: colors.faint },
});

// Platform import is used for potential web-specific tweaks; keep referenced.
void Platform;
