import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProblemCluster } from "@/lib/types";
import { MoveRight } from "lucide-react";

export function ClusterCard({ cluster }: { cluster: ProblemCluster }) {
  const urgencyColor =
    cluster.avg_urgency > 7 ? "text-rose-400 bg-rose-400/10 border-rose-400/20" :
      cluster.avg_urgency > 4 ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" :
        "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";

  return (
    <Link href={`/clusters/${cluster.id}`}>
      <div className="glass glass-hover p-4 rounded-full flex items-center gap-4 min-w-[300px] group">
        <div className={`w-2 h-2 rounded-full animate-pulse ${urgencyColor.split(' ')[0].replace('text-', 'bg-')}`} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{cluster.name}</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">{cluster.post_count} signals</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${urgencyColor}`}>
          {cluster.avg_urgency.toFixed(1)}
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MoveRight className="h-4 w-4 text-white/40 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}
