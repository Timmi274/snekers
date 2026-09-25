"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WishlistItem {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
    colorway: string | null;
    isSale: boolean | null;
    originalPrice: string | null;
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json() as WishlistItem[];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (productId: number) => {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    await fetchWishlist();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-pulse text-gray-400 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
          Wishlist
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          {items.length} saved item{items.length !== 1 ? "s" : ""}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">❤️</div>
            <h2 className="text-2xl font-black uppercase mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Save your favorite items to find them later.
            </p>
            <Link href="/products" className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-red-600 transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => {
              const price = parseFloat(item.product.price);
              const originalPrice = item.product.originalPrice
                ? parseFloat(item.product.originalPrice)
                : null;

              return (
                <div key={item.id} className="group relative border border-gray-100 hover:shadow-lg transition-shadow">
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <Link href={`/products/${item.product.id}`}>
                    <div className="relative bg-gray-50" style={{ paddingBottom: "100%" }}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {item.product.isSale && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 uppercase tracking-widest">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        {item.product.brand}
                      </p>
                      <p className="font-semibold text-sm mt-0.5 line-clamp-2">
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-black text-sm">
                          ${price.toFixed(2)}
                        </span>
                        {originalPrice && originalPrice > price && (
                          <span className="text-gray-400 text-xs line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
