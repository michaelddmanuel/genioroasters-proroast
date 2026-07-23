// Dataset mirrors the web app's data.ts (bean names / codes / stock straight from the Figma frames)
export const beans = [
  { name: "Costa Rica Fancy", code: "A-002223", stock: 50, available: 0, status: "Out of stock" as const },
  { name: "Ethiopian Yirgacheffe", code: "A-002234", stock: 110, available: 70, status: "In stock" as const },
  { name: "Colombian Supremo", code: "A-002235", stock: 570, available: 530, status: "In stock" as const },
  { name: "Jamaican Blue Mountain", code: "A-002267", stock: 400, available: 300, status: "In stock" as const },
  { name: "Kenyan AA", code: "A-002278", stock: 50, available: 20, status: "Below Re-order" as const },
  { name: "Sumatra Mandheling", code: "A-002298", stock: 90, available: 15, status: "Below Re-order" as const },
  { name: "Guatemala Antigua", code: "A-002345", stock: 0, available: 0, status: "Out of stock" as const },
];

export const batches = [
  { label: "Batch 1", kg: 4, status: "current" as const },
  { label: "Batch 2", kg: 4, status: "up-next" as const },
  { label: "Batch 3", kg: 4, status: "in-queue" as const },
];

export const profiles = [
  { name: "Morning Roast", id: "CRF -00090- GEVO", roaster: "Olivia Jacobs", stars: 8, notes: "Morning roast coffee roast profile." },
  { name: "Espresso Classic", id: "CRF -00091- GEVO", roaster: "Ben Findman", stars: 9, notes: "Slow development espresso profile." },
  { name: "Light Filter", id: "JBM -00104- GEVO", roaster: "Lana Steiner", stars: 7, notes: "Bright, floral filter roast." },
  { name: "Dark French", id: "KAA -00112- GEVO", roaster: "Candice Wu", stars: 6, notes: "Heavy body, low acidity." },
];
