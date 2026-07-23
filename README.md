# ProRoast Evolution — Roaster Cockpit

A 1:1 recreation of the **ProRoast Evolution** coffee-roaster operator cockpit
(design: *Dev-Ready · Genio Roasters · Final UI* Figma file), plus a mobile
companion app. Built from the GenioRoasters blueprint.

> Genio Roasters is a real drum-roaster manufacturer; this is an unaffiliated
> design-implementation exercise. All telemetry is **simulated** — a seeded
> roast engine generates realistic 18:30 drum-roast curves (bean/air/exhaust/
> drum temps, rate-of-rise, crack events, fan/power/RPM modulation) so the
> cockpit demos live with zero hardware. v1 is read-only telemetry: it never
> controls roaster heat.

## Apps

| App | Stack | Folder | What it is |
| --- | --- | --- | --- |
| **Web cockpit** | Vite · React 19 · TS · react-router 7 | [web/](web/) | The full desktop app, 1:1 with the Figma: Sign in/up/reset, Live Roasting (standby + active roast with dual-pane chart, value tags, phase bar, crack histogram, batch queue, roast-profile drawer), Roasting Profiles, Schedule (+ add-session form with computed batches), Stock (+ add stock), User Management |
| **Mobile companion** | Expo SDK 54 · RN 0.81 · react-native-svg | [mobile/](mobile/) | Adapted pocket cockpit (the Figma has desktop frames only): live chart, phase bar, roast tiles, queue, profiles, stock — same tokens, data and sim engine |

## Run

```bash
# web
cd web && npm i && npm run dev        # http://localhost:5173

# mobile
cd mobile && npm i && npx expo start  # scan QR with Expo Go
```

Live roast demo: press **Start Roast** — the simulated roast runs at 14× speed
(a full 18:30 roast plays out in ~80s), then auto-stops at drop.

## Design fidelity

- Reference pack: 34 frame screenshots in `design-reference/` captured from the
  Figma file; every screen was built against them and verified side-by-side.
- Tokens sampled from the App Identity frames: Untitled UI gray scale, primary
  blue scale (#E2EFFC → #0F4C81 → #123E68), navy sidebar #1F3D65, action blue
  #3B6AA7, semantic red/amber/green.
- Deliberate design quirks are preserved (e.g. "Rosting profiles",
  "Casta Rica Fancy" — they appear in the source frames).
