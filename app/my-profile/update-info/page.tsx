"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { useLanguage } from "@/lib/language-context";
import toast from "react-hot-toast";

export default function UpdateInfoPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
      setPreview(session.user.image || null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      // Using BetterAuth updateUser
      const result = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      if (result.error) {
        toast.error(result.error.message || "Update failed.");
      } else {
        toast.success("Profile updated! ✨");
        router.push("/my-profile");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-8 opacity-70">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/my-profile">{t("profile.title")}</Link></li>
          <li className="text-primary font-medium">{t("profile.updateTitle")}</li>
        </ul>
      </div>

      <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-3xl overflow-hidden animate-fadeInUp">
        <div className="h-2 sun-gradient" />
        <div className="card-body p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl sun-gradient flex items-center justify-center shadow-lg">
              <span className="text-xl">✏️</span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-black">{t("profile.updateTitle")}</h1>
              <p className="text-sm opacity-60">Update your profile information</p>
            </div>
          </div>

          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-8 p-6 bg-base-200 rounded-3xl">
            <div className="relative mb-4">
              {preview ? (
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-base-200 shadow-xl">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    onError={() => setPreview(null)}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full sun-gradient flex items-center justify-center ring-4 ring-primary ring-offset-4 ring-offset-base-200 shadow-xl">
                  <span className="text-white text-4xl font-black">
                    {(form.name || session.user.name || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold">{form.name || "Your Name"}</p>
            <p className="text-xs opacity-60">{session.user.email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold">{t("auth.name")}</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="input input-bordered rounded-2xl focus:input-primary w-full"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold">{t("auth.photoUrl")}</span>
                <span className="label-text-alt opacity-60">Paste image URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/your-photo.jpg"
                className="input input-bordered rounded-2xl focus:input-primary w-full"
                value={form.image}
                onChange={handleChange}
              />
              <p className="text-xs opacity-50 mt-1 ml-2">
                Tip: Use a direct image URL (ends in .jpg, .png, etc.)
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              <Link href="/my-profile" className="btn btn-outline rounded-2xl flex-1">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary rounded-2xl flex-1 text-white shadow-xl shadow-primary/30"
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : null}
                {t("profile.updateBtn")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
