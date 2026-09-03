import type { PaymentProvider, PaymentInitResult, PaymentConfirmResult } from "./provider";

// No merchant account provided yet — stubbed per requirements.md.
// Do not treat this as a working integration in the UI (rules.md).
export const jazzcashProvider: PaymentProvider = {
  id: "jazzcash",
  isLive: false,

  async initiatePayment(): Promise<PaymentInitResult> {
    return {
      success: false,
      error: "JazzCash isn't set up yet. Please choose EasyPaisa, Bank Transfer, or Cash on Delivery.",
    };
  },

  async confirmPayment(reference): Promise<PaymentConfirmResult> {
    return { confirmed: false, orderId: reference };
  },

  async failPayment() {
    return;
  },
};
