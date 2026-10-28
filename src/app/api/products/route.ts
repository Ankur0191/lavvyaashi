import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

const ADMIN_SESSION_TOKEN = "lavvyaashi_admin_secure_token_v1";
const ADMIN_COOKIE_NAME = "lavvyaashi_admin_session";

function isAdminAuthorized(request: NextRequest): boolean {
  const adminSession = request.cookies.get(ADMIN_COOKIE_NAME);
  return adminSession?.value === ADMIN_SESSION_TOKEN;
}

// GET /api/products — list all products (admin)
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ products: data });
}

// POST /api/products — create a new product (admin)
export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Auto-generate slug from name if not provided
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const productData = {
      name: body.name,
      slug,
      category_id: body.category_id || null,
      summary: body.summary || "",
      description: body.description || "",
      ingredients: body.ingredients || null,
      benefits: body.benefits || [],
      how_to_use: body.how_to_use || null,
      thumbnail: body.thumbnail || "/products/serum.webp",
      price: parseFloat(body.price) || 0,
      mrp: parseFloat(body.mrp) || parseFloat(body.price) || 0,
      stock: parseInt(body.stock) || 0,
      sku: body.sku || null,
      weight: body.weight || null,
      volume: body.volume || null,
      tags: body.tags || [],
      featured: body.featured || false,
      trending: body.trending || false,
      new_arrival: body.new_arrival || false,
      best_seller: body.best_seller || false,
    };

    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select("*, categories(name, slug)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
