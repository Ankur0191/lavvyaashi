import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_SESSION_TOKEN = "lavvyaashi_admin_secure_token_v1";
const ADMIN_COOKIE_NAME = "lavvyaashi_admin_session";

function isAdminAuthorized(request: NextRequest): boolean {
  const adminSession = request.cookies.get(ADMIN_COOKIE_NAME);
  return adminSession?.value === ADMIN_SESSION_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ coupons: data });
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("coupons")
      .insert({
        code: body.code.toUpperCase(),
        discount_type: body.discount_type,
        discount_value: parseFloat(body.discount_value),
        min_order_value: body.min_order_value ? parseFloat(body.min_order_value) : 0,
        usage_limit: body.usage_limit ? parseInt(body.usage_limit) : null,
        valid_until: body.valid_until || null,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ coupon: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
