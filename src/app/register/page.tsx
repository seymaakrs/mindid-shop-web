"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { grantSignupBonus } from "@/lib/credits";
import { useAuth } from "@/lib/auth-context";
import { trackEvent, identifyUser } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isCustomer, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && isCustomer) {
      router.replace("/dashboard");
    }
  }, [user, isCustomer, authLoading, router]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });

      // Create customer document in Firestore
      await setDoc(doc(db, "mindid_customers", cred.user.uid), {
        uid: cred.user.uid,
        email: form.email,
        name: form.name,
        company: form.company,
        phone: form.phone,
        plan: "free",
        credits: 0,
        totalCreditsEarned: 0,
        totalCreditsSpent: 0,
        signupBonusGiven: false,
        totalSpent: 0,
        orderCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Grant free signup credits (freemium)
      try {
        await grantSignupBonus(cred.user.uid);
      } catch (bonusErr) {
        console.error("Signup bonus failed", bonusErr);
      }

      identifyUser(cred.user.uid, form.email);
      trackEvent("sign_up", { customerId: cred.user.uid, email: form.email });

      router.replace("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err) {
        const code = (err as { code: string }).code;
        if (code === "auth/email-already-in-use") {
          setError("Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.");
        } else if (code === "auth/weak-password") {
          setError("Şifre çok zayıf. En az 6 karakter kullanın.");
        } else {
          setError("Kayıt sırasında bir hata oluştu. Tekrar deneyin.");
        }
      } else {
        setError("Kayıt sırasında bir hata oluştu. Tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "AI ile otomatik içerik üretimi",
    "Sipariş takibi ve anlık bildirimler",
    "Sosyal medya yönetim paneli",
    "7/24 erişim, sınırsız revizyon",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black text-white">
              Mind<span className="text-[var(--lime)]">ID</span>
            </h1>
          </Link>
          <p className="text-sm text-gray-400 mt-2">AI İçerik Üretim Platformu</p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {benefits.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--lime)]/10 text-[var(--lime)] text-xs font-medium border border-[var(--lime)]/20">
              <Check size={12} /> {b}
            </span>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Ücretsiz Hesap Oluştur</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Şirket</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="Şirket Adı"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">E-posta *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="ornek@sirket.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="0555 123 4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Şifre *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                    placeholder="En az 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Şifre Tekrar *</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="Şifrenizi tekrarlayın"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[var(--lime)] text-[#100a2c] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={16} />
              {loading ? "Hesap oluşturuluyor..." : "Ücretsiz Kaydol"}
            </button>

            <p className="text-[10px] text-gray-500 text-center">
              Kaydolarak{" "}
              <Link href="/kullanim-kosullari" className="underline hover:text-gray-300">Kullanım Koşullarını</Link>
              {" "}ve{" "}
              <Link href="/gizlilik" className="underline hover:text-gray-300">Gizlilik Politikasını</Link>
              {" "}kabul etmiş olursunuz.
            </p>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Zaten hesabın var mı?{" "}
              <Link href="/login" className="text-[var(--lime)] font-semibold hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 inline-flex items-center gap-1 transition-colors">
            <ArrowRight size={12} className="rotate-180" /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
