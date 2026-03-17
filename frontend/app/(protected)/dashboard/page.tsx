"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { AdminPanel } from "@/components/dashboard/admin-panel";
import { ClusterCard } from "@/components/dashboard/cluster-card";
import { IdeaTable, IdeaTableSkeleton } from "@/components/dashboard/idea-table";
import { KpiTile, KpiTileSkeleton } from "@/components/dashboard/kpi-tile";
import { RevenueSummaryCard } from "@/components/dashboard/revenue-summary";
import { TrendingSignals } from "@/components/dashboard/trending-signals";
import { getAdminFilters, getDashboardOverview } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { AdminFilters, DashboardOverview } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, Zap, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [filters, setFilters] = useState<AdminFilters | null>(null);
  const [token, setToken] = useState<string | undefined>();

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

      setToken(session.access_token);

      try {
        const [overviewData, filterData] = await Promise.all([
          getDashboardOverview(session.access_token),
          getAdminFilters(session.access_token).catch(() => null),
        ]);
        setOverview(overviewData);
        setFilters(filterData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="glass p-12 rounded-3xl max-w-md">
          <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-5 w-5 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-sm text-white/40 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm font-semibold hover:bg-indigo-500/30 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="skeleton h-10 w-80 rounded-lg" />
          <div className="skeleton h-5 w-96 rounded-lg" />
        </div>
        {/* KPI skeletons */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <KpiTileSkeleton key={i} />)}
        </div>
        {/* Cluster skeletons */}
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-16 min-w-[300px] rounded-2xl" />
          ))}
        </div>
        {/* Content skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IdeaTableSkeleton />
          </div>
          <div className="space-y-4">
            <div className="skeleton h-[400px] rounded-2xl" />
            <div className="skeleton h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="glass p-12 rounded-3xl max-w-md">
          <Sparkles className="h-8 w-8 text-white/10 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No Data Yet</h2>
          <p className="text-sm text-white/40">
            Run the scraping pipeline from the admin controls to start collecting intelligence.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/80">
              Live Intelligence
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Intelligence Dashboard
          </h1>
          <p className="text-sm text-white/30 font-medium max-w-lg">
            Real-time monitoring of global pain signals for asymmetric founder advantage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              setIsLoading(true);
              const supabase = createClient();
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                try {
                  const [overviewData, filterData] = await Promise.all([
                    getDashboardOverview(session.access_token),
                    getAdminFilters(session.access_token).catch(() => null),
                  ]);
                  setOverview(overviewData);
                  setFilters(filterData);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Failed to refresh");
                }
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
            className="glass px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/[0.05] transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 text-white/40", isLoading && "animate-spin")} />
            <span className="text-xs font-semibold text-white/60">Refresh</span>
          </button>

          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Last scan</span>
            <span className="text-xs font-mono text-white/60">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>
      </motion.header>

      {/* KPI Grid */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.kpis.map((kpi, index) => (
          <KpiTile key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} index={index} />
        ))}
      </section>

      {/* Clusters horizontal scroll */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Top Problem Clusters
          </h2>
          <span className="text-[10px] font-bold text-white/15 uppercase tracking-[0.2em]">
            Scroll for more →
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
          {overview.top_clusters.map((cluster, idx) => (
            <ClusterCard key={cluster.id} cluster={cluster} index={idx} />
          ))}
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ideas */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              High Potential Ideas
            </h2>
            <span className="text-[10px] font-bold text-white/15 uppercase tracking-[0.2em]">
              {overview.top_ideas.length} opportunities
            </span>
          </div>
          <IdeaTable ideas={overview.top_ideas} />
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          <TrendingSignals signals={overview.trending_signals} />
          <RevenueSummaryCard items={overview.revenue_summary} />
          <AdminPanel accessToken={token} initialFilters={filters} />
        </aside>
      </div>
    </div>
  );
}
