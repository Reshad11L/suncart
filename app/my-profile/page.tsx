"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useLanguage } from "@/lib/language-context";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fadeInUp">
        <div className="badge badge-primary badge-lg mb-4 text-white font-semibold px-4">👤 Profile</div>
        <h1 className="font-display text-4xl font-bold">{t("profile.title")}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl border border-base-200 rounded-3xl p-8 text-center animate-fadeInUp">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {user.image ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-xl">
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full sun-gradient flex items-center justify-center ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-xl">
                    <span className="text-white text-5xl font-black">
                      {(user.name || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>

              <h2 className="font-display font-bold text-xl mb-1">{user.name || "User"}</h2>
              <p className="text-sm opacity-60 mb-6 break-all">{user.email}</p>

              <div className="badge badge-success badge-outline font-semibold mb-4">
                ✓ Verified Account
              </div>
            </div>

            <div className="divider" />

            <div className="flex flex-col gap-3">
              <Link
                href="/my-profile/update-info"
                className="btn btn-primary rounded-2xl text-white w-full shadow-lg shadow-primary/30"
              >
                ✏️ {t("profile.update")}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error rounded-2xl w-full"
              >
                {t("nav.logout")}
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="md:col-span-2 space-y-6 animate-fadeInUp animate-delay-200">
          {/* Account Details */}
          <div className="card bg-base-100 shadow-xl border border-base-200 rounded-3xl p-6">
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">📋</span>
              Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  👤
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase tracking-wider">{t("profile.name")}</p>
                  <p className="font-bold">{user.name || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  📧
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase tracking-wider">{t("profile.email")}</p>
                  <p className="font-bold break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center text-success">
                  🆔
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase tracking-wider">User ID</p>
                  <p className="font-bold font-mono text-xs opacity-70 break-all">{user.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-100 shadow-xl border border-base-200 rounded-3xl p-6">
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">⚡</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/products" className="btn btn-outline rounded-2xl flex-col h-auto py-4 hover:btn-primary transition-all">
                <span className="text-2xl mb-1">🛍️</span>
                <span className="text-sm font-medium">Browse Products</span>
              </Link>
              <Link href="/my-profile/update-info" className="btn btn-outline rounded-2xl flex-col h-auto py-4 hover:btn-secondary transition-all">
                <span className="text-2xl mb-1">✏️</span>
                <span className="text-sm font-medium">Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
