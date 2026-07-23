// ProRoast Companion — design tokens derived 1:1 from the ProRoast Evolution web app
// (Figma x6NZnbTFzcGU9DCvYHIftH · App Identity frames). Mobile layout is ADAPTED —
// the Figma file contains desktop frames only; colors/type-scale/semantics are exact.
export const colors = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#EAECF0",
  borderStrong: "#D0D5DD",
  text: "#101828",
  sub: "#667085",
  faint: "#98A2B3",
  navy: "#1F3D65",
  brand: "#0F4C81",
  blue: "#3B6AA7",
  sky: "#6BB2EA",
  blueTint: "#E2EFFC",
  danger: "#DB303C",
  dangerBright: "#FF4542",
  dangerTint: "#FEECEB",
  warn: "#FFAD0A",
  warnTint: "#FFF6E0",
  success: "#5DBC3A",
  successTint: "#EDF9E8",
  chart: {
    bean: "#E31B54",
    ror: "#16324F",
    air: "#1B8ADC",
    exhaust: "#A11043",
    drum: "#5DBC3A",
    actual: "#FFAD0A",
    crack: "#FF4542",
  },
};

export const radius = { sm: 6, md: 8, lg: 12, xl: 16, full: 999 };

export const shadowCard = {
  shadowColor: "#101828",
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
} as const;
