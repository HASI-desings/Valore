import type { PaymentProvider, PaymentInitResult, PaymentConfirmResult } from "./provider";

// COD needs no external API — built fully functional per requirements.md.
export const codProvider: PaymentProvider = {
  id: "cod",
  isLive: true,

  async initiatePayment(orderId, amountPKR): Promise<PaymentInitResult> {
    return {
      success: true,
      reference: `COD-${orderId}`,
      displayInstructions: `Pay Rs. ${amountPKR.toLocaleString()} in cash when your order arrives.`,
    };
  },

  async confirmPayment(reference): Promise<PaymentConfirmResult> {
    // COD orders are "confirmed" as placed immediately; actual payment
    // confirmation happens on delivery via the order-tracking flow, not here.
    const orderId = reference.replace("COD-", "");
    return { confirmed: true, orderId };
  },

  async failPayment() {
    // COD cannot fail at checkout time — no-op, kept for interface symmetry.
    return;
  },
};
