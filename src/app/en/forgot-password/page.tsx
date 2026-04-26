"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Mail, ArrowRight, Check, AlertCircle, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setStatus("success");
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: string }).code)
          : "";

      if (code === "auth/user-not-found") {
        // Don't leak existence — show generic success.
        setStatus("success");
      } else if (code === "auth/invalid-email") {
        setErrorMsg("Please enter a valid email address.");
        setStatus("error");
      } else if (code === "auth/too-many-requests") {
        setErrorMsg("Too many attempts. Please try again in a few minutes.");
        setStatus("error");
      } else if (code === "auth/network-request-failed") {
        setErrorMsg("Connection error. Check your internet connection.");
        setStatus("error");
      } else {
        setErrorMsg("An error occurred. Please try again.");
        setStatus("error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black text-white">
              Mind<span className="text-[var(--lime)]">ID</span>
            </h1>
          </Link>
          <p className="text-sm text-gray-400 mt-2">AI Content Production Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-[var(--lime)]/20 flex items-center justify-center">
              <Mail size={16} className="text-[var(--lime)]" />
            </div>
            <h2 className="text-xl font-bold text-white">Forgot Password</h2>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          {status === "success" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--lime)]/10 border border-[var(--lime)]/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--lime)] flex items-center justify-center shrink-0">
                  <Check size={16} className="text-[#100a2c]" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Check your email</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    A password reset link has been sent. Don&apos;t forget to check
                    your spam folder.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="w-full py-3.5 rounded-xl bg-[var(--lime)] text-[#100a2c] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                Sign In
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="you@company.com"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              {status === "error" && errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-start gap-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full py-3.5 rounded-xl bg-[var(--lime)] text-[#100a2c] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    <Mail size={16} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              href="/login"
              className="text-xs text-gray-400 hover:text-[var(--lime)] inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={12} /> Back to Sign In
            </Link>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-300 inline-flex items-center gap-1 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
