"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TELEGRAM_URL, type Product } from "@/lib/catalog";
import { useCartActions } from "@/lib/cart";

export default function ProductBuy({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCartActions();
  const router = useRouter();

  const requireSize = (): boolean => {
    if (size) return true;
    setHint(true);
    return false;
  };

  const handleOrder = () => {
    if (!requireSize()) return;
    add(product.slug, size as string);
    router.push("/cart");
  };

  const handleAdd = () => {
    if (!requireSize()) return;
    add(product.slug, size as string);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Доступные размеры (EU)
        </h2>
        <span className={`text-xs ${hint && !size ? "font-semibold text-red-600" : "text-zinc-400"}`}>
          {size ? `Выбран размер ${size}` : "Размер не выбран"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.sizes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setSize(item);
              setHint(false);
            }}
            className={`h-11 w-14 rounded-full border text-sm font-semibold transition-colors ${
              size === item
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleOrder}
          className="rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Заказать
        </button>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full border border-zinc-300 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900"
        >
          {added ? "Добавлено ✓" : "В корзину"}
        </button>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
        >
          Спросить о размере
        </a>
      </div>
    </div>
  );
}
