"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function IdeaTable({ ideas }: { ideas: Idea[] }) {
  if (!ideas || ideas.length === 0) {
    return (
      <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center text-center">
        <Sparkles className="h-8 w-8 text-white/10 mb-4" />
        <p className="text-sm text-white/30 font-medium">No ideas synthesized yet.</p>
        <p className="text-xs text-white/20 mt-1">Run the scraping pipeline to generate opportunities.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ideas.map((idea, index) => (
        <motion.div
          key={idea.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          className="glass glass-hover p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Score accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{
              background: `linear-gradient(180deg, ${idea.final_score > 7 ? '#6366F1' : idea.final_score > 4 ? '#F59E0B' : '#64748B'}, transparent)`,
            }}
          />

          <div className="pl-2">
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant="outline"
                className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider"
              >
                {idea.revenue_model}
              </Badge>

              {/* Score ring */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="20" cy="20" r="17"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="text-white/[0.04]"
                  />
                  <circle
                    cx="20" cy="20" r="17"
                    fill="none" stroke="url(#scoreGrad)" strokeWidth="2.5"
                    strokeDasharray={107}
                    strokeDashoffset={107 - (107 * idea.final_score) / 10}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-[10px] font-bold text-white/80">
                  {idea.final_score.toFixed(0)}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight">
              {idea.idea_name}
            </h3>
            <p className="text-[13px] text-white/35 line-clamp-2 mb-4 leading-relaxed">
              {idea.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] pl-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">
              <Zap className="h-3 w-3" />
              {idea.final_score >= 7 ? "High Potential" : idea.final_score >= 4 ? "Moderate" : "Exploring"}
            </div>
            <Link
              href={`/ideas/${idea.id}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-white/40 group-hover:text-indigo-400 transition-all"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Skeleton
export function IdeaTableSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="skeleton h-5 w-20 rounded-full" />
            <div className="skeleton h-10 w-10 rounded-full" />
          </div>
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="flex justify-between pt-3 border-t border-white/[0.04]">
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
