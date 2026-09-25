import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { productsData } from "@/lib/products-data";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const existing = await db.select({ count: sql<number>`count(*)` }).from(products);
    const count = Number(existing[0].count);

    if (count === 0) {
      await db.insert(products).values(
        productsData.map((p) => ({
          ...p,
          originalPrice: p.originalPrice ?? null,
          rating: p.rating,
        }))
      );
      return NextResponse.json({ seeded: true, count: productsData.length });
    }

    return NextResponse.json({ seeded: false, count });
  } catch (error) {
    console.error("Init error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
