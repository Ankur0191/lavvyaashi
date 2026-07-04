/**
 * Mock Payment Adapter — used in development
 * Replace with RazorpayAdapter or StripeAdapter in production
 */
import {
  PaymentAdapter,
  PaymentOrder,
  PaymentOrderOptions,
  PaymentVerificationData,
  PaymentVerificationResult,
  RefundOptions,
  RefundResult,
} from "./adapter";

export class MockPaymentAdapter implements PaymentAdapter {
  readonly name = "razorpay" as const;

  async createOrder(options: PaymentOrderOptions): Promise<PaymentOrder> {
    return {
      id: `mock_order_${Date.now()}`,
      amount: options.amount,
      currency: options.currency,
      status: "created",
      provider: "razorpay",
      key: "rzp_test_mock_key",
    };
  }

  async verifyPayment(
    data: PaymentVerificationData
  ): Promise<PaymentVerificationResult> {
    return {
      success: true,
      paymentId: data.paymentId,
      message: "Payment verified successfully",
    };
  }

  async refund(options: RefundOptions): Promise<RefundResult> {
    return {
      success: true,
      refundId: `mock_refund_${Date.now()}`,
      amount: options.amount ?? 0,
      message: "Refund processed successfully",
    };
  }
}

/** Active payment adapter — swap this import to use Razorpay or Stripe */
export const paymentAdapter: PaymentAdapter = new MockPaymentAdapter();
