export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1626402755720281";

// Trigger a PageView event
export const pageview = (): void => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

// Trigger standard Meta Pixel events (e.g., ViewContent, AddToCart, Purchase)
export const event = (name: string, options: Record<string, any> = {}): void => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};

// Trigger custom events
export const customEvent = (name: string, options: Record<string, any> = {}): void => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", name, options);
  }
};
