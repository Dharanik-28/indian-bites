import biryani from "@/assets/biryani.jpg";
import dosa from "@/assets/dosa.jpg";
import idli from "@/assets/idli.jpg";
import samosa from "@/assets/samosa.jpg";
import poori from "@/assets/poori.jpg";

export type Food = {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  ingredients: string[];
  recipe: string[];
};

export const foods: Food[] = [
  {
    id: "biryani",
    name: "Biryani",
    region: "Hyderabad",
    image: biryani,
    description:
      "Fragrant basmati rice layered with spiced, marinated meat and slow-cooked 'dum' style for deep, aromatic flavour.",
    ingredients: ["Basmati rice", "Chicken", "Yogurt", "Fried onions", "Saffron", "Mint", "Garam masala", "Ghee"],
    recipe: [
      "Marinate chicken in yogurt, ginger-garlic paste and spices for 1 hour.",
      "Parboil basmati rice with whole spices until 70% cooked.",
      "Layer chicken, rice, fried onions, mint and saffron milk in a heavy pot.",
      "Seal and cook on low heat (dum) for 25–30 minutes.",
    ],
  },
  {
    id: "dosa",
    name: "Dosa",
    region: "South India",
    image: dosa,
    description:
      "A thin, crispy crepe made from fermented rice and lentil batter, often filled with spiced potato masala.",
    ingredients: ["Rice", "Urad dal", "Fenugreek seeds", "Salt", "Oil", "Potato masala"],
    recipe: [
      "Soak rice and urad dal separately for 6 hours, then grind into batter.",
      "Ferment the batter overnight.",
      "Spread a ladle of batter thinly on a hot tawa and drizzle oil.",
      "Cook until golden and crisp, add potato masala and fold.",
    ],
  },
  {
    id: "idli",
    name: "Idli",
    region: "Tamil Nadu",
    image: idli,
    description:
      "Soft, fluffy steamed rice cakes — a light, healthy South Indian breakfast served with sambar and chutney.",
    ingredients: ["Idli rice", "Urad dal", "Fenugreek seeds", "Salt", "Water"],
    recipe: [
      "Soak rice and urad dal for 6 hours and grind separately.",
      "Mix, add salt and ferment for 8–12 hours.",
      "Pour batter into greased idli moulds.",
      "Steam for 10–12 minutes and serve hot.",
    ],
  },
  {
    id: "samosa",
    name: "Samosa",
    region: "North India",
    image: samosa,
    description:
      "Crispy, golden pastry triangles stuffed with spiced potatoes and peas — India's favourite tea-time snack.",
    ingredients: ["Maida flour", "Potatoes", "Green peas", "Cumin", "Green chilli", "Coriander", "Oil"],
    recipe: [
      "Knead a stiff dough with flour, salt, ajwain and oil; rest 30 minutes.",
      "Cook mashed potatoes and peas with cumin, chilli and spices.",
      "Roll dough, cut in half, form cones and fill with stuffing.",
      "Deep fry on medium-low heat until golden and crisp.",
    ],
  },
  {
    id: "poori",
    name: "Poori",
    region: "All India",
    image: poori,
    description:
      "Puffy, deep-fried whole wheat bread, best enjoyed hot with aloo bhaji or chana masala.",
    ingredients: ["Whole wheat flour", "Salt", "Water", "Oil", "Semolina (optional)"],
    recipe: [
      "Knead a firm dough with wheat flour, salt and a little oil.",
      "Divide into small balls and roll into 4-inch circles.",
      "Deep fry in hot oil, pressing gently so they puff up.",
      "Drain and serve hot with potato curry.",
    ],
  },
];

export function searchFoods(query: string): Food[] {
  const q = query.trim().toLowerCase();
  if (!q) return foods;
  return foods.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.region.toLowerCase().includes(q) ||
      f.ingredients.some((i) => i.toLowerCase().includes(q)),
  );
}

export function findFoodByLabel(label: string): Food | undefined {
  const l = label.trim().toLowerCase();
  return foods.find((f) => l.includes(f.id) || f.id.includes(l));
}
