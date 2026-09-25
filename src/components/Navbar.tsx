"use client";

import Link from "next/link";
import { useCartCount } from "@/lib/cart";
import { TELEGRAM_URL } from "@/lib/catalog";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/#why", label: "Почему AMVER" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "Вопросы" },
];

export default function Navbar() {
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-zinc-950 text-zinc-100">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
          Новая поставка · 12 моделей в наличии
        </p>
      </div>
      <div className="border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black tracking-tight">
            AMVER<span className="text-red-600">.</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/cart"
              aria-label="Корзина"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:inline-flex"
            >
              Написать менеджеру
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
