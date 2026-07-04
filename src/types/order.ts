import { Address } from "./user";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refund_requested"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "razorpay" | "stripe" | "cod";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productThumbnail: string;
  productSlug: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  address: Address;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number;
  maxDiscount?: number;
  uses: number;
  maxUses?: number;
  expiresAt?: string;
  isActive: boolean;
}
