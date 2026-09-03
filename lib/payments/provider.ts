// Shared interface every payment provider implements, so checkout logic
// never branches per-provider (structure.md note).
export interface PaymentProvider {
  id: "cod" | "bank_transfer" | "easypaisa" | "jazzcash" | "card";
  isLive: boolean; // false = stubbed, per rules.md "state clearly, never pretend"
  initiatePayment(orderId: string, amountPKR: number): Promise<PaymentInitResult>;
  confirmPayment(reference: string): Promise<PaymentConfirmResult>;
  failPayment(reference: string, reason: string): Promise<void>;
}

export interface PaymentInitResult {
  success: boolean;
  reference?: string;
  displayInstructions?: string; // shown to user (e.g. bank details, EasyPaisa number)
  error?: string;
}

export interface PaymentConfirmResult {
  confirmed: boolean;
  orderId: string;
}
