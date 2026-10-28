import React from "react";
import { createClient } from "@/lib/supabase/server";
import { ProductsView } from "@/components/shop/ProductsView";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("position");

  // Fetch products
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  return (
    <ProductsView
      initialProducts={products || []}
      categories={categories || []}
    />
  );
}
