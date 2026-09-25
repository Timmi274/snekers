import Link from "next/link";
import Image from "next/image";
import {
  badgeClasses,
  badgeLabel,
  formatPrice,
  sizeRange,
  type Product,
} from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const badge = badgeLabel(product);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-xl hover:shadow-zinc-200/60"
    >
      <div className="relative aspect-square bg-zinc-50">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClasses(product)}`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="font-semibold text-zinc-700">{product.brand}</span>
          <span className="inline-flex items-center gap-1">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-amber-500" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.196-1.539-1.118l1.286-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.958Z" />
            </svg>
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-zinc-900">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-500">
          {product.category} · размеры {sizeRange(product)}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-lg font-bold text-zinc-900">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-sm text-zinc-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <span className="rounded-full border border-zinc-300 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
            Выбрать
          </span>
        </div>
      </div>
    </Link>
  );
}
