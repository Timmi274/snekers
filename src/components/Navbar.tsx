"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  quantity: number;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = (await res.json()) as CartItem[];
        if (Array.isArray(data)) {
          const total = data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
          setCartCount(total);
        }
      } catch {
        // ignore
      }
    };
    fetchCart();

    const handler = () => fetchCart();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center text-xs py-2 tracking-widest font-semibold uppercase">
        Free shipping on orders over $150 · Authentic products guaranteed
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-black text-white font-black text-lg px-3 py-1 tracking-widest">
                SOLE
              </div>
              <span className="text-black font-black text-lg tracking-widest">
                &amp; STYLE
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/products?category=sneakers" className="text-sm font-semibold tracking-widest uppercase text-black transition-colors duration-200 hover:text-red-600">
                Sneakers
              </Link>
              <Link href="/products?category=clothing" className="text-sm font-semibold tracking-widest uppercase text-black transition-colors duration-200 hover:text-red-600">
                Clothing
              </Link>
              <Link href="/products?new=true" className="text-sm font-semibold tracking-widest uppercase text-red-600 transition-colors duration-200 hover:text-black">
                New Arrivals
              </Link>
              <Link href="/products?sale=true" className="text-sm font-semibold tracking-widest uppercase text-black transition-colors duration-200 hover:text-red-600">
                Sale
              </Link>
              <Link href="/brands" className="text-sm font-semibold tracking-widest uppercase text-black transition-colors duration-200 hover:text-red-600">
                Brands
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-red-600 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="p-2 hover:text-red-600 transition-colors hidden sm:block">
                <svg
                  className="w-5 h-5"
                  fill="none"
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
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:text-red-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2"
                aria-label="Menu"
              >
                <div className="w-5 flex flex-col gap-1">
                  <span
                    className={`block h-0.5 bg-black transition-transform duration-300 ${
                      menuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-black transition-opacity duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-black transition-transform duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link
                href="/products?category=sneakers"
                className="text-sm font-semibold tracking-widest uppercase py-2 border-b border-gray-100 hover:text-red-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sneakers
              </Link>
              <Link
                href="/products?category=clothing"
                className="text-sm font-semibold tracking-widest uppercase py-2 border-b border-gray-100 hover:text-red-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link
                href="/products?new=true"
                className="text-sm font-semibold tracking-widest uppercase py-2 border-b border-gray-100 text-red-600 hover:text-black transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/products?sale=true"
                className="text-sm font-semibold tracking-widest uppercase py-2 border-b border-gray-100 hover:text-red-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sale
              </Link>
              <Link
                href="/brands"
                className="text-sm font-semibold tracking-widest uppercase py-2 hover:text-red-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-20"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sneakers, clothing, brands..."
                className="w-full bg-white text-black text-xl px-6 py-5 pr-16 outline-none font-medium"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            <div className="bg-black/50 mt-2 px-6 py-3">
              <p className="text-white/60 text-sm">
                Popular: Air Jordan 1, Yeezy 350, Nike Dunk, Ultraboost
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
