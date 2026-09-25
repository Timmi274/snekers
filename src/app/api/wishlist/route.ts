import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wishlistItems, products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSessionId } from "@/lib/session";

export async function GET() {
  const sessionId = await getSessionId();

  try {
    const items = await db
      .select({
        id: wishlistItems.id,
        productId: wishlistItems.productId,
        product: {
          id: products.id,
          name: products.name,
          brand: products.brand,
          price: products.price,
          image: products.image,
          colorway: products.colorway,
          isSale: products.isSale,
          originalPrice: products.originalPrice,
        },
      })
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .where(eq(wishlistItems.sessionId, sessionId));

    return NextResponse.json(items);
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionId = await getSessionId();
  const body = await request.json() as { productId: number };
  const { productId } = body;

  try {
    const existing = await db
      .select()
      .from(wishlistItems)
      .where(
        and(
          eq(wishlistItems.sessionId, sessionId),
          eq(wishlistItems.productId, productId)
        )
      );

    if (existing.length > 0) {
      await db.delete(wishlistItems).where(eq(wishlistItems.id, existing[0].id));
      const response = NextResponse.json({ success: true, action: "removed" });
      response.cookies.set("session_id", sessionId, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return response;
    } else {
      await db.insert(wishlistItems).values({ sessionId, productId });
      const response = NextResponse.json({ success: true, action: "added" });
      response.cookies.set("session_id", sessionId, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return response;
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
