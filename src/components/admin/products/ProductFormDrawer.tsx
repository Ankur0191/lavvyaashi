"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { AdminButton } from "@/components/admin/ui/AdminButton";
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
}

interface ProductFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
}

const EMPTY_FORM = {
  name: "",
  slug: "",
  category_id: "",
  summary: "",
  description: "",
  ingredients: "",
  benefits: [""],
  how_to_use: "",
  thumbnail: "",
  price: "",
  mrp: "",
  stock: "",
  sku: "",
  weight: "",
  volume: "",
  tags: "",
  featured: false,
  trending: false,
  new_arrival: false,
  best_seller: false,
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductFormDrawer({
  isOpen,
  onClose,
  product,
  categories,
  onSave,
}: ProductFormDrawerProps) {
  const isEdit = !!product;
  const [isSaving, setIsSaving] = React.useState(false);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(false);

  // Populate form when editing
  React.useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        category_id: product.category_id || "",
        summary: product.summary || "",
        description: product.description || "",
        ingredients: product.ingredients || "",
        benefits: product.benefits?.length ? product.benefits : [""],
        how_to_use: product.how_to_use || "",
        thumbnail: product.thumbnail || "",
        price: product.price?.toString() || "",
        mrp: product.mrp?.toString() || "",
        stock: product.stock?.toString() || "",
        sku: product.sku || "",
        weight: product.weight || "",
        volume: product.volume || "",
        tags: product.tags?.join(", ") || "",
        featured: product.featured || false,
        trending: product.trending || false,
        new_arrival: product.new_arrival || false,
        best_seller: product.best_seller || false,
      });
      setSlugManuallyEdited(true);
    } else {
      setForm(EMPTY_FORM);
      setSlugManuallyEdited(false);
    }
  }, [product, isOpen]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugManuallyEdited ? prev.slug : toSlug(name),
    }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    setForm((prev) => {
      const benefits = [...(prev.benefits as string[])];
      benefits[index] = value;
      return { ...prev, benefits };
    });
  };

  const addBenefit = () =>
    setForm((prev) => ({ ...prev, benefits: [...(prev.benefits as string[]), ""] }));

  const removeBenefit = (index: number) =>
    setForm((prev) => ({
      ...prev,
      benefits: (prev.benefits as string[]).filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.mrp) {
      toast.error("Name, Price, and MRP are required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || toSlug(form.name),
        category_id: form.category_id || null,
        summary: form.summary.trim(),
        description: form.description.trim(),
        ingredients: form.ingredients.trim() || null,
        benefits: (form.benefits as string[]).filter((b) => b.trim()),
        how_to_use: form.how_to_use?.trim() || null,
        thumbnail: form.thumbnail.trim() || "/products/serum.webp",
        price: parseFloat(form.price as string),
        mrp: parseFloat(form.mrp as string),
        stock: parseInt(form.stock as string) || 0,
        sku: form.sku?.trim() || null,
        weight: form.weight?.trim() || null,
        volume: form.volume?.trim() || null,
        tags: (form.tags as string)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured: form.featured,
        trending: form.trending,
        new_arrival: form.new_arrival,
        best_seller: form.best_seller,
      };

      const url = isEdit ? `/api/products/${product!.id}` : "/api/products";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      toast.success(isEdit ? "Product updated!" : "Product created!");
      onSave(data.product);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls =
    "w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-[var(--gold)]/60 transition-all";
  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5";
  const sectionCls = "space-y-4 pb-6 border-b border-[var(--border-light)]";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full z-[160] w-full max-w-xl bg-[var(--bg-card)] shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[var(--text)] text-base">
                    {isEdit ? "Edit Product" : "Add New Product"}
                  </h2>
                  <p className="text-xs text-[var(--text-subtle)]">
                    {isEdit ? `Editing: ${product?.name}` : "Fill in the product details below"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="px-6 py-6 space-y-6">

                {/* ── Section: Basic Info ── */}
                <div className={sectionCls}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--gold)]">Basic Info</p>

                  <div>
                    <label className={labelCls}>Product Name *</label>
                    <input
                      className={inputCls}
                      placeholder="e.g. Radiance Botanical Serum"
                      value={form.name as string}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Slug (URL)</label>
                    <input
                      className={inputCls}
                      placeholder="auto-generated from name"
                      value={form.slug as string}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        setForm((prev) => ({ ...prev, slug: e.target.value }));
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Category</label>
                    <select
                      className={inputCls}
                      value={form.category_id as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
                    >
                      <option value="">— Select Category —</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Summary (short tagline)</label>
                    <input
                      className={inputCls}
                      placeholder="e.g. A powerful anti-aging serum with 24k gold flakes."
                      value={form.summary as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                    />
                  </div>
                </div>

                {/* ── Section: Description & Ingredients ── */}
                <div className={sectionCls}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--gold)]">Description & Ingredients</p>

                  <div>
                    <label className={labelCls}>Full Description *</label>
                    <textarea
                      className={`${inputCls} min-h-[100px] resize-y`}
                      placeholder="Detailed product description shown on the product page..."
                      value={form.description as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Ingredients</label>
                    <textarea
                      className={`${inputCls} min-h-[80px] resize-y`}
                      placeholder="Aqua, Glycerin, Hyaluronic Acid, Retinol..."
                      value={form.ingredients as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, ingredients: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>How to Use</label>
                    <textarea
                      className={`${inputCls} resize-y`}
                      placeholder="Apply 2-3 drops to cleansed skin. Gently massage..."
                      value={form.how_to_use as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, how_to_use: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className={labelCls}>Benefits</label>
                    <div className="space-y-2">
                      {(form.benefits as string[]).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            className={inputCls}
                            placeholder={`Benefit ${i + 1}`}
                            value={benefit}
                            onChange={(e) => handleBenefitChange(i, e.target.value)}
                          />
                          {(form.benefits as string[]).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBenefit(i)}
                              className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="flex items-center gap-1.5 text-xs text-[var(--gold)] hover:text-[var(--dark-gold)] font-medium mt-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add benefit
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Section: Pricing & Inventory ── */}
                <div className={sectionCls}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--gold)]">Pricing & Inventory</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Price (₹) *</label>
                      <input
                        className={inputCls}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="4500"
                        value={form.price as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelCls}>MRP (₹) *</label>
                      <input
                        className={inputCls}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="5500"
                        value={form.mrp as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, mrp: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Stock</label>
                      <input
                        className={inputCls}
                        type="number"
                        min="0"
                        placeholder="100"
                        value={form.stock as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>SKU</label>
                      <input
                        className={inputCls}
                        placeholder="LVY-SRM-001"
                        value={form.sku as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Weight</label>
                      <input
                        className={inputCls}
                        placeholder="50g"
                        value={form.weight as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Volume</label>
                      <input
                        className={inputCls}
                        placeholder="30ml"
                        value={form.volume as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, volume: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Section: Media ── */}
                <div className={sectionCls}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--gold)]">Media</p>

                  <div>
                    <label className={labelCls}>Thumbnail URL</label>
                    <div className="flex gap-2">
                      <input
                        className={inputCls}
                        placeholder="/products/serum.webp or https://..."
                        value={form.thumbnail as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
                      />
                      {form.thumbnail && (
                        <div className="w-10 h-10 rounded-lg border border-[var(--border)] overflow-hidden shrink-0 bg-[var(--bg-primary)] flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.thumbnail as string}
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-[var(--text-subtle)] mt-1">
                      Use a relative path (e.g. /products/serum.webp) or an absolute URL
                    </p>
                  </div>
                </div>

                {/* ── Section: Tags & Badges ── */}
                <div className={sectionCls}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--gold)]">Tags & Badges</p>

                  <div>
                    <label className={labelCls}>Tags (comma separated)</label>
                    <input
                      className={inputCls}
                      placeholder="serum, anti-aging, gold"
                      value={form.tags as string}
                      onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { key: "featured", label: "Featured" },
                        { key: "trending", label: "Trending" },
                        { key: "new_arrival", label: "New Arrival" },
                        { key: "best_seller", label: "Best Seller" },
                      ] as { key: keyof typeof EMPTY_FORM; label: string }[]
                    ).map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] cursor-pointer hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={form[key] as boolean}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, [key]: e.target.checked }))
                          }
                          className="w-4 h-4 accent-[var(--gold)] rounded"
                        />
                        <span className="text-sm text-[var(--text)] font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </form>

            {/* Drawer Footer */}
            <div className="px-6 py-4 border-t border-[var(--border)] shrink-0 flex items-center justify-end gap-3 bg-[var(--bg-card)]">
              <AdminButton type="button" variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </AdminButton>
              <AdminButton
                type="submit"
                variant="default"
                disabled={isSaving}
                onClick={handleSubmit}
                className="min-w-[120px]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Create Product"
                )}
              </AdminButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
