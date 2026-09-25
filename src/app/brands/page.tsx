import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ilike } from "drizzle-orm";
import type { Product } from "@/db/schema";

const brandDescriptions: Record<string, string> = {
  Nike: "The world's leading athletic footwear and apparel company. Just Do It.",
  Jordan: "Michael Jordan's legacy lives on in every pair. Basketball royalty.",
  Adidas: "Impossible is nothing. Premium performance and street-ready style.",
  "New Balance": "Endorsed by no one. Made for athletes everywhere.",
  Converse: "Since 1908. Chuck Taylor forever changed the game.",
  Vans: "Off the Wall since 1966. Skate culture born in Southern California.",
  Supreme: "The world's most influential streetwear brand. Limited. Exclusive.",
  "Stüssy": "The original streetwear brand. Hawaii to the world.",
  "The North Face": "Never stop exploring. Built for the mountains and the streets.",
  Champion: "American Athletic Company since 1919. The reverse weave legend.",
  "Stone Island": "Material research and innovation. Compass badge, Italian origin.",
  "Carhartt WIP": "Work in Progress. Workwear meets streetwear.",
  "Off-White": "Virgil Abloh's vision of industrial streetwear luxury.",
};

const allBrands = Object.keys(brandDescriptions);

async function getProductsByBrand(brand: string): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(products)
      .where(ilike(products.brand, brand))
      .limit(12);
  } catch {
    return [];
  }
}

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const selectedBrand = params.brand;
  const brandProducts = selectedBrand
    ? await getProductsByBrand(selectedBrand)
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            {selectedBrand ?? "All Brands"}
          </h1>
          {selectedBrand && brandDescriptions[selectedBrand] && (
            <p className="text-gray-400 mt-2 max-w-xl">
              {brandDescriptions[selectedBrand]}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!selectedBrand ? (
          /* Brand Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBrands.map((brand) => (
              <a
                key={brand}
                href={`/brands?brand=${encodeURIComponent(brand)}`}
                className="group block border border-gray-100 hover:border-black hover:shadow-xl transition-all duration-300 p-8 text-center"
              >
                <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-black text-xl">
                    {brand[0]}
                  </span>
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest mb-1">
                  {brand}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {brandDescriptions[brand]}
                </p>
                <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-red-600 group-hover:text-black transition-colors">
                  Shop Now →
                </span>
              </a>
            ))}
          </div>
        ) : (
          /* Brand Products */
          <Suspense fallback={<div>Loading...</div>}>
            {brandProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">
                  No products found for {selectedBrand}.
                </p>
                <a href="/brands" className="border border-black text-black px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-all">
                  View All Brands
                </a>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-gray-500 text-sm">
                    {brandProducts.length} products
                  </p>
                  <a href="/brands" className="text-sm font-semibold underline hover:text-red-600 transition-colors">
                    ← All Brands
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {brandProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </Suspense>
        )}
      </div>

      <Footer />
    </div>
  );
}
