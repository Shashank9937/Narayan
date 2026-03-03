"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    Lightbulb,
    Settings,
    LogOut,
    ChevronRight,
    User,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Layers, label: "Market Clusters", href: "/dashboard" }, // Typically links to a list, but using dash for now
    { icon: Lightbulb, label: "Opportunity Ideas", href: "/dashboard" },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    const onSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-50 h-full bg-black border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col",
                isCollapsed ? "w-[64px]" : "w-[220px]"
            )}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-4 border-b border-white/5">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="min-w-[32px] h-[32px] rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
                        <Radar className="h-4 w-4 text-white" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent truncate">
                            MWR
                        </span>
                    )}
                </div>
            </div>

            {/* Live Badge */}
            <div className="px-4 py-4 flex items-center">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="min-w-[8px] h-[8px] rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse-dot" />
                    {!isCollapsed && (
                        <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
                            LIVE
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-indigo-400")} />
                            {!isCollapsed && (
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500/20 blur-lg rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-2 border-t border-white/5 space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all group">
                    <Settings className="h-5 w-5 shrink-0 group-hover:rotate-45 transition-transform" />
                    {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                </button>
                <button
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all group"
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
                </button>

                <div className="mt-2 flex items-center gap-3 px-2 py-2 border-t border-white/5 overflow-hidden">
                    <div className="min-w-[32px] h-[32px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <User className="h-4 w-4 text-indigo-400" />
                        </div>
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col truncate">
                            <span className="text-[12px] font-medium text-white">Founder</span>
                            <span className="text-[10px] text-white/40 truncate">Admin Access</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
