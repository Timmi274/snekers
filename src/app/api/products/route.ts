import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, ilike, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const sale = searchParams.get("sale");
  const isNew = searchParams.get("new");

  try {
    const conditions = [];

    if (category) conditions.push(eq(products.category, category));
    if (subcategory) conditions.push(eq(products.subcategory, subcategory));
    if (featured === "true") conditions.push(eq(products.isFeatured, true));
    if (sale === "true") conditions.push(eq(products.isSale, true));
    if (isNew === "true") conditions.push(eq(products.isNew, true));
    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.brand, `%${search}%`),
          ilike(products.description, `%${search}%`)
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
