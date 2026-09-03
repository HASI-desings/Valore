"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";

// Critically-damped spring for the drawer slide (default UI motion, per
// design.md), momentum spring for each item "driving in."
export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalRs());
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-valore-void/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="glass-surface fixed right-0 top-0 bottom-0 w-full max-w-md z-50 p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 1.0, stiffness: 220 }} // default critically-damped spring
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.4 }} // rubber-band, never hard-stop
            onDragEnd={(_, info) => {
              if (info.offset.x > 120) closeDrawer();
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-lg text-valore-bone">Your Bag</h2>
              <button onClick={closeDrawer} className="text-valore-fog hover:text-valore-bone">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-valore-fog font-body text-sm">Your bag is empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", damping: 0.85, stiffness: 240, delay: i * 0.04 }}
                    className="flex gap-4 border-b border-valore-surfaceHigh pb-4"
                  >
                    <div className="w-16 h-20 bg-valore-surface rounded-md shrink-0" />
                    <div className="flex-1">
                      <p className="text-valore-bone text-sm font-body">{item.name}</p>
                      <p className="text-valore-fog text-xs">
                        {item.color} · {item.size}
                      </p>
                      {item.outOfStock && (
                        <p className="text-accent-amber text-xs mt-1">Out of stock — remove or change size</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="text-valore-fog px-2 border border-valore-surfaceHigh rounded"
                        >
                          −
                        </button>
                        <span className="text-valore-bone text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="text-valore-fog px-2 border border-valore-surfaceHigh rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-valore-fog text-xs ml-auto hover:text-accent-amber"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-valore-bone text-sm">Rs. {(item.priceRs * item.quantity).toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="pt-4 border-t border-valore-surfaceHigh mt-4">
                <div className="flex justify-between text-valore-bone mb-4">
                  <span className="font-body text-sm">Subtotal</span>
                  <span className="font-display">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={closeDrawer}>
                  <Button className="w-full">Checkout</Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
