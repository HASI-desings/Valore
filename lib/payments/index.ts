import { codProvider } from "./cod";
import { bankTransferProvider, easypaisaProvider } from "./bank-transfer";
import { jazzcashProvider } from "./jazzcash";
import { cardProvider } from "./card";
import type { PaymentProvider } from "./provider";

export const paymentProviders: Record<PaymentProvider["id"], PaymentProvider> = {
  cod: codProvider,
  bank_transfer: bankTransferProvider,
  easypaisa: easypaisaProvider,
  jazzcash: jazzcashProvider,
  card: cardProvider,
};

export type { PaymentProvider } from "./provider";
