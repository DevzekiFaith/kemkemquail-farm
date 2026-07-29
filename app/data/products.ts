export interface CatalogueItem {
  id: string;
  name: string;
  price: number; // Price in USD (where 1 USD = 1600 NGN)
  description: string;
  type: "crate" | "combo";
  size?: number; // for crates: 6, 12, 18, 30. for combos: 24, 36, 60
  details: string[];
  image: string;
  extendedDescription?: string; // detailed text for the single product page
}

export const CRATES: CatalogueItem[] = [
  {
    id: "crate-6",
    name: "Classic Half-Dozen",
    price: 1.875, // ₦3,000
    description: "An elegant crate of 6 farm-fresh eggs perfect for a quick breakfast or testing new recipes.",
    type: "crate",
    size: 6,
    details: ["6 Farm-fresh quail eggs", "Eco-friendly pulp crate", "Harvested same-day"],
    image: "/crate-6.png",
    extendedDescription: "The Classic Half-Dozen is the perfect option for regular cooking or quick gourmet meals. These eggs are harvested fresh daily from our pasture-fed Coturnix quail, hand-sorted for uniform shell quality, and packed inside a protective cushioned layout. Quail eggs offer rich flavor and high concentrations of iron, potassium, and B-vitamins."
  },
  {
    id: "crate-12",
    name: "Gourmet Dozen Crate",
    price: 3.125, // ₦5,000
    description: "The kitchen staple. High nutrient density perfect for daily smoothies and family breakfasts.",
    type: "crate",
    size: 12,
    details: ["12 Organic speckled eggs", "Premium dual-lock safety tray", "Excellent source of B12 & Iron"],
    image: "/crate-12.png",
    extendedDescription: "Our Gourmet Dozen Crate is a kitchen essential containing 12 fresh organic quail eggs packed in our dual-lock safety trays. They provide a daily supply of healthy, nutrient-rich protein and essential minerals. Excellent for mini-poaching, baking, or light boiling."
  },
  {
    id: "crate-18",
    name: "Family Select Crate",
    price: 4.375, // ₦7,000
    description: "Generous 18-egg family size crate for nutrient-packed meals throughout the week.",
    type: "crate",
    size: 18,
    details: ["18 Farm-fresh organic quail eggs", "Shock-absorbent cushioned packaging", "Great value for active households"],
    image: "/crate-18.png",
    extendedDescription: "Designed for growing families and active households, the Family Select 18-Egg Crate delivers extra volume without sacrificing freshness. Carefully packed with shock-absorbent cushioning, it ensures your weekly supply arrives safe, intact, and ready to elevate your culinary creations."
  },
  {
    id: "crate-30",
    name: "Coop Master Crate",
    price: 5.625, // ₦9,000
    description: "Chef's selection. 30 eggs essential for baking, pickling, large breakfasts, and catering.",
    type: "crate",
    size: 30,
    details: ["30 Hand-selected bulk eggs", "Maximum protection tray style", "Best cost-per-egg ratio"],
    image: "/crate-30.png",
    extendedDescription: "For restaurants, professional chefs, home picklers, and large families, the Coop Master Crate is the ultimate bulk choice containing 30 hand-selected quail eggs. Offering our best cost-per-egg ratio, it comes shipped in heavy-duty shock-absorbent trays."
  },
];

export const COMBOS: CatalogueItem[] = [
  {
    id: "combo-double-dozen",
    name: "Double Dozen Combo",
    price: 5.3125, // ₦8,500 (save ₦1,500 vs 2x ₦5,000)
    description: "The ultimate family value pack. Pairs two standard 12-egg crates for daily breakfast.",
    type: "combo",
    size: 24,
    details: ["2 x 12-Egg Gourmet Crates (24 eggs total)", "Saves ₦1,500 compared to single buying", "Secured in custom double-locked layout"],
    image: "/combo-double-dozen.png",
    extendedDescription: "Get the ultimate family value with our Double Dozen Combo! We pair two of our standard 12-egg Gourmet Crates to give you a total of 24 premium speckled quail eggs at a discounted price of ₦8,500 (saving ₦1,500)."
  },
  {
    id: "combo-sampler-trio",
    name: "Coop Sampler Trio",
    price: 8.00, // ₦12,800 (save ₦2,200 vs ₦7,000 + ₦5,000 + ₦3,000 = ₦15,000)
    description: "Get the complete variety. A combined pack featuring 18-egg, 12-egg, and 6-egg crates.",
    type: "combo",
    size: 36,
    details: ["1 x 18-Egg + 1 x 12-Egg + 1 x 6-Egg Crate (36 eggs total)", "Save ₦2,200 on the full variety set", "Great for testing different recipes"],
    image: "/combo-sampler-trio.png",
    extendedDescription: "Experience the complete variety of our sizes with the Coop Sampler Trio. This discounted combo provides one 18-egg crate, one 12-egg crate, and one 6-egg crate (36 eggs total) for only ₦12,800."
  },
  {
    id: "combo-master-duet",
    name: "Master Duet Combo",
    price: 9.6875, // ₦15,500 (save ₦2,500 vs 2x ₦9,000 = ₦18,000)
    description: "Affordable crate pairing for heavy egg consumers, chefs, bakers, and family feasts.",
    type: "combo",
    size: 60,
    details: ["2 x 30-Egg Master Crates (60 eggs total)", "Save ₦2,500 off bulk pricing", "Priority coop harvesting queue"],
    image: "/combo-master-duet.png",
    extendedDescription: "Designed for heavy egg consumers, bakers, caterers, and family feasts, the Master Duet Combo couples two 30-egg Coop Master Crates (60 eggs total) for just ₦15,500."
  },
];

export const ALL_PRODUCTS = [...CRATES, ...COMBOS];
