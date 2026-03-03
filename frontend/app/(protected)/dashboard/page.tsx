"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AdminPanel } from "@/components/dashboard/admin-panel";
import { ClusterCard } from "@/components/dashboard/cluster-card";
import { IdeaTable } from "@/components/dashboard/idea-table";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { QuickLaunchCard } from "@/components/dashboard/quick-launch";
import { RevenueSummaryCard } from "@/components/dashboard/revenue-summary";
import { TrendingSignals } from "@/components/dashboard/trending-signals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminFilters, getDashboardOverview } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { AdminFilters, DashboardOverview } from "@/lib/types";

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

  if (isLoading) {
    return <p className="py-20 text-center text-muted-foreground">Loading intelligence dashboard...</p>;
  }

  if (error || !overview) {
    return <p className="py-20 text-center text-sm text-rose-300">{error ?? "No dashboard data available"}</p>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">Intelligence Dashboard</h1>
        <p className="text-white/40 font-medium">Monitoring global pain signals for asymmetric founder advantage.</p>
      </header>

      {/* KPI Section */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.kpis.map((kpi, index) => (
          <KpiTile key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
        ))}
      </section>

      {/* Clusters Horizontal Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Top Problem Clusters</h2>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Scroll for more →</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-fade-right">
          {overview.top_clusters.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ideas Kanban Grid */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">High Potential Ideas</h2>
          </div>
          <IdeaTable ideas={overview.top_ideas} />
        </section>

        {/* Sidebar Components */}
        <aside className="space-y-8">
          <TrendingSignals signals={overview.trending_signals} />
          <RevenueSummaryCard items={overview.revenue_summary} />
          <AdminPanel accessToken={token} initialFilters={filters} />
        </aside>
      </div>
    </div>
  );
}
