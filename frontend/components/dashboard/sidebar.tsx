"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    Lightbulb,
    Settings,
    LogOut,
    User,
    Radar,
    Search,
    ChevronLeft,
    ChevronRight,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Layers, label: "Market Clusters", href: "/dashboard#clusters" },
    { icon: Lightbulb, label: "Opportunities", href: "/dashboard#ideas" },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isPinned, setIsPinned] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const onSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    const isActive = (href: string) => {
        return pathname.startsWith(href.split("#")[0]);
    };

    const collapsed = isCollapsed && !isPinned;

    return (
        <>
            {/* Mobile overlay */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => { setIsCollapsed(true); setIsPinned(false); }}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full border-r border-white/[0.06] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col",
                    "bg-[#060A16]/95 backdrop-blur-xl",
                    collapsed ? "w-[64px]" : "w-[240px]"
                )}
                onMouseEnter={() => !isPinned && setIsCollapsed(false)}
                onMouseLeave={() => !isPinned && setIsCollapsed(true)}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.04]">
                    <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
                        <div className="min-w-[32px] h-[32px] rounded-xl overflow-hidden shadow-glow shrink-0">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-lg gradient-text truncate">
                                MWR
                            </span>
                        )}
                    </Link>
                    {!collapsed && (
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white/60"
                            title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                        >
                            {isPinned ? (
                                <ChevronLeft className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                            )}
                        </button>
                    )}
                </div>

                {/* Live indicator */}
                <div className="px-4 py-3 flex items-center">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="min-w-[8px] h-[8px] rounded-full bg-emerald-500 animate-pulse-dot shrink-0" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
                        {!collapsed && (
                            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase">
                                SCANNING LIVE
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 overflow-y-auto scrollbar-hide">
                    {!collapsed && (
                        <p className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20">
                            Navigation
                        </p>
                    )}
                    <div className="space-y-0.5">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                        active
                                            ? "bg-indigo-500/10 text-indigo-400"
                                            : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                                    )}
                                >
                                    {active && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
                                    )}
                                    <item.icon
                                        className={cn(
                                            "h-[18px] w-[18px] shrink-0 transition-all duration-200",
                                            active ? "text-indigo-400" : "group-hover:scale-105"
                                        )}
                                    />
                                    {!collapsed && (
                                        <span className="text-[13px] font-medium whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                    {active && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-500/10 blur-xl rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Keyboard shortcut hint */}
                {!collapsed && (
                    <div className="mx-3 mb-3">
                        <div className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/30 text-xs cursor-default">
                            <Search className="h-3.5 w-3.5" />
                            <span>Search signals...</span>
                            <span className="ml-auto flex items-center gap-0.5 text-[10px] font-mono">
                                <Command className="h-2.5 w-2.5" />K
                            </span>
                        </div>
                    </div>
                )}

                {/* Bottom section */}
                <div className="p-2 border-t border-white/[0.04] space-y-0.5">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white/90 hover:bg-white/[0.04] transition-all group">
                        <Settings className="h-[18px] w-[18px] shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                        {!collapsed && <span className="text-[13px] font-medium">Settings</span>}
                    </button>

                    <button
                        onClick={onSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all group"
                    >
                        <LogOut className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed && <span className="text-[13px] font-medium">Sign Out</span>}
                    </button>

                    {/* User avatar */}
                    <div className="flex items-center gap-3 px-2 py-2.5 border-t border-white/[0.04] mt-1 overflow-hidden">
                        <div className="min-w-[32px] h-[32px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center p-[1px] shrink-0">
                            <div className="w-full h-full rounded-full bg-[#060A16] flex items-center justify-center">
                                <User className="h-3.5 w-3.5 text-indigo-400" />
                            </div>
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col truncate">
                                <span className="text-[12px] font-semibold text-white">Founder</span>
                                <span className="text-[10px] text-white/30 truncate">Admin Access</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
