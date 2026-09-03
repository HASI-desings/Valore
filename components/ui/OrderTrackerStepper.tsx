import { ORDER_STEPS, stepIndex, type OrderStatus } from "@/lib/order-tracking";

export function OrderTrackerStepper({ status }: { status: OrderStatus }) {
  const current = stepIndex(status);

  return (
    <div className="flex items-center w-full">
      {ORDER_STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                i <= current ? "bg-accent-amber" : "bg-valore-surfaceHigh"
              }`}
            />
            <span
              className={`text-[10px] uppercase tracking-wider ${
                i <= current ? "text-valore-bone" : "text-valore-fog"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < ORDER_STEPS.length - 1 && (
            <div
              className={`h-px flex-1 mx-2 transition-colors duration-500 ${
                i < current ? "bg-accent-amber" : "bg-valore-surfaceHigh"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
