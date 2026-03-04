import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#060A16]">
      <Sidebar />
      <main className="flex-1 pl-[64px] transition-all duration-300 ease-in-out">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
