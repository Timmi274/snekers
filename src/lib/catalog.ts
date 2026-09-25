export type Category = "Лайфстайл" | "Беговые" | "Баскетбольные" | "Трейл";

export type Badge = "hit" | "trend" | "new" | "sale";

export interface Product {
  slug: string;
  brand: string;
  name: string;
  colorway: string;
  category: Category;
  sizes: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: Badge;
  description: string;
  image: string;
  imageAlt: string;
  /** Позиция в сортировке «По популярности» (1 = самая популярная). */
  popularity: number;
}

export const TELEGRAM_URL = "https://t.me/Amver_Group";

export const CATEGORIES: Category[] = [
  "Лайфстайл",
  "Беговые",
  "Баскетбольные",
  "Трейл",
];

export const PRODUCTS: Product[] = [
  {
    slug: "air-cushion-270",
    brand: "Nike",
    name: "Air Max 270 Red Sole",
    colorway: "White / University Red",
    category: "Лайфстайл",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    price: 18990,
    oldPrice: 22490,
    rating: 4.9,
    reviews: 214,
    badge: "hit",
    description:
      "Силуэт с крупной воздушной камерой в пятке и дышащим сетчатым верхом. Мягкая амортизация для города, аккуратная белая база и насыщенные красные акценты.",
    image: "/products/air-max-270.png",
    imageAlt: "Nike Air Max 270 Red Sole, White / University Red",
    popularity: 1,
  },
  {
    slug: "samba-og-black",
    brand: "adidas",
    name: "Samba OG Black Gum",
    colorway: "Core Black / Gum",
    category: "Лайфстайл",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    price: 13990,
    rating: 4.9,
    reviews: 402,
    badge: "trend",
    description:
      "Низкий замшевый силуэт с прорезиненной подошвой цвета камеди. Главная террасная модель последних сезонов — минимализм и стиль.",
    image: "/products/samba-og.jpg",
    imageAlt: "adidas Samba OG Black Gum, Core Black / Gum",
    popularity: 2,
  },
  {
    slug: "af1-07-triple-white",
    brand: "Nike",
    name: "Air Force 1 '07 Triple White",
    colorway: "Triple White",
    category: "Лайфстайл",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    price: 15490,
    rating: 4.8,
    reviews: 341,
    description:
      "Классика низкого профиля из гладкой кожи. Универсальная модель, которая сочетается с любым образом и держит форму сезон за сезоном.",
    image: "/products/air-force-1-07.jpg",
    imageAlt: "Nike Air Force 1 '07 Triple White, Triple White",
    popularity: 3,
  },
  {
    slug: "gel-kayano-14",
    brand: "ASICS",
    name: "GEL-Kayano 14 Silver",
    colorway: "White / Pure Silver",
    category: "Лайфстайл",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    price: 17490,
    rating: 4.8,
    reviews: 205,
    description:
      "Легендарная модель в металлизированной отделке: гелевая амортизация, слоистый верх и техно-эстетика нулевых.",
    image: "/products/gel-kayano-14.webp",
    imageAlt: "ASICS GEL-Kayano 14 Silver, White / Pure Silver",
    popularity: 4,
  },
  {
    slug: "salomon-xt-6-black",
    brand: "Salomon",
    name: "XT-6 Total Black",
    colorway: "Black / Phantom",
    category: "Трейл",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    price: 24990,
    rating: 4.9,
    reviews: 132,
    description:
      "Технологичный трейловый силуэт с быстрой шнуровкой и агрессивным протектором. Носится и в городе, и на маршруте.",
    image: "/products/xt-6.jpg",
    imageAlt: "Salomon XT-6 Total Black, Black / Phantom",
    popularity: 5,
  },
  {
    slug: "nb-550-green",
    brand: "New Balance",
    name: "550 Court Green",
    colorway: "White / Team Green",
    category: "Баскетбольные",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    price: 15990,
    rating: 4.8,
    reviews: 187,
    description:
      "Ретро-баскетбол с кожаным верхом и винтажной геометрией подошвы. Один из самых универсальных силуэтов бренда.",
    image: "/products/nb-550.png",
    imageAlt: "New Balance 550 Court Green, White / Team Green",
    popularity: 6,
  },
  {
    slug: "nb-9060-grey",
    brand: "New Balance",
    name: "9060 Rain Cloud",
    colorway: "Rain Cloud / Grey",
    category: "Лайфстайл",
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: 21990,
    rating: 4.7,
    reviews: 143,
    badge: "new",
    description:
      "Массивный силуэт с многослойной замшей и сеткой, объемная подошва и футуристичный дизайн. Для тех, кто любит заметные модели.",
    image: "/products/nb-9060.jpg",
    imageAlt: "New Balance 9060 Rain Cloud, Rain Cloud / Grey",
    popularity: 7,
  },
  {
    slug: "pegasus-41",
    brand: "Nike",
    name: "Pegasus 41 Road Runner",
    colorway: "Wolf Grey / Crimson",
    category: "Беговые",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    price: 16990,
    oldPrice: 19990,
    rating: 4.7,
    reviews: 158,
    badge: "sale",
    description:
      "Рабочая лошадка для ежедневных тренировок: отзывчивая пена, стабильная посадка и вентилируемый верх для длинных дистанций.",
    image: "/products/pegasus-41.webp",
    imageAlt: "Nike Pegasus 41 Road Runner, Wolf Grey / Crimson",
    popularity: 8,
  },
  {
    slug: "ultraboost-light",
    brand: "adidas",
    name: "Ultraboost Light Grey",
    colorway: "Grey Two / Cloud White",
    category: "Беговые",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    price: 19990,
    rating: 4.6,
    reviews: 121,
    description:
      "Носочный трикотажный верх и легкая энергичная пена в межподошве. Комфорт бегового уровня в повседневной носке.",
    image: "/products/ultraboost-light.jpg",
    imageAlt: "adidas Ultraboost Light Grey, Grey Two / Cloud White",
    popularity: 9,
  },
  {
    slug: "salomon-speedcross-6",
    brand: "Salomon",
    name: "Speedcross 6 Fiery Red",
    colorway: "Fiery Red / Black",
    category: "Трейл",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    price: 22490,
    rating: 4.7,
    reviews: 74,
    description:
      "Глубокие шипы, жесткая фиксация стопы и защита от грязи. Создан для бездорожья и плохой погоды, выглядит максимально дерзко.",
    image: "/products/speedcross-6.png",
    imageAlt: "Salomon Speedcross 6 Fiery Red, Fiery Red / Black",
    popularity: 10,
  },
  {
    slug: "gel-1130-cream",
    brand: "ASICS",
    name: "GEL-1130 Cream Suede",
    colorway: "Cream / Oatmeal",
    category: "Беговые",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    price: 13490,
    oldPrice: 15990,
    rating: 4.6,
    reviews: 88,
    badge: "sale",
    description:
      "Спокойная бежевая палитра, замшевые накладки и мягкая посадка. Модель, которая легко вписывается в базовый гардероб.",
    image: "/products/gel-1130.jpg",
    imageAlt: "ASICS GEL-1130 Cream Suede, Cream / Oatmeal",
    popularity: 11,
  },
  {
    slug: "forum-low-royal",
    brand: "adidas",
    name: "Forum Low Royal Stripe",
    colorway: "White / Royal Blue",
    category: "Баскетбольные",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    price: 12490,
    oldPrice: 14990,
    rating: 4.5,
    reviews: 96,
    description:
      "Баскетбольная классика 80-х в чистом белом исполнении с синими деталями. Кожаный верх, плотная посадка, узнаваемая форма.",
    image: "/products/forum-low.webp",
    imageAlt: "adidas Forum Low Royal Stripe, White / Royal Blue",
    popularity: 12,
  },
];

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

