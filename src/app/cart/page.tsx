"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartActions, useCartLines } from "@/lib/cart";
import {
  TELEGRAM_URL,
  formatPrice,
  getProduct,
} from "@/lib/catalog";

const FREE_SHIPPING_FROM = 15000;

export default function CartPage() {
  const lines = useCartLines();
  const { setQty, remove, clear } = useCartActions();

  const items = lines
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter((item): item is { line: (typeof lines)[number]; product: NonNullable<ReturnType<typeof getProduct>> } =>
      Boolean(item.product),
    );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.line.qty,
    0,
  );
  const freeShipping = total >= FREE_SHIPPING_FROM;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Корзина</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-14 text-center">
          <p className="text-lg font-semibold text-zinc-900">Пока пусто</p>
          <p className="mt-2 text-sm text-zinc-600">
            Выберите пару в каталоге — мы проверим ее перед отправкой и пришлем
            фото в Telegram.
          </p>
          <Link
            href="/catalog"
            className="mt-6 inline-flex rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Смотреть каталог
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white px-5">
            {items.map(({ line, product }) => (
              <li key={`${line.slug}-${line.size}`} className="flex gap-4 py-5">
                <Link
                  href={`/product/${product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-50"
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-zinc-500">{product.brand}</p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-semibold text-zinc-900 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-zinc-500">Размер {line.size} (EU)</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-zinc-300">
                      <button
                        type="button"
                        aria-label="Уменьшить количество"
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Увеличить количество"
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900"
                      >
                        +
                      </button>
                    </div>
                    <p className="w-24 text-right font-bold">
                      {formatPrice(product.price * line.qty)}
                    </p>
                    <button
                      type="button"
                      aria-label="Убрать из корзины"
                      onClick={() => remove(line.slug, line.size)}
                      className="text-zinc-400 transition-colors hover:text-red-600"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-bold">Ваш заказ</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-600">
                <dt>Товары</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between text-zinc-600">
                <dt>Доставка</dt>
                <dd>{freeShipping ? "Бесплатно" : "рассчитает менеджер"}</dd>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-zinc-900">
                <dt>Итого</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            {!freeShipping && (
              <p className="mt-3 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
                До бесплатной доставки не хватает{" "}
                {formatPrice(FREE_SHIPPING_FROM - total)}.
              </p>
            )}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block rounded-full bg-zinc-900 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Оформить заказ
            </a>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Менеджер подтвердит наличие, согласует доставку и пришлет фото
              вашей пары перед отправкой.
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-4 text-xs font-semibold text-zinc-400 transition-colors hover:text-red-600"
            >
              Очистить корзину
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
