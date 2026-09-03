"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Signature moment per design.md: warm light shift + typographic reveal.
// Not a generic form-success toast.
export function WelcomeAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-valore-void"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ background: "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)" }}
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
            "radial-gradient(circle at 50% 50%, rgba(201,150,44,0.35) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="relative z-10 text-center space-y-6">
        <motion.h1
          className="font-display text-hero text-valore-bone"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", damping: 1.0, stiffness: 180 }}
        >
          Welcome to<br />the Family
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Link href="/catalog">
            <Button>Start Browsing</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
