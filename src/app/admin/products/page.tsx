"use client";

import * as React from "react";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Products</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage your luxury inventory, pricing, and variants.
          </p>
        </div>
        <AdminButton variant="default">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </AdminButton>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border)] shadow-sm"
      >
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-4 h-4 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search products by name, SKU, or category..." 
            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]"
          />
        </div>
        <div className="w-[1px] h-6 bg-[var(--border)]" />
        <AdminButton variant="ghost" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </AdminButton>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <AdminCard hoverLift className="group cursor-pointer flex flex-col h-full">
              <AdminCardContent className="p-0 flex flex-col h-full">
                {/* Image Placeholder */}
                <div className="w-full aspect-[4/3] bg-[var(--bg-primary)] relative border-b border-[var(--border-light)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--border)] to-[var(--bg-primary)] opacity-50" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-md border border-[var(--border)] shadow-sm hover:bg-white text-[var(--text-muted)]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-[var(--text)] line-clamp-1">Radiance Botanical Serum</h3>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)] mt-0.5">Skincare</p>
                    </div>
                    <span className="font-medium text-[var(--text)]">$120</span>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border-light)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-[var(--text-muted)]">42 in stock</span>
                    </div>
                    <AdminBadge variant="default">Active</AdminBadge>
                  </div>
                </div>
              </AdminCardContent>
            </AdminCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
