/**
 * Payment Adapter Interface
 *
 * Pluggable payment layer. Razorpay and Stripe both implement this interface.
 * Swap providers by changing the active adapter in lib/payments/index.ts.
 */

export interface PaymentOrderOptions {
  amount: number; // in smallest currency unit (paise for INR, cents for USD)
  currency: string;
  orderId: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
  provider: "razorpay" | "stripe";
  clientSecret?: string; // Stripe
  key?: string; // Razorpay publishable key
}

export interface PaymentVerificationData {
  orderId: string;
  paymentId: string;
  signature?: string; // Razorpay signature
}

export interface PaymentVerificationResult {
  success: boolean;
  paymentId: string;
  message: string;
}

export interface RefundOptions {
  paymentId: string;
  amount?: number; // partial refund amount
  reason?: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
  message: string;
}

/**
 * PaymentAdapter — contract that all payment providers must implement
 */
export interface PaymentAdapter {
  readonly name: "razorpay" | "stripe";
  createOrder(options: PaymentOrderOptions): Promise<PaymentOrder>;
  verifyPayment(data: PaymentVerificationData): Promise<PaymentVerificationResult>;
  refund(options: RefundOptions): Promise<RefundResult>;
}
