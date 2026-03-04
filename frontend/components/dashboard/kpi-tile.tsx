"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function KpiTile({
  label,
  value,
  delta,
  index = 0,
}: {
  label: string;
  value: string;
  delta: string;
  index?: number;
}) {
  const isPositive = delta.includes("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="glass glass-hover p-6 rounded-2xl relative overflow-hidden group cursor-default"
    >
      {/* Ambient glow */}
      <div
        className={cn(
          "absolute -right-6 -top-6 w-28 h-28 blur-3xl rounded-full transition-all duration-500",
          isPositive ? "bg-emerald-500/5 group-hover:bg-emerald-500/10" : "bg-rose-500/5 group-hover:bg-rose-500/10"
        )}
      />

      <div className="relative space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
          {label}
        </p>
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {value}
          </h2>
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {delta}
          </div>
        </div>

        {/* Sparkline bar */}
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              isPositive ? "bg-emerald-500/40" : "bg-rose-500/40"
            )}
            style={{ width: `${Math.min(100, Math.abs(parseFloat(delta)) * 10 + 40)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Loading skeleton
export function KpiTileSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="flex items-baseline justify-between">
        <div className="skeleton h-8 w-16 rounded" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
      <div className="skeleton h-1 w-full rounded-full" />
    </div>
  );
}
