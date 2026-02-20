"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Clapperboard, LogIn } from "lucide-react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [user, isAdmin, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth context will detect the login and redirect
    } catch {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] flex items-center justify-center">
            <Clapperboard size={24} className="text-[var(--dark-blue)]" />
          </div>
          <div>
            <span className="text-2xl font-black text-[var(--cream)]">
              Mind<span className="text-[var(--electric-blue)]">ID</span>
            </span>
            <span className="block text-xs font-bold text-[var(--lime)]">Admin Panel</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 p-6 space-y-4 shadow-[6px_6px_0px_var(--electric-blue)]"
        >
          <div>
            <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none"
              placeholder="admin@mindid.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">Şifre</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border-2 border-red-500/30 text-red-400 text-xs font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-black text-sm flex items-center justify-center gap-2 cursor-pointer hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
