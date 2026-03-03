import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrendSignal } from "@/lib/types";
import { MessageSquare, Twitter, Globe, Share2 } from "lucide-react";

export function TrendingSignals({ signals }: { signals: TrendSignal[] }) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "reddit": return <MessageSquare className="h-3 w-3 text-orange-500" />;
      case "twitter": return <Twitter className="h-3 w-3 text-sky-400" />;
      case "producthunt": return <Globe className="h-3 w-3 text-orange-600" />;
      default: return <Share2 className="h-3 w-3 text-indigo-400" />;
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden h-[400px] flex flex-col">
      <div className="p-4 border-b border-white/5 bg-white/5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Live Signal Feed</h3>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col animate-ticker space-y-4 p-4">
          {[...signals, ...signals].map((signal, idx) => (
            <div key={`${signal.cluster_id}-${idx}`} className="glass p-3 rounded-xl border-l-2 border-indigo-500/50">
              <div className="flex items-center gap-2 mb-1">
                {getIcon(signal.cluster_name.split(' ')[0])}
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs font-medium text-white line-clamp-1">{signal.cluster_name}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500/50" style={{ width: '40%' }} />
                </div>
                <span className="text-[10px] font-bold text-indigo-400">{signal.trend_7d}↑</span>
              </div>
            </div>
          ))}
        </div>
        {/* Fades */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0A0F1E] to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0F1E] to-transparent z-10" />
      </div>
    </div>
  );
}
