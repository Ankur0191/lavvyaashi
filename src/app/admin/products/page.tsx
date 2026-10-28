"use client";

import * as React from "react";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Pencil, Trash2, RefreshCw, Package } from "lucide-react";
import { MotionDiv } from "@/components/admin/ui/ClientMotion";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import Image from "next/image";
import { formatPrice } from "@/utils";
import { ProductFormDrawer } from "@/components/admin/products/ProductFormDrawer";
import { DeleteConfirmModal } from "@/components/admin/products/DeleteConfirmModal";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  categories?: { name: string; slug: string } | null;
  summary: string;
  description: string;
  ingredients: string | null;
  benefits: string[];
  how_to_use: string | null;
  thumbnail: string;
  price: number;
  mrp: number;
  stock: number;
  sku: string | null;
  weight: string | null;
  volume: string | null;
  tags: string[];
  featured: boolean;
  trending: boolean;
  new_arrival: boolean;
  best_seller: boolean;
  created_at?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(null);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories").catch(() => null),
      ]);

      if (prodRes.ok) {
        const { products } = await prodRes.json();
        setProducts(products || []);
      }

      // Fetch categories directly via Supabase client if API not available
      if (catRes && catRes.ok) {
        const cats = await catRes.json();
        setCategories(cats || []);
      } else {
        // Fallback: get categories from products data
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase.from("categories").select("*").order("position");
        setCategories(data || []);
      }
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setDrawerOpen(true);
  };

  const handleSave = (savedProduct: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });
  };

  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    const res = await fetch(`/api/products/${deletingProduct.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete");
    }
    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
    toast.success(`"${deletingProduct.name}" deleted.`);
    setDeleteModalOpen(false);
    setDeletingProduct(null);
  };

  // Filtered products based on search
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.categories?.name?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Products</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Manage your luxury inventory, pricing, and variants.
              <span className="ml-2 text-[var(--text-subtle)]">({products.length} products)</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AdminButton variant="ghost" size="icon" onClick={fetchData} title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </AdminButton>
            <AdminButton variant="default" onClick={handleOpenAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </AdminButton>
          </div>
        </div>

        {/* Toolbar */}
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4 bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border)] shadow-sm"
        >
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            <input
              type="text"
              placeholder="Search by name, SKU, or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-2 py-1 rounded transition-colors"
            >
              Clear
            </button>
          )}
        </MotionDiv>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-[var(--bg-primary)]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[var(--bg-primary)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--bg-primary)] rounded w-1/2" />
                  <div className="h-px bg-[var(--border-light)]" />
                  <div className="h-3 bg-[var(--bg-primary)] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <MotionDiv
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <AdminCard hoverLift className="group cursor-pointer flex flex-col h-full">
                    <AdminCardContent className="p-0 flex flex-col h-full">
                      {/* Image */}
                      <div className="w-full aspect-[4/3] bg-[var(--bg-primary)] relative border-b border-[var(--border-light)] overflow-hidden">
                        <Image
                          src={product.thumbnail || "/products/serum.webp"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--border)] to-[var(--bg-primary)] opacity-10" />

                        {/* Action Buttons — appear on hover */}
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleOpenEdit(product); }}
                            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-[var(--border)] shadow-sm hover:bg-white text-[var(--text-muted)] hover:text-blue-600 transition-colors"
                            title="Edit product"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleOpenDelete(product); }}
                            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-[var(--border)] shadow-sm hover:bg-white text-[var(--text-muted)] hover:text-red-600 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.featured && (
                            <span className="text-[9px] uppercase tracking-wider font-semibold bg-[var(--gold)] text-white px-1.5 py-0.5 rounded-md">
                              Featured
                            </span>
                          )}
                          {product.best_seller && (
                            <span className="text-[9px] uppercase tracking-wider font-semibold bg-amber-500 text-white px-1.5 py-0.5 rounded-md">
                              Best Seller
                            </span>
                          )}
                          {product.new_arrival && (
                            <span className="text-[9px] uppercase tracking-wider font-semibold bg-emerald-500 text-white px-1.5 py-0.5 rounded-md">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0 mr-2">
                            <h3 className="font-medium text-[var(--text)] line-clamp-1">{product.name}</h3>
                            <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)] mt-0.5">
                              {product.categories?.name || "Uncategorized"}
                            </p>
                          </div>
                          <span className="font-semibold text-[var(--text)] shrink-0 text-sm">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        {product.mrp > product.price && (
                          <p className="text-[10px] text-[var(--text-subtle)] line-through mb-2">
                            MRP: {formatPrice(product.mrp)}
                          </p>
                        )}

                        {product.summary && (
                          <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3 leading-relaxed flex-1">
                            {product.summary}
                          </p>
                        )}

                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-[var(--border-light)]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                product.stock > 10
                                  ? "bg-green-500"
                                  : product.stock > 0
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="text-xs font-medium text-[var(--text-muted)]">
                              {product.stock} in stock
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(product)}
                              className="text-xs text-[var(--text-muted)] hover:text-blue-600 font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <span className="text-[var(--border)] text-xs">·</span>
                            <button
                              onClick={() => handleOpenDelete(product)}
                              className="text-xs text-[var(--text-muted)] hover:text-red-600 font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </AdminCardContent>
                  </AdminCard>
                </MotionDiv>
              ))}

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-[var(--text-subtle)]" />
                  </div>
                  <p className="font-medium text-[var(--text)]">
                    {searchQuery ? "No products match your search" : "No products yet"}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {searchQuery ? "Try a different search term" : "Click \"Add Product\" to create your first product."}
                  </p>
                  {!searchQuery && (
                    <AdminButton variant="default" className="mt-4" onClick={handleOpenAdd}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </AdminButton>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Product Form Drawer */}
      <ProductFormDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={editingProduct}
        categories={categories}
        onSave={handleSave}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeletingProduct(null); }}
        onConfirm={handleDelete}
        productName={deletingProduct?.name || ""}
      />
    </>
  );
}
