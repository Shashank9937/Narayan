"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getIdeaById } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { Idea } from "@/lib/types";
import {
  ArrowLeft,
  Target,
  Rocket,
  Code2,
  Zap,
  CheckCircle2,
  Timer,
  TrendingUp,
  ShieldCheck,
  Package,
  Cpu
} from "lucide-react";

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

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
    return <p className="text-sm text-rose-300">{error}</p>;
  }

  if (!idea) {
    return <p className="text-muted-foreground">Loading idea execution roadmap...</p>;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Link
        href={`/clusters/${idea.cluster_id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cluster
      </Link>

      {/* Header & Score Ring */}
      <section className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase tracking-[0.2em] font-bold">
            Execution Blueprint
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {idea.idea_name}
          </h1>
          <p className="text-lg text-white/40 leading-relaxed">
            {idea.description}
          </p>
        </div>

        <div className="relative w-48 h-48 flex items-center justify-center shrink-0 glass rounded-full shadow-glow">
          <svg className="w-40 h-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-white/5"
            />
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="url(#indigoGradient)"
              strokeWidth="10"
              strokeDasharray={465}
              strokeDashoffset={465 - (465 * idea.final_score) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white tracking-tighter">
              {idea.final_score.toFixed(0)}
            </span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Score</span>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Validation Breakdown */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Validation Intelligence</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Pain Intensity", value: idea.pain_intensity, icon: <Zap className="h-4 w-4" /> },
              { label: "Market Frequency", value: idea.frequency, icon: <Timer className="h-4 w-4" /> },
              { label: "Budget Size", value: idea.budget_size, icon: <TrendingUp className="h-4 w-4" /> },
              { label: "Execution Speed", value: idea.speed_to_mvp, icon: <Rocket className="h-4 w-4" /> },
            ].map((metric) => (
              <div key={metric.label} className="glass p-5 rounded-2xl flex items-center justify-between group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {metric.icon}
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tighter">{metric.value}/10</div>
                </div>
                <div className="h-10 w-1 flex bg-white/5 rounded-full overflow-hidden">
                  <div className="w-full bg-indigo-500 transition-all duration-1000" style={{ height: `${metric.value * 10}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Core MVP Feature Set</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {idea.mvp_features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Execution Meta */}
        <aside className="space-y-8">
          <div className="glass p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Technical Arc</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Primary Stack</p>
                <p className="text-sm text-white leading-relaxed font-medium">{idea.tech_stack}</p>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Revenue Model</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium">{idea.revenue_model}</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">{idea.pricing_estimate}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Market Entry</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed font-medium italic">
              "{idea.icp}"
            </p>
            <div className="h-px bg-white/5 w-full" />
            <p className="text-xs text-white leading-relaxed">
              {idea.gtm_strategy}
            </p>
          </div>
        </aside>
      </div>

      {/* 30-Day Launch Plan Stepper */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Rocket className="h-5 w-5 text-orange-400" />
          <h2 className="text-xl font-bold text-white">30-Day Launch Sequence</h2>
        </div>
        <div className="glass p-8 md:p-12 rounded-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px]" />
          <div className="relative space-y-12">
            {idea.launch_plan_30d.split('\n\n').map((phase, idx) => {
              const [title, ...bullets] = phase.split('\n');
              return (
                <div key={idx} className="flex gap-8 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-glow">
                      {idx + 1}
                    </div>
                    <div className="w-[2px] flex-1 bg-white/5 mt-4 group-last:hidden" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{title.replace(/^\d+[:.]\s*/, '')}</h3>
                    <div className="grid gap-2">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-3 text-sm text-white/40 font-medium">
                          <div className="h-1 w-1 rounded-full bg-indigo-500" />
                          {bullet.replace(/^[-*•]\s*/, '')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
