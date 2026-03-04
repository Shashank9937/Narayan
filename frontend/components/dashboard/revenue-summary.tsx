"use client";

import type { RevenueSummary } from "@/lib/types";
import { PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  "from-indigo-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-500",
];

export function RevenueSummaryCard({ items }: { items: RevenueSummary[] }) {
  const total = items.reduce((acc, item) => acc + item.idea_count, 0) || 1;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/[0.04] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <PieChart className="h-3.5 w-3.5 text-indigo-400" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Revenue Model Split
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {items.length === 0 && (
          <p className="text-xs text-white/20 text-center py-4">No revenue data</p>
        )}

        {items.map((item, idx) => {
          const pct = Math.round((item.idea_count / total) * 100);
          return (
            <div key={item.revenue_model} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-medium line-clamp-1 pr-2">
                  {item.revenue_model}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-white/30">{pct}%</span>
                  <span className="text-white font-semibold">{item.idea_count}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", COLORS[idx % COLORS.length])}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
