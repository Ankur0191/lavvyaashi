"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ShippingLabelPDF } from "./ShippingLabelPDF";
import { Download, Loader2 } from "lucide-react";

export function DownloadLabelButton({ order }: { order: any }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button disabled className="bg-bg-secondary text-text px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 opacity-50 cursor-not-allowed">
        <Loader2 className="w-4 h-4 animate-spin" />
        Preparing PDF...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ShippingLabelPDF order={order} />}
      fileName={`Shipping_Label_${order.id.slice(0, 8).toUpperCase()}.pdf`}
      className="bg-bg-secondary hover:bg-border text-text px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors border border-border"
    >
      {/* @ts-ignore */}
      {({ blob, url, loading, error }) =>
        loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download Label
          </>
        )
      }
    </PDFDownloadLink>
  );
}
