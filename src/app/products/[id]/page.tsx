import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, ne, and } from "drizzle-orm";
import type { Product } from "@/db/schema";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)));
    return product ?? null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.category, product.category),
          ne(products.id, product.id)
        )
      )
      .limit(4);
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product);
  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice
    ? parseFloat(product.originalPrice)
    : null;
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const sizes = product.sizes ?? [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-black transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative bg-gray-50 overflow-hidden" style={{ paddingBottom: "100%" }}>
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 tracking-widest uppercase z-10">
                  New
                </span>
              )}
              {product.isSale && discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 tracking-widest uppercase z-10">
                  -{discount}%
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Thumbnail strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 bg-gray-50 border-2 border-black overflow-hidden cursor-pointer flex-shrink-0"
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand & Name */}
            <div className="mb-4">
              <Link
                href={`/brands?brand=${product.brand}`}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
              >
                {product.brand}
              </Link>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-1">
                {product.name}
              </h1>
              {product.colorway && (
                <p className="text-gray-500 text-sm mt-1">{product.colorway}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(parseFloat(product.rating ?? "4.5"))
                        ? "text-black"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black">
                ${price.toFixed(2)}
              </span>
              {originalPrice && originalPrice > price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="bg-gray-100 border border-gray-200 px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-gray-600">
                  ⚠️ This product is currently out of stock. Check back soon.
                </p>
              </div>
            )}

            {/* Add to Cart Section */}
            <AddToCartButton product={product} sizes={sizes} />

            {/* Details Accordion */}
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">
                  Product Details
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Brand</span>
                    <span className="font-medium">{product.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="font-medium capitalize">{product.subcategory}</span>
                  </li>
                  {product.colorway && (
                    <li className="flex justify-between">
                      <span className="text-gray-400">Colorway</span>
                      <span className="font-medium">{product.colorway}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">
                  Shipping & Returns
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Free shipping on orders over $150</li>
                  <li>✓ 30-day return policy</li>
                  <li>✓ 100% authentic products</li>
                  <li>✓ Delivered in 3–7 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
