import type { PaymentProvider, PaymentInitResult, PaymentConfirmResult } from "./provider";

// No gateway (Stripe/PayFast/local processor) API keys provided yet — stubbed
// per requirements.md. Do not treat this as a working integration in the UI.
export const cardProvider: PaymentProvider = {
  id: "card",
  isLive: false,

  async initiatePayment(): Promise<PaymentInitResult> {
    return {
      success: false,
      error: "Card payments aren't set up yet. Please choose EasyPaisa, Bank Transfer, or Cash on Delivery.",
    };
  },

  async confirmPayment(reference): Promise<PaymentConfirmResult> {
    return { confirmed: false, orderId: reference };
  },

  async failPayment() {
    return;
  },
};
