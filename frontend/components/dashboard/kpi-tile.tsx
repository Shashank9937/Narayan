import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiTile({ label, value, delta }: { label: string; value: string; delta: string }) {
  const isPositive = delta.includes("+");

  return (
    <div className="animate-fade-up glass glass-hover p-6 rounded-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />

      <div className="relative space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">{label}</p>
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
            isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta}
          </div>
        </div>
      </div>
    </div>
  );
}
