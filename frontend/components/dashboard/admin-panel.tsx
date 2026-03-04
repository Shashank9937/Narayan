"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAdminFilters, triggerScrape, triggerTrendRecalc } from "@/lib/api";
import type { AdminFilters } from "@/lib/types";
import { Shield, Play, RefreshCw, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const INDUSTRY_OPTIONS = ["SaaS", "Energy", "B2B", "AI", "Logistics", "FinTech", "HealthTech"];

export function AdminPanel({
  accessToken,
  initialFilters,
}: {
  accessToken?: string;
  initialFilters: AdminFilters | null;
}) {
  const [includeKeywords, setIncludeKeywords] = useState(
    (initialFilters?.include_keywords ?? []).join(", ")
  );
  const [excludeKeywords, setExcludeKeywords] = useState(
    (initialFilters?.exclude_keywords ?? []).join(", ")
  );
  const [geoScope, setGeoScope] = useState<"GLOBAL" | "INDIA">(
    initialFilters?.geo_scope ?? "GLOBAL"
  );
  const [industries, setIndustries] = useState<string[]>(
    initialFilters?.industries ?? ["SaaS"]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const sanitizedPayload = useMemo(() => {
    const parse = (value: string) =>
      value.split(",").map((item) => item.trim()).filter(Boolean);
    return {
      include_keywords: parse(includeKeywords),
      exclude_keywords: parse(excludeKeywords),
      geo_scope: geoScope,
      industries,
    };
  }, [excludeKeywords, geoScope, includeKeywords, industries]);

  const toggleIndustry = (industry: string) => {
    setIndustries((current) =>
      current.includes(industry)
        ? current.filter((item) => item !== industry)
        : [...current, industry]
    );
  };

  const onSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      await updateAdminFilters(sanitizedPayload, accessToken);
      setMessage({ text: "Filters saved successfully", type: "success" });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Failed to save", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const onRun = async (mode: "scrape" | "trends") => {
    setIsRunning(true);
    setMessage(null);
    try {
      if (mode === "scrape") {
        await triggerScrape(accessToken);
        setMessage({ text: "Scraping pipeline triggered", type: "success" });
      } else {
        await triggerTrendRecalc(accessToken);
        setMessage({ text: "Trend recalculation started", type: "success" });
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Request failed", type: "error" });
    } finally {
      setIsRunning(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/[0.04] bg-white/[0.02] flex items-center gap-2">
        <Shield className="h-3.5 w-3.5 text-amber-400" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Admin Controls
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Keywords */}
        <div className="space-y-1.5">
          <Label htmlFor="include" className="text-[10px] font-bold uppercase tracking-wider text-white/30">
            Include keywords
          </Label>
          <Input
            id="include"
            placeholder="churn, manual process, costly"
            value={includeKeywords}
            onChange={(e) => setIncludeKeywords(e.target.value)}
            className="bg-white/[0.03] border-white/[0.06] focus:border-indigo-500/40 rounded-xl h-9 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="exclude" className="text-[10px] font-bold uppercase tracking-wider text-white/30">
            Exclude keywords
          </Label>
          <Input
            id="exclude"
            placeholder="student, meme"
            value={excludeKeywords}
            onChange={(e) => setExcludeKeywords(e.target.value)}
            className="bg-white/[0.03] border-white/[0.06] focus:border-indigo-500/40 rounded-xl h-9 text-xs"
          />
        </div>

        {/* Geo scope */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Geo scope</p>
          <div className="flex gap-2">
            {(["GLOBAL", "INDIA"] as const).map((scope) => (
              <button
                key={scope}
                type="button"
                onClick={() => setGeoScope(scope)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  geoScope === scope
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:bg-white/[0.06]"
                )}
              >
                {scope === "GLOBAL" ? "🌍 Global" : "🇮🇳 India"}
              </button>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Industries</p>
          <div className="flex flex-wrap gap-1.5">
            {INDUSTRY_OPTIONS.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                  industries.includes(industry)
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "bg-white/[0.03] text-white/30 border border-white/[0.06] hover:text-white/50"
                )}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/30 transition-all disabled:opacity-50 border border-indigo-500/20"
          >
            <Save className="h-3.5 w-3.5" />
            {isSaving ? "Saving..." : "Save Filters"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onRun("scrape")}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] text-white/50 text-[11px] font-medium hover:bg-white/[0.06] hover:text-white/80 transition-all disabled:opacity-50 border border-white/[0.06]"
            >
              <Play className="h-3 w-3" />
              Scrape
            </button>
            <button
              onClick={() => onRun("trends")}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] text-white/50 text-[11px] font-medium hover:bg-white/[0.06] hover:text-white/80 transition-all disabled:opacity-50 border border-white/[0.06]"
            >
              <RefreshCw className={cn("h-3 w-3", isRunning && "animate-spin")} />
              Trends
            </button>
          </div>
        </div>

        {/* Status message */}
        {message && (
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium animate-scale-in",
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          )}>
            {message.type === "success" ? (
              <CheckCircle2 className="h-3 w-3 shrink-0" />
            ) : (
              <AlertCircle className="h-3 w-3 shrink-0" />
            )}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
