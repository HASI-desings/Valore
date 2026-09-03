"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { WelcomeAnimation } from "./WelcomeAnimation";

export function AuthModal() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) {
          // Already-registered email → tell them, offer login (security.md).
          if (err.message.toLowerCase().includes("already")) {
            setError("An account with this email already exists — try logging in instead.");
            setMode("login");
          } else {
            setError(err.message);
          }
          return;
        }
        setShowWelcome(true);
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
          // Don't confirm/deny whether the email exists (security.md).
          setError("Invalid email or password.");
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (showWelcome) return <WelcomeAnimation />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 1.0, stiffness: 200 }}
      className="glass-surface max-w-sm mx-auto mt-32 p-8 rounded-xl space-y-4"
    >
      <h2 className="font-display text-2xl text-valore-bone">
        {mode === "signup" ? "Join the Family" : "Welcome Back"}
      </h2>
      {error && <p className="text-accent-amber text-xs">{error}</p>}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-valore-surface border border-valore-surfaceHigh rounded-md px-4 py-3 text-sm text-valore-bone outline-none focus:border-accent-amber"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-valore-surface border border-valore-surfaceHigh rounded-md px-4 py-3 text-sm text-valore-bone outline-none focus:border-accent-amber"
      />
      <Button className="w-full" onClick={submit} disabled={loading}>
        {loading ? "..." : mode === "signup" ? "Create Account" : "Log In"}
      </Button>
      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className="text-valore-fog text-xs underline w-full text-center"
      >
        {mode === "signup" ? "Already have an account? Log in" : "New here? Join the Family"}
      </button>
    </motion.div>
  );
}
