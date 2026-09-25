"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import {
  ALL_SIZES,
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  TELEGRAM_URL,
  type Category,
} from "@/lib/catalog";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Цена: сначала дешевле" },
  { value: "price-desc", label: "Цена: сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

function CatalogInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>(
    initialCategory && CATEGORIES.includes(initialCategory) ? [initialCategory] : [],
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(list: T[], value: T, set: (next: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (q && !`${p.brand} ${p.name} ${p.colorway}`.toLowerCase().includes(q)) {
        return false;
      }
      if (brands.length && !brands.includes(p.brand)) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => a.popularity - b.popularity);
    }
  }, [query, sort, brands, categories, sizes]);

  const hasFilters = brands.length > 0 || categories.length > 0 || sizes.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Каталог</h1>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900"
        >
          Написать менеджеру
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по каталогу"
            className="w-full rounded-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-600">
          Сортировка
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none focus:border-zinc-900"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          className={`rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
            filtersOpen || hasFilters
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 text-zinc-800 hover:border-zinc-900"
          }`}
        >
          Фильтры{hasFilters ? " ·" : ""}
        </button>
      </div>

      {filtersOpen && (
        <div className="mt-4 grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:grid-cols-3">
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">Бренд</legend>
            <div className="mt-3 space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggle(brands, brand, setBrands)}
                    className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">Категория</legend>
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => toggle(categories, category, setCategories)}
                    className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
                  />
                  {category}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">Размер (EU)</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggle(sizes, size, setSizes)}
                  className={`h-9 w-11 rounded-full border text-sm font-medium transition-colors ${
                    sizes.includes(size)
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-300 text-zinc-700 hover:border-zinc-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setBrands([]);
                  setCategories([]);
                  setSizes([]);
                }}
                className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Сбросить фильтры
              </button>
            )}
          </fieldset>
        </div>
      )}

      <p className="mt-6 text-sm text-zinc-600">Найдено моделей: {filtered.length}</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
          <p className="text-base font-semibold text-zinc-900">Ничего не нашлось</p>
          <p className="mt-2 text-sm text-zinc-600">
            Попробуйте изменить запрос или сбросить фильтры.
          </p>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Написать менеджеру
        </a>
      </div>
    </section>
  );
}

export default function CatalogClient() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-zinc-500">Загрузка каталога…</div>}>
      <CatalogInner />
    </Suspense>
  );
}
