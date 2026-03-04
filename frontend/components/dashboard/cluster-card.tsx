"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProblemCluster } from "@/lib/types";
import { MoveRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ClusterCard({ cluster, index = 0 }: { cluster: ProblemCluster; index?: number }) {
  const urgencyLevel =
    cluster.avg_urgency > 7 ? "high" :
      cluster.avg_urgency > 4 ? "medium" : "low";

  const urgencyConfig = {
    high: {
      dot: "bg-rose-400",
      text: "text-rose-400",
      bg: "bg-rose-400/10",
      border: "border-rose-400/20",
      glow: "shadow-[0_0_12px_rgba(251,113,133,0.2)]",
    },
    medium: {
      dot: "bg-amber-400",
      text: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      glow: "",
    },
    low: {
      dot: "bg-emerald-400",
      text: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      glow: "",
    },
  }[urgencyLevel];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link href={`/clusters/${cluster.id}`}>
        <div className={cn(
          "glass glass-hover py-4 px-5 rounded-2xl flex items-center gap-4 min-w-[300px] group",
          urgencyLevel === "high" && "border-rose-500/10"
        )}>
          <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse-dot shrink-0", urgencyConfig.dot, urgencyConfig.glow)} />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
              {cluster.name}
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
              {cluster.post_count} signals · {cluster.trend_7d > 0 ? '+' : ''}{cluster.trend_7d}% trend
            </p>
          </div>
          <div className={cn(
            "px-2.5 py-1 rounded-lg text-[10px] font-bold border",
            urgencyConfig.text, urgencyConfig.bg, urgencyConfig.border
          )}>
            {cluster.avg_urgency.toFixed(1)}
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
            <MoveRight className="h-3.5 w-3.5 text-white/30 group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
