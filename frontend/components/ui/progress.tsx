import { cn } from "@/lib/utils";

function Progress({ value, className }: { value: number; className?: string }) {
  const bounded = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out"
        style={{ width: `${bounded}%` }}
      />
    </div>
  );
}

export { Progress };
