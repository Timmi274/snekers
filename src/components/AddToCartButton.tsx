"use client";

import { useState } from "react";
import type { Product } from "@/db/schema";

interface AddToCartButtonProps {
  product: Product;
  sizes: string[];
}

export default function AddToCartButton({ product, sizes }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlistActive, setWishlistActive] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }

    if (!product.inStock) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
          quantity: 1,
        }),
      });

      if (res.ok) {
        setAdded(true);
        window.dispatchEvent(new Event("cart-updated"));
        setTimeout(() => setAdded(false), 2000);
      } else {
        setError("Failed to add to cart");
      }
    } catch {
      setError("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
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

  return (
    <div>
      {/* Size Selector */}
      {sizes.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Select Size
            </h3>
            <button className="text-xs text-gray-400 underline hover:text-black transition-colors">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setError(null);
                }}
                className={`size-btn ${
                  selectedSize === size ? "size-btn-selected" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-red-600 text-xs mt-2 font-semibold">{error}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={loading || !product.inStock}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
            !product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : added
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:bg-red-600 active:scale-[0.98]"
          }`}
        >
          {loading
            ? "Adding..."
            : added
            ? "✓ Added to Cart"
            : !product.inStock
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

        <button
          onClick={handleWishlist}
          className={`w-14 border flex items-center justify-center transition-all duration-200 ${
            wishlistActive
              ? "border-red-600 bg-red-600 text-white"
              : "border-gray-300 hover:border-black hover:bg-black hover:text-white"
          }`}
          aria-label="Add to wishlist"
        >
          <svg
            className="w-5 h-5"
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

      {/* Buy Now */}
      {product.inStock && (
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 py-4 border-2 border-black text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 active:scale-[0.98]"
        >
          Buy Now
        </button>
      )}
    </div>
  );
}
