"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { getClusterById } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { ClusterDetail } from "@/lib/types";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Zap,
  Twitter,
  ExternalLink,
  Flame,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClusterDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<ClusterDetail | null>(null);
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
        const detail = await getClusterById(params.id, session.access_token);
        setData(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cluster");
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

  if (!data) {
    return (
      <div className="space-y-8 pb-12">
        {/* Skeleton */}
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-72 rounded-3xl" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {[0, 1, 2].map((i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
          </div>
          <div className="space-y-4">
            <div className="skeleton h-48 rounded-3xl" />
            <div className="skeleton h-60 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const sparkData = [
    { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 },
    { value: 70 }, { value: 65 }, { value: 90 }, { value: 85 },
  ];

  const heatData = [
    { name: "Heat", value: data.cluster.avg_urgency * 10, fill: "#6366F1" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </motion.div>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(99,102,241,0.05) 100%)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        {/* Background chart */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 mask-fade-left">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="relative z-10 max-w-2xl space-y-5">
          <Badge className="bg-white/10 text-white/80 border-white/15 uppercase tracking-[0.2em] font-bold text-[10px]">
            Problem Cluster
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {data.cluster.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
              <MessageSquare className="h-3.5 w-3.5 text-white/50" />
              <span className="text-xs font-semibold text-white">{data.cluster.post_count} Signals</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 rounded-xl border border-emerald-500/25 backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+{data.cluster.trend_7d}% Growth</span>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xl">
            {data.cluster.summary}
          </p>
        </div>
      </motion.section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pain Points Timeline */}
        <section className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Pain Point Evolution</h2>
          </div>
          <div className="relative pl-8 space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500/60 before:via-violet-500/30 before:to-transparent">
            {data.pains.map((pain, idx) => (
              <motion.div
                key={pain.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative group"
              >
                <div className="absolute -left-[23px] top-2 w-3.5 h-3.5 rounded-full bg-[#060A16] border-2 border-indigo-500 group-hover:scale-125 transition-transform z-10" />
                <div className="glass p-5 rounded-2xl group-hover:bg-white/[0.04] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1 leading-snug">{pain.pain_point}</h3>
                      <p className="text-[11px] text-white/30 font-medium">Target: {pain.target_user}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest mb-0.5">Intensity</p>
                      <span className="text-xl font-bold text-white">{pain.urgency_score}/10</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                      style={{ width: `${pain.urgency_score * 10}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Heat Gauge */}
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Market Heat Index</h3>
            <div className="relative w-44 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  data={heatData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-2xl font-bold text-white">
                {Math.round(data.cluster.avg_urgency * 10)}%
              </div>
            </div>
            <p className={cn(
              "mt-3 text-[11px] font-semibold",
              data.cluster.avg_urgency > 7 ? "text-rose-400" : data.cluster.avg_urgency > 4 ? "text-amber-400" : "text-emerald-400"
            )}>
              {data.cluster.avg_urgency > 7 ? "🔥 Extreme Demand Signal" : data.cluster.avg_urgency > 4 ? "⚡ Strong Signal" : "📊 Moderate Signal"}
            </p>
          </div>

          {/* Source Posts */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Raw Signal Intelligence</h3>
            <div className="space-y-2">
              {data.posts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-3.5 rounded-xl flex items-start gap-3 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                    {post.platform.toLowerCase().includes("reddit") ? (
                      <MessageSquare className="h-3.5 w-3.5 text-orange-500" />
                    ) : (
                      <Twitter className="h-3.5 w-3.5 text-sky-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[10px] text-white/25 font-medium mt-0.5">
                      {post.upvotes} pts · {post.platform}
                    </p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-white/10 group-hover:text-white/40 transition-colors shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Ideas Section */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-violet-400" />
          <h2 className="text-lg font-bold text-white">Synthesized Opportunities</h2>
          <span className="text-[10px] text-white/20 font-bold ml-2">{data.ideas.length} ideas</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.ideas.map((idea, idx) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="glass glass-hover p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{
                  background: `linear-gradient(180deg, ${idea.final_score > 7 ? '#6366F1' : idea.final_score > 4 ? '#F59E0B' : '#64748B'}, transparent)`,
                }}
              />
              <div className="pl-2">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
                    {idea.idea_type}
                  </Badge>
                  <span className="text-lg font-black text-white/15 group-hover:text-indigo-400/30 transition-colors tracking-tighter">
                    {idea.final_score.toFixed(0)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug group-hover:text-indigo-400 transition-colors">{idea.idea_name}</h3>
                <p className="text-xs text-white/30 line-clamp-2 leading-relaxed mb-5">
                  {idea.description}
                </p>
              </div>
              <Link
                href={`/ideas/${idea.id}`}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] text-center text-xs font-semibold text-white/60 hover:bg-indigo-500 hover:text-white transition-all"
              >
                Access Execution Plan
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
