import { createBrowserClient } from "@supabase/ssr";

// Uses the public anon key only — safe for client-side (requirements.md).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
