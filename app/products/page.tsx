"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import products from "@/data/products.json";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${star <= Math.round(rating) ? "star-filled" : "star-empty"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-semibold ml-1 opacity-70">{rating}</span>
    </div>
  );
}

const categories = ["All", "Accessories", "Clothing", "Skincare", "Beach Accessories"];

export default function ProductsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeInUp">
        <div className="badge badge-primary badge-lg mb-4 text-white font-semibold px-4">🛍️ Shop</div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold">{t("products.title")}</h1>
        <p className="mt-3 opacity-60 text-lg">{t("products.subtitle")}</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn rounded-2xl transition-all ${
              activeCategory === cat
                ? "btn-primary text-white shadow-lg shadow-primary/30"
                : "btn-outline hover:btn-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-xl border border-base-200 card-hover rounded-3xl overflow-hidden animate-fadeInUp group"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <figure className="relative overflow-hidden h-52">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 left-3">
                <div className="badge badge-neutral text-xs font-medium px-2 py-1">{product.category}</div>
              </div>
              <div className="absolute top-3 right-3">
                <div className={`badge text-xs font-bold px-2 ${product.stock > 0 ? "badge-success text-white" : "badge-error text-white"}`}>
                  {product.stock > 0 ? `${product.stock} left` : "Out"}
                </div>
              </div>
            </figure>

            <div className="card-body p-5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
              <h2 className="font-display font-bold text-base leading-tight line-clamp-2">{product.name}</h2>
              <StarRating rating={product.rating} />
              <div className="flex items-center justify-between mt-3">
                <span className="text-2xl font-black text-primary">${product.price}</span>
                <Link
                  href={`/products/${product.id}`}
                  className="btn btn-primary btn-sm rounded-xl text-white shadow-md shadow-primary/30 hover:shadow-primary/50 transition-all"
                >
                  {t("popular.viewDetails")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 opacity-60">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl font-medium">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
