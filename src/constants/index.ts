export const APP_NAME = "Lavvyaashi";
export const APP_TAGLINE = "Luxury Skincare, Naturally Elevated";
export const APP_DESCRIPTION =
  "Discover premium, natural skincare crafted for those who demand the finest. Lavvyaashi brings luxury to your ritual.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://lavvyaashi.com";
export const APP_EMAIL = "hello@lavvyaashi.com";
export const APP_PHONE = "+91 98765 43210";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORIES: "/categories",
  CATEGORY: (slug: string) => `/categories/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_SUCCESS: (id: string) => `/checkout/success/${id}`,
  WISHLIST: "/wishlist",
  SEARCH: "/search",
  BLOGS: "/blogs",
  BLOG: (slug: string) => `/blogs/${slug}`,
  ABOUT: "/about",
  CONTACT: "/contact",
  SHIPPING: "/policies/shipping",
  REFUND: "/policies/refund",
  PRIVACY: "/policies/privacy",
  TERMS: "/policies/terms",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  ACCOUNT: "/account",
  ACCOUNT_ORDERS: "/account/orders",
  ACCOUNT_WISHLIST: "/account/wishlist",
  ACCOUNT_ADDRESSES: "/account/addresses",
  ACCOUNT_SETTINGS: "/account/settings",
  ACCOUNT_NOTIFICATIONS: "/account/notifications",
  ADMIN: "/admin",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_COUPONS: "/admin/coupons",
  ADMIN_BLOGS: "/admin/blogs",
  ADMIN_MEDIA: "/admin/media",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

export const NAV_ITEMS = [
  { label: "Collections", href: ROUTES.PRODUCTS },
  { label: "Skincare", href: `${ROUTES.PRODUCTS}?category=skincare` },
  { label: "Face", href: `${ROUTES.PRODUCTS}?category=face` },
  { label: "Body", href: `${ROUTES.PRODUCTS}?category=body` },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Journal", href: ROUTES.BLOGS },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: ROUTES.PRODUCTS },
    { label: "New Arrivals", href: `${ROUTES.PRODUCTS}?badge=new_arrival` },
    { label: "Best Sellers", href: `${ROUTES.PRODUCTS}?badge=best_seller` },
    { label: "Collections", href: ROUTES.CATEGORIES },
  ],
  company: [
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Journal", href: ROUTES.BLOGS },
    { label: "Contact", href: ROUTES.CONTACT },
  ],
  policies: [
    { label: "Shipping Policy", href: ROUTES.SHIPPING },
    { label: "Refund Policy", href: ROUTES.REFUND },
    { label: "Privacy Policy", href: ROUTES.PRIVACY },
    { label: "Terms of Service", href: ROUTES.TERMS },
  ],
} as const;

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating_desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Sellers", value: "best_seller" },
] as const;

export const PAGINATION_LIMIT = 12;
export const SEARCH_DEBOUNCE_MS = 350;
export const TOAST_DURATION = 4000;
export const MAX_CART_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_CHARGE = 99;
export const TAX_RATE = 0.18; // 18% GST
