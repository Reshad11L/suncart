"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useLanguage } from "@/lib/language-context";
import products from "@/data/products.json";
import toast from "react-hot-toast";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? "star-filled" : "star-empty"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-base font-semibold ml-2 opacity-70">{rating} / 5</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/products/${id}`);
    }
  }, [session, isPending, router, id]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) return null;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">😔</div>
        <h2 className="font-display text-2xl font-bold">Product not found</h2>
        <Link href="/products" className="btn btn-primary rounded-xl text-white">
          Back to Products
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-8 opacity-70">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">{t("nav.products")}</Link></li>
          <li className="text-primary font-medium">{product.name}</li>
        </ul>
      </div>

      {/* Main Product */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="animate-fadeInUp">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="badge badge-primary text-white font-semibold px-3 py-2 text-sm shadow">
                {product.category}
              </div>
              {product.stock > 0 ? (
                <div className="badge badge-success text-white font-semibold px-3 py-2 text-sm shadow">
                  {t("detail.stock")}
                </div>
              ) : (
                <div className="badge badge-error text-white font-semibold px-3 py-2 text-sm shadow">
                  {t("detail.outStock")}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail row (decorative) */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 flex-shrink-0 cursor-pointer hover:border-primary transition-colors">
                <Image src={product.image} alt={`view ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="animate-fadeInUp animate-delay-200">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">{product.brand}</p>
          <h1 className="font-display text-3xl lg:text-4xl font-black mb-4 leading-tight">
            {product.name}
          </h1>

          <StarRating rating={product.rating} />

          <div className="divider my-6" />

          <div className="text-5xl font-black text-primary mb-6">
            ${product.price}
          </div>

          <p className="text-base-content/70 leading-relaxed text-base mb-8">
            {product.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-base-200 rounded-2xl p-4">
              <p className="text-xs opacity-60 uppercase tracking-wider mb-1">{t("detail.brand")}</p>
              <p className="font-bold">{product.brand}</p>
            </div>
            <div className="bg-base-200 rounded-2xl p-4">
              <p className="text-xs opacity-60 uppercase tracking-wider mb-1">{t("detail.category")}</p>
              <p className="font-bold">{product.category}</p>
            </div>
            <div className="bg-base-200 rounded-2xl p-4">
              <p className="text-xs opacity-60 uppercase tracking-wider mb-1">Rating</p>
              <p className="font-bold">⭐ {product.rating} / 5</p>
            </div>
            <div className={`rounded-2xl p-4 ${product.stock > 0 ? "bg-success/10" : "bg-error/10"}`}>
              <p className="text-xs opacity-60 uppercase tracking-wider mb-1">Availability</p>
              <p className={`font-bold ${product.stock > 0 ? "text-success" : "text-error"}`}>
                {product.stock > 0 ? `${product.stock} units left` : t("detail.outStock")}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => toast.success("Added to cart! 🛒")}
              className="btn btn-outline btn-primary btn-lg rounded-2xl flex-1"
              disabled={product.stock === 0}
            >
              🛒 {t("detail.addCart")}
            </button>
            <button
              onClick={() => toast.success("Order placed! ☀️")}
              className="btn btn-primary btn-lg rounded-2xl flex-1 text-white shadow-xl shadow-primary/30"
              disabled={product.stock === 0}
            >
              ⚡ {t("detail.buyNow")}
            </button>
          </div>

          <Link href="/products" className="btn btn-ghost mt-4 w-full rounded-2xl">
            ← {t("detail.back")}
          </Link>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-display text-3xl font-bold mb-8">Similar Products</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/products/${rp.id}`}
                className="card bg-base-100 border border-base-200 card-hover rounded-2xl overflow-hidden shadow-md group"
              >
                <figure className="relative h-44 overflow-hidden">
                  <Image src={rp.image} alt={rp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </figure>
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold mb-1">{rp.brand}</p>
                  <h3 className="font-display font-bold line-clamp-1">{rp.name}</h3>
                  <p className="text-primary font-bold mt-2">${rp.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
