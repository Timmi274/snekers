import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { productsData } from "@/lib/products-data";

export async function POST() {
  try {
    await db.delete(products);
    await db.insert(products).values(
      productsData.map((p) => ({
        ...p,
        originalPrice: p.originalPrice ?? null,
        rating: p.rating,
      }))
    );
    return NextResponse.json({ success: true, count: productsData.length });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
