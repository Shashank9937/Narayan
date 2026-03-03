import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types";
import { ArrowRight, Zap } from "lucide-react";

export function IdeaTable({ ideas }: { ideas: Idea[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ideas.map((idea, index) => (
        <div
          key={idea.id}
          className="animate-fade-up glass glass-hover p-6 rounded-2xl border-l-4 border-l-indigo-500 flex flex-col justify-between group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                {idea.revenue_model}
              </Badge>
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-white/5"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={113}
                    strokeDashoffset={113 - (113 * idea.final_score) / 10}
                    className="text-indigo-500 transition-all duration-1000"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-white">{idea.final_score.toFixed(0)}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {idea.idea_name}
            </h3>
            <p className="text-sm text-white/40 line-clamp-2 mb-4">
              {idea.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <Zap className="h-3 w-3" />
              High Potential
            </div>
            <Link
              href={`/ideas/${idea.id}`}
              className="flex items-center gap-2 text-xs font-bold text-white/60 group-hover:text-white transition-colors"
            >
              View Details
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
