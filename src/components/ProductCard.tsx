"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/db/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlistActive, setWishlistActive] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      setWishlistActive((prev) => !prev);
    } catch {
      // ignore
    }
  };

  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="group relative bg-white overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl border border-gray-100">
        {/* Image Container */}
        <div className="relative bg-gray-50 overflow-hidden" style={{ paddingBottom: "100%" }}>
          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="text-4xl mb-2">👟</div>
                <p className="text-gray-400 text-xs">{product.brand}</p>
              </div>
            </div>
          )}

          {/* Badges */}
          {product.isNew && !product.isSale && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 tracking-widest uppercase z-10">
              New
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 tracking-widest uppercase z-10">
              {discount ? `-${discount}%` : "Sale"}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-black text-white text-xs font-bold px-3 py-1 tracking-widest uppercase">
                Sold Out
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 hover:text-white z-10"
            aria-label="Add to wishlist"
          >
            <svg
              className="w-4 h-4"
              fill={wishlistActive ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-sm text-black leading-tight line-clamp-2 mb-1">
            {product.name}
          </h3>
          {product.colorway && (
            <p className="text-gray-400 text-xs mb-2">{product.colorway}</p>
          )}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-gray-400 text-xs line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
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
            <span className="text-xs text-gray-400">
              ({product.reviewCount?.toLocaleString()})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
