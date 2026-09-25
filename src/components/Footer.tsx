import Link from "next/link";
import { CATEGORIES, TELEGRAM_URL } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="mt-20 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-black tracking-tight text-white">
            AMVER<span className="text-red-500">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
            Оригинальные кроссовки с доставкой по России. Проверяем каждую пару
            и показываем фото до отправки.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Категории
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href={`/catalog?category=${encodeURIComponent(category)}`}
                  className="transition-colors hover:text-white"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Связь
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Отвечаем в Telegram ежедневно с 10:00 до 22:00 по московскому
            времени.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Написать менеджеру
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AMVER. Мы не являемся официальным
          магазином брендов: все пары закупаются у проверенных поставщиков и
          проверяются вручную перед отправкой.
        </p>
      </div>
    </footer>
  );
}
