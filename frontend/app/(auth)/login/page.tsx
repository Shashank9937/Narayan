"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Radar, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060A16]">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-violet-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px]"
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        <div className="glass p-8 sm:p-10 rounded-3xl" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)' }}>
          {/* Logo & heading */}
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow"
            >
              <Radar className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-white/30 font-medium mt-1">
                {mode === "login"
                  ? "Access your intelligence command center."
                  : "Initialize your founder intelligence platform."}
              </p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-indigo-400 transition-colors z-10" />
              <input
                type="email"
                id="login-email"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.06] placeholder:text-white/20"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-indigo-400 transition-colors z-10" />
              <input
                type="password"
                id="login-password"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.06] placeholder:text-white/20"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]",
                "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-glow",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Toggle mode */}
            <button
              type="button"
              className="w-full text-center text-[11px] font-semibold text-white/20 hover:text-white/50 transition-colors py-1"
              onClick={() => {
                setMode((current) => (current === "login" ? "signup" : "login"));
                setMessage(null);
              }}
            >
              {mode === "login" ? "Don't have an account? Sign up →" : "Already registered? Sign in ←"}
            </button>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20"
              >
                <p className="text-[11px] font-semibold text-rose-400 text-center">{message}</p>
              </motion.div>
            )}
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-[10px] text-white/10 mt-6 font-medium">
          Market War Radar · AI Founder Intelligence Engine
        </p>
      </motion.div>
    </div>
  );
}