export const ALL_SIZES = [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort(
  (a, b) => Number(a) - Number(b),
);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 2): Product[] {
  return PRODUCTS.filter((p) => p.brand === product.brand && p.slug !== product.slug)
    .sort((a, b) => a.popularity - b.popularity)
    .slice(0, limit);
}

export function categoryCounts(): Record<Category, number> {
  const counts = {} as Record<Category, number>;
  for (const category of CATEGORIES) {
    counts[category] = PRODUCTS.filter((p) => p.category === category).length;
  }
  return counts;
}

export function badgeLabel(product: Product): string | null {
  switch (product.badge) {
    case "hit":
      return "Хит продаж";
    case "trend":
      return "Тренд";
    case "new":
      return "Новинка";
    case "sale":
      return product.oldPrice
        ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
        : null;
    default:
      return null;
  }
}

export function badgeClasses(product: Product): string {
  switch (product.badge) {
    case "hit":
      return "bg-red-600 text-white";
    case "trend":
      return "bg-violet-600 text-white";
    case "new":
      return "bg-emerald-600 text-white";
    case "sale":
      return "bg-zinc-900 text-white";
    default:
      return "bg-zinc-900 text-white";
  }
}

const nf = new Intl.NumberFormat("ru-RU");

export function formatPrice(value: number): string {
  return `${nf.format(value)} ₽`;
}

export function sizeRange(product: Product): string {
  const nums = product.sizes.map(Number);
  return `${Math.min(...nums)}–${Math.max(...nums)}`;
}

/** Модели для блока «Популярные модели» на главной — порядок как в оригинале. */
export const POPULAR_SLUGS = [
  "air-cushion-270",
  "af1-07-triple-white",
  "samba-og-black",
  "nb-550-green",
  "gel-kayano-14",
  "salomon-xt-6-black",
];

export const CATEGORY_IMAGES: Record<Category, string> = {
  Лайфстайл: "/products/air-max-270.png",
  Беговые: "/products/pegasus-41.webp",
  Баскетбольные: "/products/forum-low.webp",
  Трейл: "/products/xt-6.jpg",
};
