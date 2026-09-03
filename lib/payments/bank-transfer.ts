import type { PaymentProvider, PaymentInitResult, PaymentConfirmResult } from "./provider";

// Bank Transfer & EasyPaisa (manual): per requirements.md, bank transfer is
// "usually just displayed to the user, not an API integration." Until a real
// merchant API is wired up, EasyPaisa is handled the same way — display the
// number, let the user pay manually, and mark the order pending-verification.
// isLive stays false so checkout UI can show "manual verification" honestly
// instead of pretending this is an automated integration (rules.md).

function readEnv(key: string, fallback: string) {
  return process.env[key] || fallback;
}

export const bankTransferProvider: PaymentProvider = {
  id: "bank_transfer",
  isLive: false,

  async initiatePayment(orderId, amountPKR): Promise<PaymentInitResult> {
    const title = readEnv("BANK_ACCOUNT_TITLE", "Muhammad Hamid");
    const number = readEnv("BANK_ACCOUNT_NUMBER", "");
    const bank = readEnv("BANK_NAME", "");
    return {
      success: true,
      reference: `BANKTF-${orderId}`,
      displayInstructions: bank
        ? `Transfer Rs. ${amountPKR.toLocaleString()} to ${title} — ${bank}, A/C ${number}. Your order will be confirmed once payment is verified.`
        : `Bank transfer details not yet configured. Contact support to complete this order.`,
    };
  },

  async confirmPayment(reference): Promise<PaymentConfirmResult> {
    // Manual verification only — must be flipped by an admin/ops action, never
    // auto-confirmed, since there's no API confirming receipt (security.md:
    // "never mark an order confirmed unless the server has actually confirmed it").
    const orderId = reference.replace("BANKTF-", "");
    return { confirmed: false, orderId };
  },

  async failPayment() {
    return;
  },
};

export const easypaisaProvider: PaymentProvider = {
  id: "easypaisa",
  isLive: false,

  async initiatePayment(orderId, amountPKR): Promise<PaymentInitResult> {
    const name = readEnv("EASYPAISA_ACCOUNT_NAME", "Muhammad Hamid");
    const number = readEnv("EASYPAISA_NUMBER", "0312-7563557");
    return {
      success: true,
      reference: `EP-${orderId}`,
      displayInstructions: `Send Rs. ${amountPKR.toLocaleString()} via EasyPaisa to ${number} (${name}). Your order will be confirmed once payment is verified.`,
    };
  },

  async confirmPayment(reference): Promise<PaymentConfirmResult> {
    const orderId = reference.replace("EP-", "");
    return { confirmed: false, orderId };
  },

  async failPayment() {
    return;
  },
};
