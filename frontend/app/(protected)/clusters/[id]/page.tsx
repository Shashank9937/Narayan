"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getClusterById } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { ClusterDetail } from "@/lib/types";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Zap,
  Globe,
  Twitter,
  ExternalLink
} from "lucide-react";

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
    return <p className="text-sm text-rose-300">{error}</p>;
  }

  if (!data) {
    return <p className="text-muted-foreground">Loading cluster intelligence...</p>;
  }

  // Mock sparkline data
  const sparkData = [
    { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 },
    { value: 70 }, { value: 65 }, { value: 90 }, { value: 85 }
  ];

  const heatData = [
    { name: "Heat", value: data.cluster.avg_urgency * 10, fill: "#6366F1" }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-900 p-8 md:p-12 shadow-glow">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 mask-fade-left">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fff"
                strokeWidth={4}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-[0.2em] font-bold">
            Problem Cluster
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {data.cluster.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full border border-white/10 backdrop-blur-sm">
              <MessageSquare className="h-4 w-4 text-white/60" />
              <span className="text-sm font-bold text-white">{data.cluster.post_count} Signals</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">+{data.cluster.trend_7d}% Growth</span>
            </div>
          </div>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            {data.cluster.summary}
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pain Points Timeline */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Pain Point Evolution</h2>
          </div>
          <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-violet-500 before:to-transparent">
            {data.pains.map((pain, idx) => (
              <div key={pain.id} className="relative group">
                <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-indigo-500 group-hover:scale-125 transition-transform z-10" />
                <div className="glass p-6 rounded-2xl group-hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{pain.pain_point}</h3>
                      <p className="text-xs text-white/40 font-medium italic">Target: {pain.target_user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Intensity</p>
                      <span className="text-2xl font-bold text-white">{pain.urgency_score}/10</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      style={{ width: `${pain.urgency_score * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Heat & Related */}
        <aside className="space-y-8">
          {/* Heat Gauge */}
          <div className="glass p-8 rounded-3xl flex flex-col items-center text-center">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Market Heat Index</h3>
            <div className="relative w-48 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  data={heatData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-3xl font-bold text-white">
                {Math.round(data.cluster.avg_urgency * 10)}%
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-emerald-400">Extreme Demand Signal Detected</p>
          </div>

          {/* Source Posts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Raw Signal Intelligence</h3>
            <div className="space-y-3">
              {data.posts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-4 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    {post.platform.toLowerCase().includes('reddit') ? <MessageSquare className="h-4 w-4 text-orange-500" /> : <Twitter className="h-4 w-4 text-sky-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{post.title}</h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase mt-1">
                      {post.upvotes} Engagement · {post.platform}
                    </p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-white/20 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Ideas Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Synthesized Opportunities</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.ideas.map((idea) => (
            <div key={idea.id} className="glass p-6 rounded-3xl flex flex-col justify-between group hover:border-indigo-500/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase bg-indigo-500/5 border-indigo-500/20 text-indigo-400">
                    {idea.idea_type}
                  </Badge>
                  <span className="text-xl font-black text-white/20 group-hover:text-indigo-500/20 transition-colors tracking-tighter">
                    {idea.final_score.toFixed(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">{idea.idea_name}</h3>
                <p className="text-xs text-white/40 line-clamp-3 leading-relaxed mb-6">
                  {idea.description}
                </p>
              </div>
              <Link
                href={`/ideas/${idea.id}`}
                className="w-full py-3 rounded-xl bg-white/5 text-center text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
              >
                Access Execution Plan
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
