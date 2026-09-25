import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { productsData } from "@/lib/products-data";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const existing = await db
      .select({ count: sql<number>`count(*)` })
      .from(products);
    const count = Number(existing[0].count);

    if (count === 0) {
      await db.insert(products).values(
        productsData.map((p) => ({
          ...p,
          originalPrice: p.originalPrice ?? null,
          rating: p.rating,
        }))
      );
    }

    return NextResponse.json({ status: "ok", products: count === 0 ? productsData.length : count });
  } catch (error) {
    return NextResponse.json({ status: "error", error: String(error) }, { status: 500 });
  }
}
