import type { OrderStatus } from "@/lib/order-tracking";
import type { PaymentProvider } from "@/lib/payments/provider";

export interface OrderLineItem {
  productId: string;
  slug: string;
  name: string;
  size: string;
  color: string;
  priceRs: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null; // null for guest checkout
  items: OrderLineItem[];
  subtotalRs: number;
  discountRs: number;
  totalRs: number;
  paymentMethod: PaymentProvider["id"];
  paymentReference?: string;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode?: string;
}
