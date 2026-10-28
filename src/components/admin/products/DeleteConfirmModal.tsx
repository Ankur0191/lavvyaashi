"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { AdminButton } from "@/components/admin/ui/AdminButton";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  productName: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={!isDeleting ? onClose : undefined}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-[210] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[var(--bg-card)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-red-400 to-red-600" />

            <div className="p-6">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>

              <h3 className="text-base font-semibold text-[var(--text)] mb-1">
                Delete Product
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-medium text-[var(--text)]">{productName}</span>?
                This action cannot be undone.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <AdminButton
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isDeleting}
                >
                  Cancel
                </AdminButton>
                <AdminButton
                  variant="danger"
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 border-red-600"
                  onClick={handleConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    "Delete"
                  )}
                </AdminButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
