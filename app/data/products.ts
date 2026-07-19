export interface CatalogueItem {
  id: string;
  name: string;
  price: number;
  description: string;
  type: "crate" | "combo";
  size?: number; // for crates: 4, 6, 12, 30. for combos: 24, 60, 48
  details: string[];
  image: string;
  extendedDescription?: string; // detailed text for the single product page
}

export const CRATES: CatalogueItem[] = [
  {
    id: "crate-4",
    name: "Petite Tasting Crate",
    price: 2.50,
    description: "Perfect introduction to gourmet quail eggs. Compact and protective packaging.",
    type: "crate",
    size: 4,
    details: ["4 Premium organic quail eggs", "Eco-friendly pulp crate", "Ideal for quick single serving"],
    image: "/crates.png",
    extendedDescription: "Our Petite Tasting Crate is designed for culinary enthusiasts looking to introduce the rich, creamy flavor of fresh quail eggs into their diets. Hand-selected from our pasture-fed Coturnix breed, each egg is certified organic and packed in secure, eco-friendly cushioned pulp trays. Ideal for single servings, hard-boiling, or as high-protein additions to salads and appetizers."
  },
  {
    id: "crate-6",
    name: "Classic Half-Dozen",
    price: 3.50,
    description: "An elegant crate perfect for a weekend breakfast or testing new recipes.",
    type: "crate",
    size: 6,
    details: ["6 Farm-fresh quail eggs", "Sturdy protective structure", "Harvested same-day"],
    image: "/crates.png",
    extendedDescription: "The Classic Half-Dozen is the perfect option for regular cooking or weekend experiments. These eggs are harvested fresh daily, hand-sorted for uniform shell quality, and packed inside a protective layout. Quail eggs cook quickly and offer high concentrations of iron, potassium, and B-vitamins compared to chicken eggs. Excellent for making gourmet mini-poached eggs or baking."
  },
  {
    id: "crate-12",
    name: "Gourmet Dozen Crate",
    price: 6.50,
    description: "The kitchen staple. High nutrient density perfect for families and daily smoothies.",
    type: "crate",
    size: 12,
    details: ["12 Organic speckled eggs", "Premium dual-lock tray", "Excellent source of B12 & Iron"],
    image: "/crates.png",
    extendedDescription: "Our Gourmet Dozen Crate is a kitchen essential. With 12 premium quail eggs packed in our dual-lock safety trays, you get a daily supply of healthy, nutrient-rich food. They are an exceptional source of vitamins, proteins, and minerals. Try adding them raw to your morning green smoothies or lightly boiling them as a quick, bite-sized snack for kids."
  },
  {
    id: "crate-30",
    name: "Coop Master Crate",
    price: 14.50,
    description: "Chef's selection. Essential for baking, pickling, large breakfasts, and catering.",
    type: "crate",
    size: 30,
    details: ["30 Hand-selected bulk eggs", "Maximum protection tray style", "Best cost-per-egg ratio"],
    image: "/crates.png",
    extendedDescription: "For restaurants, professional chefs, home picklers, and large families, the Coop Master Crate is the perfect bulk option. It contains 30 hand-selected quail eggs sorted for premium quality. This tray size offers the absolute best value-for-money and is shipped in extra-cushioned shock-absorbent trays to ensure every egg arrives intact."
  },
];

export const COMBOS: CatalogueItem[] = [
  {
    id: "combo-double-dozen",
    name: "Double Dozen Combo",
    price: 11.50,
    description: "The ultimate family value pack. Combining two standard 12-egg crates for daily breakfast.",
    type: "combo",
    size: 24,
    details: ["2 x 12-Egg Gourmet Crates (24 eggs total)", "Saves over 11% compared to single buying", "Secured in a custom double-locked layout"],
    image: "/combo.png",
    extendedDescription: "Get the ultimate family value with our Double Dozen Combo! We pair two of our standard 12-egg Gourmet Crates to give you a total of 24 premium speckled quail eggs. Purchasing this combo saves you over 11% compared to buying crates individually, making it a smart choice for regular egg consumers."
  },
  {
    id: "combo-master-duet",
    name: "Master Duet Combo",
    price: 26.00,
    description: "Affordable crate pairing for heavy egg consumers, chefs, bakers, and family feasts.",
    type: "combo",
    size: 60,
    details: ["2 x 30-Egg Master Crates (60 eggs total)", "Our most economical pricing tier", "Priority coop harvesting queue"],
    image: "/combo.png",
    extendedDescription: "Designed for heavy egg consumers, bakers, caterers, and family feasts, the Master Duet Combo couples two 30-egg Coop Master Crates (60 eggs total). This is our most cost-efficient pricing tier, yielding maximum value and placing you in our priority harvesting queue."
  },
  {
    id: "combo-sampler-trio",
    name: "Coop Sampler Trio",
    price: 22.00,
    description: "Get the complete variety. A combined pack featuring three of our main crate sizes at a discount.",
    type: "combo",
    size: 48,
    details: ["1 x 30-Egg Crate + 1 x 12-Egg Crate + 1 x 6-Egg Crate", "48 total eggs of varying sizes", "Great for testing different recipes"],
    image: "/combo.png",
    extendedDescription: "Experience the complete variety of our sizes with the Coop Sampler Trio. This discounted combo provides one 30-egg crate, one 12-egg crate, and one 6-egg crate (48 eggs total). It is an excellent choice for trying different boiling or baking recipes."
  },
];

export const ALL_PRODUCTS = [...CRATES, ...COMBOS];
