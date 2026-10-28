import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { code, orderValue } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    const supabase = await createClient();
    
    // We use the admin client or just simple select since RLS allows public read for coupons.
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    if (!coupon.is_active) {
      return NextResponse.json({ error: "Coupon is no longer active" }, { status: 400 });
    }

    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
    }

    if (coupon.min_order_value && orderValue < coupon.min_order_value) {
      return NextResponse.json({ 
        error: `Minimum order value of ${coupon.min_order_value} required` 
      }, { status: 400 });
    }

    return NextResponse.json({
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      max_discount: coupon.max_discount,
      code: coupon.code
    });

  } catch (e: any) {
    return NextResponse.json({ error: "Server error validating coupon" }, { status: 500 });
  }
}
