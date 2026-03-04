"use client";

import type { TrendSignal } from "@/lib/types";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrendingSignals({ signals }: { signals: TrendSignal[] }) {
  if (!signals || signals.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <Activity className="h-6 w-6 text-white/10 mx-auto mb-3" />
        <p className="text-xs text-white/30">No trending signals</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden h-[400px] flex flex-col">
      <div className="p-4 border-b border-white/[0.04] bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Live Signal Feed
          </h3>
        </div>
        <span className="text-[9px] text-white/20 font-mono">{signals.length} active</span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col animate-ticker space-y-3 p-3">
          {[...signals, ...signals].map((signal, idx) => (
            <div
              key={`${signal.cluster_id}-${idx}`}
              className="glass p-3 rounded-xl hover:bg-white/[0.05] transition-all cursor-default"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono text-white/20">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold",
                  signal.trend_7d > 0 ? "text-emerald-400" : "text-rose-400"
                )}>
                  {signal.trend_7d > 0 ? (
                    <TrendingUp className="h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5" />
                  )}
                  {signal.trend_7d > 0 ? "+" : ""}{signal.trend_7d}%
                </div>
              </div>
              <p className="text-xs font-medium text-white/80 line-clamp-1">
                {signal.cluster_name}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      signal.trend_7d > 0 ? "bg-indigo-500/40" : "bg-rose-500/30"
                    )}
                    style={{ width: `${Math.min(100, Math.abs(signal.trend_7d) * 5 + 20)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#060A16] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#060A16] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
