"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { useLanguage } from "@/lib/language-context";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { t } = useLanguage();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn.email({
        email: form.email,
        password: form.password,
      });
      if (result.error) {
        toast.error(result.error.message || "Login failed. Check your credentials.");
      } else {
        toast.success("Welcome back! ☀️");
        router.push(redirect);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-3xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2 sun-gradient" />

          <div className="card-body p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl sun-gradient flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-2xl font-black">S</span>
              </div>
              <h1 className="font-display text-3xl font-black">{t("auth.loginTitle")}</h1>
              <p className="text-base-content/60 text-sm mt-1 text-center">{t("auth.loginSub")}</p>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="btn btn-outline w-full rounded-2xl gap-3 mb-6 hover:border-primary hover:text-primary transition-all"
            >
              {googleLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
              )}
              {t("auth.googleBtn")}
            </button>

            <div className="divider text-xs opacity-40">{t("auth.orGoogle")}</div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-sm">{t("auth.email")}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered rounded-2xl focus:input-primary w-full"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-sm">{t("auth.password")}</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered rounded-2xl focus:input-primary w-full"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-2xl text-white shadow-xl shadow-primary/30 mt-2"
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : null}
                {t("auth.login")}
              </button>
            </form>

            <p className="text-center text-sm mt-6 opacity-70">
              {t("auth.noAccount")}{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                {t("auth.registerLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
