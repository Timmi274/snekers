import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cartItems, products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSessionId } from "@/lib/session";

export async function GET() {
  const sessionId = await getSessionId();

  try {
    const items = await db
      .select({
        id: cartItems.id,
        sessionId: cartItems.sessionId,
        productId: cartItems.productId,
        size: cartItems.size,
        quantity: cartItems.quantity,
        createdAt: cartItems.createdAt,
        product: {
          id: products.id,
          name: products.name,
          brand: products.brand,
          price: products.price,
          image: products.image,
          colorway: products.colorway,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));

    return NextResponse.json(items);
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionId = await getSessionId();
  const body = await request.json() as { productId: number; size: string; quantity?: number };
  const { productId, size, quantity = 1 } = body;

  try {
    const existing = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, sessionId),
          eq(cartItems.productId, productId),
          eq(cartItems.size, size)
        )
      );

    if (existing.length > 0) {
      await db
        .update(cartItems)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cartItems.id, existing[0].id));
    } else {
      await db.insert(cartItems).values({
        sessionId,
        productId,
        size,
        quantity,
      });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("session_id", sessionId, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Cart add error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const sessionId = await getSessionId();
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("id");

  try {
    if (itemId) {
      await db
        .delete(cartItems)
        .where(
          and(eq(cartItems.id, parseInt(itemId)), eq(cartItems.sessionId, sessionId))
        );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart delete error:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}
