import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_SESSION_TOKEN = "lavvyaashi_admin_secure_token_v1";
const ADMIN_COOKIE_NAME = "lavvyaashi_admin_session";

function isAdminAuthorized(request: NextRequest): boolean {
  const adminSession = request.cookies.get(ADMIN_COOKIE_NAME);
  return adminSession?.value === ADMIN_SESSION_TOKEN;
}

// PATCH /api/products/[id] — update a product (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createAdminClient();

    // Build update payload — only include fields that were sent
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    const allowedFields = [
      "name", "slug", "category_id", "summary", "description",
      "ingredients", "benefits", "how_to_use", "thumbnail",
      "price", "mrp", "stock", "sku", "weight", "volume", "tags",
      "featured", "trending", "new_arrival", "best_seller",
    ];

    for (const field of allowedFields) {
      if (field in body) {
        if (field === "price" || field === "mrp") {
          updateData[field] = parseFloat(body[field]);
        } else if (field === "stock") {
          updateData[field] = parseInt(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    // Auto-regenerate slug if name changed but slug not explicitly provided
    if (body.name && !body.slug) {
      updateData.slug = body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select("*, categories(name, slug)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ product: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

// DELETE /api/products/[id] — delete a product (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
