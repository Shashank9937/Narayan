"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createClient();

    try {
      const response =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (response.error) {
        setMessage(response.error.message);
      } else if (mode === "signup") {
        setMessage("Check your email for confirmation, then sign in.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setMessage("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0F1E] font-geist">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 animate-fade-up">
        <div className="glass p-10 rounded-[40px] shadow-glow border-white/10">
          <div className="flex flex-col items-center text-center space-y-2 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow mb-4">
              <span className="text-white font-black text-xl tracking-tighter">M</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Welcome Back</h1>
            <p className="text-sm text-white/40 font-medium tracking-tight">Access the command center for asymmetric advantage.</p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Floating Email Input */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none transition-all focus:border-indigo-500/50 focus:bg-white/[0.08] peer placeholder-transparent"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-4 text-sm text-white/40 font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-indigo-400 peer-focus:bg-[#12182b] peer-focus:px-2"
                style={{ top: email ? '-12px' : '', left: email ? '16px' : '', fontSize: email ? '10px' : '', color: email ? '#818cf8' : '', backgroundColor: email ? '#12182b' : '', paddingLeft: email ? '8px' : '', paddingRight: email ? '8px' : '' }}
              >
                EMAIL ADDRESS
              </label>
            </div>

            {/* Floating Password Input */}
            <div className="relative group">
              <input
                type="password"
                id="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none transition-all focus:border-indigo-500/50 focus:bg-white/[0.08] peer placeholder-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-4 text-sm text-white/40 font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-indigo-400 peer-focus:bg-[#12182b] peer-focus:px-2"
                style={{ top: password ? '-12px' : '', left: password ? '16px' : '', fontSize: password ? '10px' : '', color: password ? '#818cf8' : '', backgroundColor: password ? '#12182b' : '', paddingLeft: password ? '8px' : '', paddingRight: password ? '8px' : '' }}
              >
                PASSWORD
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black py-7 rounded-2xl shadow-glow border-none transition-all active:scale-95"
            >
              {isLoading ? "AUTHORIZING..." : mode === "login" ? "INITIALIZE SESSION" : "CREATE IDENTITY"}
            </Button>

            <button
              type="button"
              className="w-full text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
              onClick={() => setMode((current) => (current === "login" ? "signup" : "login"))}
            >
              {mode === "login" ? "No clearance? Request access →" : "Have credentials? Return to portal ←"}
            </button>

            {message && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <p className="text-[10px] font-bold text-rose-400 text-center uppercase tracking-widest">{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
