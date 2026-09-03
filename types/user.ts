export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  vaultBalanceRs: number; // "Valore Vault" — never call this "coupons" in UI
}
