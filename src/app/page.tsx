import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { Product } from "@/db/schema";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(products)
      .where(and(eq(products.isFeatured, true), eq(products.inStock, true)))
      .limit(8);
  } catch {
    return [];
  }
}

async function getNewProducts(): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isNew, true))
      .limit(4);
  } catch {
    return [];
  }
}

const brands = [
  { name: "Nike", bg: "#000000", textColor: "#ffffff" },
  { name: "Jordan", bg: "#111111", textColor: "#ffffff" },
  { name: "Adidas", bg: "#000000", textColor: "#ffffff" },
  { name: "New Balance", bg: "#CC0000", textColor: "#ffffff" },
  { name: "Converse", bg: "#000000", textColor: "#ffffff" },
  { name: "Vans", bg: "#111111", textColor: "#ffffff" },
  { name: "Supreme", bg: "#CC0000", textColor: "#ffffff" },
  { name: "Stone Island", bg: "#000000", textColor: "#ffffff" },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const newProducts = await getNewProducts();
  const hasProducts = featuredProducts.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=90"
            alt="Hero Sneaker"
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-2xl">
            <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 tracking-widest uppercase mb-4">
              New Season 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-6">
              Move in
              <br />
              <span className="text-white">Style.</span>
              <br />
              <span className="text-red-500">Always.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Authentic sneakers and premium streetwear. Shop the latest drops
              from Nike, Jordan, Adidas, and more.
            </p>
            <div className="flex flex-wrap gap-4">
            <Link href="/products?category=sneakers" className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-red-600">
              Shop Sneakers
            </Link>
              <Link
                href="/products?category=clothing"
                className="border border-white text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-white hover:text-black"
              >
                Shop Clothing
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sneakers */}
          <Link href="/products?category=sneakers" className="group relative overflow-hidden bg-gray-100 aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80"
              alt="Sneakers"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1">
                Collection
              </p>
              <h3 className="text-white text-2xl font-black uppercase">
                Sneakers
              </h3>
              <span className="text-red-400 text-sm font-semibold mt-1 block group-hover:text-white transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* Clothing */}
          <Link href="/products?category=clothing" className="group relative overflow-hidden bg-gray-100 aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80"
              alt="Clothing"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1">
                Collection
              </p>
              <h3 className="text-white text-2xl font-black uppercase">
                Clothing
              </h3>
              <span className="text-red-400 text-sm font-semibold mt-1 block group-hover:text-white transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* New Arrivals */}
          <Link href="/products?new=true" className="group relative overflow-hidden bg-black aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=800&q=80"
              alt="New Arrivals"
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-0.5 tracking-widest uppercase mb-2">
                Just Dropped
              </div>
              <h3 className="text-white text-2xl font-black uppercase">
                New Arrivals
              </h3>
              <span className="text-red-400 text-sm font-semibold mt-1 block group-hover:text-white transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🔐", label: "100% Authentic", sub: "All products verified" },
              { icon: "🚚", label: "Free Shipping", sub: "On orders over $150" },
              { icon: "↩️", label: "Easy Returns", sub: "30-day return policy" },
              { icon: "💳", label: "Secure Payment", sub: "Encrypted checkout" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
              Hand-picked
            </p>
            <h2 className="text-3xl font-black tracking-tight uppercase">Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold uppercase tracking-widest hover:text-red-600 transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>

        {!hasProducts ? (
          <div className="text-center py-16 bg-gray-50">
            <p className="text-gray-400 mb-4">Loading products...</p>
            <Link href="/api/seed" className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase">
              Initialize Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
                  Fresh Drop
                </p>
                <h2 className="text-white text-3xl font-black uppercase tracking-tight">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/products?new=true"
                className="text-sm font-semibold uppercase tracking-widest text-white hover:text-red-500 transition-colors hidden sm:block"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556048219-bb6978360b84?w=1600&q=80"
            alt="Running"
            fill
            className="object-cover opacity-25"
            unoptimized
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
            Limited Time
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Up to 40% Off
            <br />
            <span className="text-red-500">Sale Items</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Don&apos;t miss out on these exclusive deals. Limited stock available.
          </p>
          <Link href="/products?sale=true" className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all hover:bg-red-600">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
            Premium Partners
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase">Shop by Brand</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/brands?brand=${brand.name}`}
              className="group flex flex-col items-center justify-center bg-gray-50 hover:bg-black transition-all duration-200 py-6 px-3 text-center"
            >
              <span className="font-black text-xs uppercase tracking-widest text-black group-hover:text-white transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram-style Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight uppercase">Wear it. Show it.</h2>
          <p className="text-gray-500 mt-2">
            Community style from{" "}
            <span className="font-bold">@sole.and.style</span>
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {[
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
            "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80",
            "https://images.unsplash.com/photo-1607522370275-f6fd21250e4d?w=400&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
          ].map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer">
              <Image
                src={src}
                alt={`Style ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
