import React from "react";
import { createClient } from "@/lib/supabase/server";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Cache for 60 seconds

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bg-primary pt-navbar flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-5xl font-serif text-text">Product Not Found</p>
        <p className="text-text-muted max-w-md">
          The product you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-2 bg-gradient-gold text-white shadow-gold hover:shadow-lg px-6 py-3 rounded-md font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      {/* Breadcrumb */}
      <div className="container pt-6 pb-0">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-text transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-text">{product.name}</span>
        </nav>
      </div>

      <div className="container py-8 md:py-16">
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}

