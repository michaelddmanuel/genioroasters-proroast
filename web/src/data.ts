export type Bean = {
  id: string;
  name: string;
  code: string;
  description: string;
  group: string;
  notes: number;
  status: "in" | "out" | "reorder";
  booked: boolean;
  inStock: number;
  available: number;
  bookedKg: number;
};

export const beans: Bean[] = [
  { id: "crf", name: "Costa Rica Fancy", code: "A-002223", description: "Costa Rica coffees have a clean Costa Rica coffees have a clean Costa Rica co ...", group: "Green Beans", notes: 10, status: "out", booked: false, inStock: 50, available: 0, bookedKg: 50 },
  { id: "ey", name: "Ethiopian Yirgacheffe", code: "A-002234", description: "Yirgacheffe coffees are known for their distinct floral and fruity notes and thes ...", group: "Green Beans", notes: 10, status: "in", booked: false, inStock: 110, available: 70, bookedKg: 40 },
  { id: "cs", name: "Colombian Supremo", code: "A-002235", description: "Colombian Supremo coffees are known for their mild, well-balanced a ...", group: "Green Beans", notes: 10, status: "in", booked: false, inStock: 570, available: 530, bookedKg: 40 },
  { id: "jbm", name: "Jamaican Blue Mountain", code: "A-002267", description: "Jamaican Blue Mountain coffees are highly prized for their mild, sweet tast ...", group: "Green Beans", notes: 10, status: "in", booked: false, inStock: 400, available: 300, bookedKg: 100 },
  { id: "kaa", name: "Kenyan AA", code: "A-002278", description: "AA coffees are known for their bright acidity, full body, and complex flavor ...", group: "Green Beans", notes: 10, status: "reorder", booked: true, inStock: 50, available: 20, bookedKg: 30 },
  { id: "sm", name: "Sumatra Mandheling", code: "A-002298", description: "Sumatra Mandheling coffees have a full body and low acidity, with flavors ...", group: "Green Beans", notes: 10, status: "reorder", booked: true, inStock: 90, available: 15, bookedKg: 75 },
  { id: "ga", name: "Guatemala Antigua", code: "A-002345", description: "Guatemala Antigua coffees are known for their balanced flavor with notes of ...", group: "Green Beans", notes: 10, status: "out", booked: false, inStock: 0, available: 0, bookedKg: 0 },
];

export type Roaster = { name: string; handle: string };
export const roasters: Roaster[] = [
  { name: "Olivia Jacob's", handle: "@olivia" },
  { name: "Ben Findman", handle: "@phoenix" },
  { name: "Lana Steiner", handle: "@lana" },
  { name: "Demi Wilkinson", handle: "@demi" },
  { name: "Candice Wu", handle: "@candice" },
  { name: "Natali Craig", handle: "@natali" },
];

export type ScheduleRow = {
  product: string;
  code: string;
  user: Roaster;
  date: string;
  yieldKg: number;
  progress: number;
  status: "Done" | "Paused" | "Error";
  machine: string;
  description: string;
};

export const scheduleRows: ScheduleRow[] = [
  { product: "Costa Rica Fancy", code: "A-002223", user: roasters[0], date: "14 Jan 2023", yieldKg: 80, progress: 0, status: "Done", machine: "ProRoast Evolution", description: "Colombian Supremo coffees are known for" },
  { product: "Belend", code: "A-002234", user: roasters[1], date: "14 Jan 2023", yieldKg: 80, progress: 30, status: "Done", machine: "ProRoast Evolutiont", description: "Jamaican Blue Mountain coffees are highly prized" },
  { product: "Colombian Supremo", code: "A-002235", user: roasters[2], date: "14 Jan 2023", yieldKg: 45, progress: 70, status: "Done", machine: "ProRoast Evolution", description: "Colombian Supremo coffees are known for" },
  { product: "Jamaican Blue Mountain", code: "A-002267", user: roasters[3], date: "14 Jan 2023", yieldKg: 88, progress: 30, status: "Paused", machine: "ProRoast Evolution", description: "Jamaican Blue Mountain coffees are highly prized" },
  { product: "Kenyan AA", code: "A-00227B", user: roasters[4], date: "14 Jan 2023", yieldKg: 90, progress: 90, status: "Error", machine: "ProRoast Evolution", description: "AA coffees are known for their bright acidity, full ..." },
  { product: "Sumatra Mandheling", code: "A-002298", user: roasters[5], date: "14 Jan 2023", yieldKg: 22, progress: 30, status: "Paused", machine: "ProRoast Evolution", description: "Sumatra Mandheling coffees have a full body" },
];

export const productOptions = [
  "Brazil Santos",
  "Costa Rica Fancy",
  "Jamaican Blue Mountain",
  "Kenyan AA",
  "Sumatra Mandheling",
  "Guatemala Antigua",
  "Tanzanian Peaberry",
];

export type RoastProfile = {
  name: string;
  id: string;
  roaster: string;
  defaultFor: string;
  rating: number;
  notes: string;
};

export const roastProfiles: RoastProfile[] = [
  { name: "Morning Roast", id: "CRF -00090- GEVO", roaster: "Olivia Jacobs", defaultFor: "Costa Rica Fancy", rating: 8, notes: "Morning roast coffee roast profile." },
  { name: "Slow Development", id: "JBM -00072- GEVO", roaster: "Ben Findman", defaultFor: "Jamaican Blue Mountain", rating: 7, notes: "Long development for sweetness." },
  { name: "Nordic Light", id: "EY -00114- GEVO", roaster: "Lana Steiner", defaultFor: "Ethiopian Yirgacheffe", rating: 9, notes: "Light, floral, fast finish." },
];

export const machine = "ProRoast Evolution";
