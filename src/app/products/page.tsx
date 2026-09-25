import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, ilike, or } from "drizzle-orm";
import type { Product } from "@/db/schema";

interface SearchParams {
  category?: string;
  subcategory?: string;
  search?: string;
  featured?: string;
  sale?: string;
  new?: string;
  sort?: string;
  brand?: string;
}

async function getProducts(searchParams: SearchParams): Promise<Product[]> {
  try {
    const conditions = [];

    if (searchParams.category) {
      conditions.push(eq(products.category, searchParams.category));
    }
    if (searchParams.subcategory) {
      conditions.push(eq(products.subcategory, searchParams.subcategory));
    }
    if (searchParams.featured === "true") {
      conditions.push(eq(products.isFeatured, true));
    }
    if (searchParams.sale === "true") {
      conditions.push(eq(products.isSale, true));
    }
    if (searchParams.new === "true") {
      conditions.push(eq(products.isNew, true));
    }
    if (searchParams.brand) {
      conditions.push(ilike(products.brand, searchParams.brand));
    }
    if (searchParams.search) {
      conditions.push(
        or(
          ilike(products.name, `%${searchParams.search}%`),
          ilike(products.brand, `%${searchParams.search}%`),
          ilike(products.description, `%${searchParams.search}%`)
        )!
      );
    }

    const result =
      conditions.length > 0
        ? await db
            .select()
            .from(products)
            .where(and(...conditions))
        : await db.select().from(products);

    return result;
  } catch {
    return [];
  }
}

function getPageTitle(searchParams: SearchParams): string {
  if (searchParams.search) return `Search: "${searchParams.search}"`;
  if (searchParams.sale === "true") return "Sale";
  if (searchParams.new === "true") return "New Arrivals";
  if (searchParams.category === "sneakers") return "Sneakers";
  if (searchParams.category === "clothing") return "Clothing";
  if (searchParams.brand) return searchParams.brand;
  return "All Products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const allProducts = await getProducts(params);
  const title = getPageTitle(params);

  const sneakerSubcats = ["basketball", "running", "lifestyle", "skate"];
  const clothingSubcats = ["hoodies", "t-shirts", "sweatshirts", "pants", "shorts", "jackets"];
  const subcats = params.category === "clothing" ? clothingSubcats : sneakerSubcats;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-gray-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-4xl font-black uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {allProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Category
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/products"
                      className={`text-sm font-medium hover:text-red-600 transition-colors ${
                        !params.category ? "text-black" : "text-gray-500"
                      }`}
                    >
                      All Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products?category=sneakers"
                      className={`text-sm font-medium hover:text-red-600 transition-colors ${
                        params.category === "sneakers"
                          ? "text-black font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Sneakers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products?category=clothing"
                      className={`text-sm font-medium hover:text-red-600 transition-colors ${
                        params.category === "clothing"
                          ? "text-black font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Clothing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Subcategories */}
              {params.category && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                    Type
                  </h3>
                  <ul className="space-y-2">
                    {subcats.map((sub) => (
                      <li key={sub}>
                        <a
                          href={`/products?category=${params.category}&subcategory=${sub}`}
                          className={`text-sm font-medium capitalize hover:text-red-600 transition-colors ${
                            params.subcategory === sub
                              ? "text-black font-bold"
                              : "text-gray-500"
                          }`}
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Filters */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Filter
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/products?new=true"
                      className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products?sale=true"
                      className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                    >
                      On Sale
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products?featured=true"
                      className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Featured
                    </a>
                  </li>
                </ul>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Brand
                </h3>
                <ul className="space-y-2">
                  {[
                    "Nike",
                    "Jordan",
                    "Adidas",
                    "New Balance",
                    "Converse",
                    "Vans",
                    "Supreme",
                    "Stüssy",
                    "The North Face",
                    "Champion",
                  ].map((brand) => (
                    <li key={brand}>
                      <a
                        href={`/products?brand=${encodeURIComponent(brand)}`}
                        className={`text-sm font-medium hover:text-red-600 transition-colors ${
                          params.brand === brand
                            ? "text-black font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        {brand}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filters (horizontal scroll) */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6">
              {[
                { label: "All", href: "/products" },
                { label: "Sneakers", href: "/products?category=sneakers" },
                { label: "Clothing", href: "/products?category=clothing" },
                { label: "New", href: "/products?new=true" },
                { label: "Sale", href: "/products?sale=true" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex-shrink-0 px-4 py-2 border border-gray-300 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  {label}
                </a>
              ))}
            </div>

            {allProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">👟</div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <a href="/products" className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase">
                  View All Products
                </a>
              </div>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
