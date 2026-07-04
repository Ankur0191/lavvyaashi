export type NotificationType =
  | "order_confirmed"
  | "order_shipped"
  | "order_delivered"
  | "refund_approved"
  | "password_changed"
  | "offer_alert"
  | "wishlist_discount"
  | "back_in_stock"
  | "new_order"
  | "failed_payment"
  | "refund_requested"
  | "low_inventory"
  | "new_user"
  | "new_review"
  | "coupon_used";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string;
  authorId: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
