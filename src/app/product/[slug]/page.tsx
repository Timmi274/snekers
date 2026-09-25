import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductBuy from "@/components/ProductBuy";
import {
  PRODUCTS,
  badgeClasses,
  badgeLabel,
  formatPrice,
  getProduct,
  relatedProducts,
} from "@/lib/catalog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Модель не найдена" };
  return {
    title: `${product.brand} ${product.name} — купить за ${formatPrice(product.price)}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const badge = badgeLabel(product);
  const related = relatedProducts(product);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Назад в каталог
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-zinc-500">{product.brand}</span>
            {badge && (
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClasses(product)}`}
              >
                {badge}
              </span>
            )}
          </div>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {product.colorway} · {product.category}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-500" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.196-1.539-1.118l1.286-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.958Z" />
              </svg>
              {product.rating.toFixed(1)}
            </span>
            <span className="text-zinc-500">· {product.reviews} отзывов</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-black tracking-tight">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="pb-1 text-lg text-zinc-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>

          <ProductBuy product={product} />
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Описание</h2>
          <p className="mt-4 leading-relaxed text-zinc-600">{product.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
              Пара проверяется перед отправкой, фото присылаем в Telegram.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
              Доставка 1–4 дня по России, от 15 000 ₽ — бесплатно.
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Похожие модели</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
