"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import products from "@/data/products.json";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

// Star Rating component
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

// Hero Slider
const heroSlides = [
  {
    badge: "🔥 Summer Sale Now Live",
    title1: "Your Ultimate",
    title2: "Summer Store",
    subtitle: "Discover sunglasses, outfits, skincare & beach accessories — all in one place.",
    bg: "from-orange-400/20 via-amber-300/20 to-yellow-200/20",
  },
  {
    badge: "🌊 Beach Ready",
    title1: "Hot Deals",
    title2: "Just for You",
    subtitle: "Up to 50% off on your favorite summer essentials. Limited time offer!",
    bg: "from-sky-400/20 via-cyan-300/20 to-teal-200/20",
  },
  {
    badge: "☀️ New Arrivals",
    title1: "Fresh Looks",
    title2: "This Season",
    subtitle: "Explore our newest collection of summer fashion, skincare, and beach gear.",
    bg: "from-pink-400/20 via-rose-300/20 to-orange-200/20",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const popularProducts = products.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const brands = [
    { name: "SunShade Pro", icon: "🕶️", desc: "Premium eyewear since 2005" },
    { name: "CoastalWear", icon: "👗", desc: "Sustainable summer fashion" },
    { name: "SkinGuard", icon: "🧴", desc: "Dermatologist approved skincare" },
    { name: "BeachBliss", icon: "🏖️", desc: "Beach accessories & floats" },
  ];

  const tips = [
    { icon: "💧", key: "tips.tip1", color: "bg-sky-50 dark:bg-sky-950/30 border-sky-200" },
    { icon: "☀️", key: "tips.tip2", color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200" },
    { icon: "👕", key: "tips.tip3", color: "bg-green-50 dark:bg-green-950/30 border-green-200" },
    { icon: "👓", key: "tips.tip4", color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200" },
  ];

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[activeSlide].bg} transition-all duration-1000`} />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fadeInUp">
              <div className="badge badge-primary badge-lg gap-2 mb-6 shadow-lg text-white px-4 py-3 text-sm font-medium">
                {heroSlides[activeSlide].badge}
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-black leading-tight mb-6">
                <span className="block">{heroSlides[activeSlide].title1}</span>
                <span className="text-gradient block">{heroSlides[activeSlide].title2}</span>
              </h1>
              <p className="text-lg opacity-70 mb-8 max-w-md leading-relaxed">
                {heroSlides[activeSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn btn-primary btn-lg rounded-2xl text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all">
                  {t("hero.cta1")} →
                </Link>
                <Link href="/products" className="btn btn-outline btn-lg rounded-2xl hover:btn-primary transition-all">
                  {t("hero.cta2")}
                </Link>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-3 mt-10">
                {[
                  { label: t("hero.offer1"), sub: t("hero.offer1sub"), color: "bg-primary text-white" },
                  { label: t("hero.offer2"), sub: t("hero.offer2sub"), color: "bg-accent text-neutral" },
                  { label: t("hero.offer3"), sub: t("hero.offer3sub"), color: "bg-success text-white" },
                ].map((badge, i) => (
                  <div key={i} className={`${badge.color} rounded-2xl px-4 py-2 text-center shadow-lg`}>
                    <div className="font-bold text-sm">{badge.label}</div>
                    <div className="text-xs opacity-80">{badge.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className="relative hidden lg:block animate-fadeInUp animate-delay-200">
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product, i) => (
                  <div
                    key={product.id}
                    className={`card-hover rounded-3xl overflow-hidden shadow-xl ${i === 1 ? "mt-8" : ""} ${i === 3 ? "-mt-4" : ""}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={220}
                      className="w-full h-44 object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div>
                    <div className="text-xs font-bold">8+ Products</div>
                    <div className="text-xs opacity-60">Ready to ship</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-12 justify-center lg:justify-start">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR PRODUCTS ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 animate-fadeInUp">
          <div className="badge badge-accent badge-lg mb-4 text-neutral font-semibold px-4">⭐ {t("popular.title")}</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">
            {t("popular.title")}
          </h2>
          <p className="mt-3 opacity-60 text-lg">{t("popular.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {popularProducts.map((product, i) => (
            <div
              key={product.id}
              className={`card bg-base-100 shadow-xl border border-base-200 card-hover rounded-3xl overflow-hidden animate-fadeInUp`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <figure className="relative overflow-hidden h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <div className="badge badge-primary text-white shadow">{product.category}</div>
                </div>
              </figure>
              <div className="card-body p-5">
                <h3 className="card-title font-display text-lg font-bold line-clamp-1">{product.name}</h3>
                <p className="text-sm opacity-60 mb-1">{product.brand}</p>
                <StarRating rating={product.rating} />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-primary btn-sm rounded-xl text-white shadow-lg shadow-primary/30"
                  >
                    {t("popular.viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn btn-outline btn-primary btn-lg rounded-2xl">
            View All Products →
          </Link>
        </div>
      </section>

      {/* ===== SUMMER CARE TIPS ===== */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="badge badge-secondary badge-lg mb-4 font-semibold px-4">💡 Tips</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">{t("tips.title")}</h2>
            <p className="mt-3 opacity-60 text-lg">{t("tips.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div
                key={i}
                className={`rounded-3xl p-6 border-2 ${tip.color} card-hover animate-fadeInUp`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{t(`${tip.key}.title`)}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{t(`${tip.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP BRANDS ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="badge badge-warning badge-lg mb-4 text-neutral font-semibold px-4">🏷️ Brands</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">{t("brands.title")}</h2>
          <p className="mt-3 opacity-60 text-lg">{t("brands.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-200 card-hover rounded-3xl p-8 text-center shadow-lg animate-fadeInUp cursor-pointer"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="text-5xl mb-4">{brand.icon}</div>
              <h3 className="font-display font-bold text-xl mb-2">{brand.name}</h3>
              <p className="text-sm opacity-60">{brand.desc}</p>
              <div className="mt-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3 h-3 star-filled" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 mx-4 lg:mx-8 rounded-3xl sun-gradient mb-16">
        <div className="text-center text-white px-4">
          <h2 className="font-display text-4xl lg:text-5xl font-black mb-4">
            Ready for Summer? ☀️
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Shop our curated collection and make this your best summer yet.
          </p>
          <Link href="/products" className="btn btn-lg rounded-2xl bg-white text-primary hover:bg-white/90 font-bold shadow-xl">
            Shop All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
