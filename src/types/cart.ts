import { Product } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery?: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  shipping: number;
  tax: number;
  total: number;
}
