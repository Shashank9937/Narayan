"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { getIdeaById } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { Idea } from "@/lib/types";
import {
  ArrowLeft,
  Target,
  Rocket,
  Zap,
  CheckCircle2,
  Timer,
  TrendingUp,
  ShieldCheck,
  Package,
  Cpu,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IdeaDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      try {
        const item = await getIdeaById(params.id, session.access_token);
        setIdea(item);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load idea");
      }
    };

    if (params.id) {
      load();
    }
  }, [params.id, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="glass p-12 rounded-3xl max-w-md">
          <Zap className="h-8 w-8 text-rose-400/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Load Error</h2>
          <p className="text-sm text-white/40 mb-6">{error}</p>
          <Link href="/dashboard" className="px-6 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm font-semibold hover:bg-indigo-500/30 transition-all">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="space-y-8 pb-12">
        <div className="skeleton h-6 w-36 rounded" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="skeleton h-6 w-32 rounded-full" />
            <div className="skeleton h-12 w-3/4 rounded-lg" />
            <div className="skeleton h-5 w-full rounded" />
            <div className="skeleton h-5 w-2/3 rounded" />
          </div>
          <div className="skeleton h-48 w-48 rounded-full shrink-0" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
            </div>
            <div className="skeleton h-64 rounded-3xl" />
          </div>
          <div className="space-y-4">
            <div className="skeleton h-48 rounded-3xl" />
            <div className="skeleton h-48 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    { label: "Pain Intensity", value: idea.pain_intensity, icon: <Zap className="h-3.5 w-3.5" />, color: "text-rose-400" },
    { label: "Market Frequency", value: idea.frequency, icon: <Timer className="h-3.5 w-3.5" />, color: "text-amber-400" },
    { label: "Budget Size", value: idea.budget_size, icon: <TrendingUp className="h-3.5 w-3.5" />, color: "text-emerald-400" },
    { label: "Execution Speed", value: idea.speed_to_mvp, icon: <Rocket className="h-3.5 w-3.5" />, color: "text-sky-400" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href={`/clusters/${idea.cluster_id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cluster
        </Link>
      </motion.div>

      {/* Header & Score */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
      >
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase tracking-[0.2em] font-bold text-[10px]">
            Execution Blueprint
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {idea.idea_name}
          </h1>
          <p className="text-sm text-white/35 leading-relaxed">
            {idea.description}
          </p>
        </div>

        {/* Score ring */}
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0 glass rounded-full" style={{ boxShadow: '0 0 40px rgba(99,102,241,0.1)' }}>
          <svg className="w-32 h-32 -rotate-90">
            <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.04]" />
            <circle
              cx="64" cy="64" r="58"
              fill="none" stroke="url(#idGrad)" strokeWidth="7"
              strokeDasharray={365}
              strokeDashoffset={365 - (365 * idea.final_score) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="idGrad" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white tracking-tighter">
              {idea.final_score.toFixed(0)}
            </span>
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Score</span>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Validation Breakdown */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Validation Intelligence</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass p-5 rounded-2xl flex items-center justify-between group"
              >
                <div className="space-y-1.5">
                  <div className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30", metric.color)}>
                    {metric.icon}
                    <span className="text-white/30">{metric.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tighter">{metric.value}/10</div>
                </div>
                <div className="h-12 w-1.5 flex flex-col-reverse bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={cn("w-full rounded-full transition-all duration-700",
                      metric.value >= 8 ? "bg-emerald-500" : metric.value >= 5 ? "bg-indigo-500" : "bg-amber-500"
                    )}
                    style={{ height: `${metric.value * 10}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* MVP Features */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-2xl space-y-4"
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Core MVP Feature Set</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {idea.mvp_features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.04] hover:border-indigo-500/20 transition-all group">
                  <div className="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-2.5 w-2.5 text-indigo-400" />
                  </div>
                  <span className="text-xs font-medium text-white/60 group-hover:text-white/80 transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Execution Meta */}
        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-5 rounded-2xl space-y-5"
          >
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Technical Arc</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest mb-1.5">Primary Stack</p>
                <p className="text-xs text-white/70 leading-relaxed font-medium">{idea.tech_stack}</p>
              </div>
              <div className="h-px bg-white/[0.04] w-full" />
              <div>
                <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest mb-1.5">Revenue Model</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 font-medium">{idea.revenue_model}</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">{idea.pricing_estimate}</Badge>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-5 rounded-2xl space-y-4"
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Market Entry</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-medium italic">
              &ldquo;{idea.icp}&rdquo;
            </p>
            <div className="h-px bg-white/[0.04] w-full" />
            <p className="text-xs text-white/40 leading-relaxed">
              {idea.gtm_strategy}
            </p>
          </motion.div>
        </aside>
      </div>

      {/* 30-Day Launch Plan */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-5"
      >
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-orange-400" />
          <h2 className="text-lg font-bold text-white">30-Day Launch Sequence</h2>
        </div>
        <div className="glass p-6 md:p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.03] blur-[80px]" />
          <div className="relative space-y-10">
            {idea.launch_plan_30d.split('\n\n').map((phase, idx) => {
              const [title, ...bullets] = phase.split('\n');
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-glow">
                      {idx + 1}
                    </div>
                    <div className="w-[2px] flex-1 bg-white/[0.04] mt-3 group-last:hidden" />
                  </div>
                  <div className="space-y-3 pb-2">
                    <h3 className="text-base md:text-lg font-bold text-white">{title.replace(/^\d+[:.]\s*/, '')}</h3>
                    <div className="grid gap-1.5">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-white/35 font-medium">
                          <div className="h-1 w-1 rounded-full bg-indigo-500/50 shrink-0" />
                          {bullet.replace(/^[-*•]\s*/, '')}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
