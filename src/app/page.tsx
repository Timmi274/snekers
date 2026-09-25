import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import {
  CATEGORIES,
  CATEGORY_IMAGES,
  POPULAR_SLUGS,
  PRODUCTS,
  TELEGRAM_URL,
  categoryCounts,
  formatPrice,
  getProduct,
} from "@/lib/catalog";

const stats = [
  { value: "4 900+", label: "выполненных заказов" },
  { value: "4.9", label: "средняя оценка" },
  { value: "1–4 дня", label: "срок доставки" },
];

const features = [
  {
    title: "Проверка перед отправкой",
    text: "Осматриваем пару, комплект и коробку. Присылаем фото вашей конкретной пары до отправки.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  },
  {
    title: "Доставка по всей России",
    text: "СДЭК, Boxberry и Почта России. От 15 000 ₽ доставка за наш счет.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    ),
  },
  {
    title: "Поможем с размером",
    text: "Подскажем посадку конкретной модели и подберем размер по длине стопы в сантиметрах.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    ),
  },
  {
    title: "Менеджер на связи",
    text: "Отвечаем в Telegram ежедневно с 10:00 до 22:00 по московскому времени.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    ),
  },
];

const reviews = [
  {
    text: "Заказал Samba OG, менеджер помог с размером — сел идеально. Фото пары прислали до отправки, доставили за два дня.",
    author: "Артем, Москва",
  },
  {
    text: "Брала GEL-Kayano 14, выглядят даже лучше, чем на фото. Приятно, что отвечают быстро и без навязывания.",
    author: "Дарья, Санкт-Петербург",
  },
  {
    text: "Salomon XT-6 искал долго, здесь нашлись в нужном размере. Упаковали аккуратно, всё в порядке.",
    author: "Ильдар, Казань",
  },
];

const faq = [
  {
    q: "Как оформить заказ?",
    a: "Добавьте пару в корзину, выберите размер и заполните форму заказа. Менеджер свяжется с вами в Telegram или по телефону, подтвердит наличие и согласует доставку.",
  },
  {
    q: "Можно ли оплатить на сайте?",
    a: "Онлайн-оплата появится в ближайшее время. Сейчас заказ подтверждает менеджер: оплату можно внести переводом после проверки пары или при получении — как вам удобнее.",
  },
  {
    q: "Что если размер не подойдет?",
    a: "Обменяем на другой размер в течение 14 дней с момента получения, если пара не была в носке и сохранен комплект. Если нужного размера нет в наличии — вернем деньги.",
  },
  {
    q: "AMVER — официальный магазин брендов?",
    a: "Нет, мы не официальный ритейлер Nike, adidas и других брендов. Работаем с проверенными поставщиками оригинальных пар и проверяем каждую пару перед отправкой — поэтому отвечаем за то, что приезжает в коробке.",
  },
];

export default function HomePage() {
  const counts = categoryCounts();
  const popular = POPULAR_SLUGS.map((slug) => getProduct(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const bestseller = PRODUCTS[0];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Оригинальные кроссовки без переплат и лишних обещаний
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Nike, adidas, New Balance, ASICS и Salomon. Проверяем каждую
              пару, показываем фото до отправки и помогаем выбрать размер. Цены
              в рублях, доставка по всей России.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Смотреть каталог
              </Link>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900"
              >
                Написать менеджеру
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="order-last mt-1 text-xs text-zinc-500 sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-zinc-300/50">
              <div className="relative aspect-[4/3]">
                <Image
                  src={bestseller.image}
                  alt="Белые кроссовки с красной подошвой на минималистичном подиуме"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-xl shadow-zinc-300/40">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Бестселлер недели
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-900">
                {bestseller.name} · {formatPrice(bestseller.price)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Категории</h2>
        <p className="mt-3 text-zinc-600">
          Выберите направление — фильтры в каталоге откроются уже настроенными.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/catalog?category=${encodeURIComponent(category)}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100"
            >
              <Image
                src={CATEGORY_IMAGES[category]}
                alt={`Категория ${category}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-lg font-bold text-white">{category}</p>
                <p className="text-sm text-zinc-300">
                  {counts[category]} моделей
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Популярные модели */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Популярные модели
              </h2>
              <p className="mt-3 text-zinc-600">
                То, что чаще всего заказывают в этом месяце.
              </p>
            </div>
            <Link
              href="/catalog"
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900"
            >
              Весь каталог
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Почему AMVER */}
      <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Почему AMVER</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  {feature.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="scroll-mt-24 bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Отзывы покупателей
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.author}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <blockquote className="text-sm leading-relaxed text-zinc-700">
                  «{review.text}»
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-zinc-900">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Частые вопросы</h2>
        <p className="mt-3 text-zinc-600">
          Не нашли ответ? Напишите менеджеру — ответим в течение рабочего дня.
        </p>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Написать менеджеру
        </a>

        <div className="mt-8 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
          {faq.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900"
          >
            Написать менеджеру
          </a>
        </div>
      </section>
    </>
  );
}
