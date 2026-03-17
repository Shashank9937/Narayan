from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.cluster import ProblemCluster
from app.models.idea import Idea
from app.models.pain import ExtractedPain
from app.models.post import Post
from app.schemas.dashboard import DashboardOverview, KpiTile, QuickLaunchPlan, RevenueModelSummary, TrendSignal

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/overview", response_model=DashboardOverview)
async def dashboard_overview(
    db: AsyncSession = Depends(get_db),
    _: dict = Depends(get_current_user),
) -> DashboardOverview:
    import asyncio

    # Execute all independent count and aggregate queries in parallel
    (
        total_posts_res,
        total_pains_res,
        total_clusters_res,
        avg_validation_res,
        top_clusters_res,
        trending_res,
        top_ideas_res,
        revenue_res,
    ) = await asyncio.gather(
        db.execute(select(func.count(Post.id))),
        db.execute(select(func.count(ExtractedPain.id))),
        db.execute(select(func.count(ProblemCluster.id))),
        db.execute(select(func.avg(Idea.final_score))),
        db.execute(select(ProblemCluster).order_by(ProblemCluster.post_count.desc()).limit(6)),
        db.execute(select(ProblemCluster).order_by(ProblemCluster.trend_7d.desc()).limit(6)),
        db.execute(select(Idea).order_by(Idea.final_score.desc()).limit(8)),
        db.execute(
            select(Idea.revenue_model, func.count(Idea.id))
            .group_by(Idea.revenue_model)
            .order_by(func.count(Idea.id).desc())
            .limit(6)
        ),
    )

    total_posts = int(total_posts_res.scalar() or 0)
    total_pains = int(total_pains_res.scalar() or 0)
    total_clusters = int(total_clusters_res.scalar() or 0)
    avg_validation = float(avg_validation_res.scalar() or 0.0)

    top_clusters = list(top_clusters_res.scalars().all())
    trending_clusters = list(trending_res.scalars().all())
    top_ideas = list(top_ideas_res.scalars().all())
    
    revenue_summary = [
        RevenueModelSummary(revenue_model=row[0], idea_count=int(row[1])) for row in revenue_res.all()
    ]

    if top_ideas:
        best_idea = top_ideas[0]
        quick_launch = QuickLaunchPlan(
            title=f"Quick Launch Plan: {best_idea.idea_name}",
            bullet_points=[
                "Interview 8 ICP users from matched pain cluster.",
                "Build MVP core workflow + billing in week 2.",
                "Pilot with 3 design partners and measure activation.",
                "Ship paid beta with a usage-based expansion path.",
            ],
        )
    else:
        quick_launch = QuickLaunchPlan(
            title="No ideas generated yet",
            bullet_points=[
                "Run the scrape pipeline to collect new market signals.",
                "Check filters and include at least one industry tag.",
            ],
        )

    kpis = [
        KpiTile(label="Posts Collected", value=str(total_posts), delta="Live"),
        KpiTile(label="Pain Signals", value=str(total_pains), delta="Analyzed"),
        KpiTile(label="Problem Clusters", value=str(total_clusters), delta="Grouped"),
        KpiTile(label="Avg Validation", value=f"{avg_validation:.1f}", delta="/100"),
    ]

    signals = [
        TrendSignal(
            cluster_id=str(cluster.id),
            cluster_name=cluster.name,
            trend_7d=cluster.trend_7d,
            trend_30d=cluster.trend_30d,
        )
        for cluster in trending_clusters
    ]

    return DashboardOverview(
        kpis=kpis,
        top_clusters=top_clusters,
        trending_signals=signals,
        top_ideas=top_ideas,
        revenue_summary=revenue_summary,
        quick_launch_plan=quick_launch,
    )
