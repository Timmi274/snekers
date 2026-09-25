"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

const STORAGE_KEY = "amver-cart";
const EVENT = "amver-cart-change";

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, readCart, () => [] as CartLine[]);
}

export function useCartCount(): number {
  const lines = useCartLines();
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function useCartActions() {
  const add = useCallback((slug: string, size: string, qty = 1) => {
    const lines = readCart();
    const existing = lines.find((l) => l.slug === slug && l.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({ slug, size, qty });
    }
    writeCart(lines);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    const lines = readCart()
      .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    writeCart(lines);
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    writeCart(readCart().filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  return { add, setQty, remove, clear };
}
