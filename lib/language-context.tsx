"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", bn: "হোম" },
  "nav.products": { en: "Products", bn: "পণ্যসমূহ" },
  "nav.myProfile": { en: "My Profile", bn: "আমার প্রোফাইল" },
  "nav.login": { en: "Login", bn: "লগইন" },
  "nav.register": { en: "Register", bn: "নিবন্ধন" },
  "nav.logout": { en: "Logout", bn: "লগআউট" },
  "nav.tagline": { en: "Summer Essentials", bn: "গ্রীষ্মের সেরা পণ্য" },

  // Hero
  "hero.badge": { en: "🔥 Summer Sale Now Live", bn: "🔥 গ্রীষ্মকালীন সেল চলছে" },
  "hero.title1": { en: "Your Ultimate", bn: "আপনার সেরা" },
  "hero.title2": { en: "Summer Store", bn: "গ্রীষ্মের দোকান" },
  "hero.subtitle": { en: "Discover sunglasses, outfits, skincare & beach accessories — all in one place.", bn: "সানগ্লাস, পোশাক, স্কিনকেয়ার ও বিচ আনুষঙ্গিক — সব এক জায়গায় পাওয়া যাচ্ছে।" },
  "hero.cta1": { en: "Shop Now", bn: "এখনই কিনুন" },
  "hero.cta2": { en: "View All Products", bn: "সব পণ্য দেখুন" },
  "hero.offer1": { en: "50% OFF", bn: "৫০% ছাড়" },
  "hero.offer1sub": { en: "Summer Sale", bn: "গ্রীষ্মের সেল" },
  "hero.offer2": { en: "Free Ship", bn: "ফ্রি ডেলিভারি" },
  "hero.offer2sub": { en: "Orders $40+", bn: "৪০$ এর উপরে" },
  "hero.offer3": { en: "Hot Deals 🔥", bn: "গরম ডিল 🔥" },
  "hero.offer3sub": { en: "Limited Time", bn: "সীমিত সময়" },

  // Popular Products
  "popular.title": { en: "Popular Products", bn: "জনপ্রিয় পণ্য" },
  "popular.subtitle": { en: "Our summer bestsellers — loved by thousands", bn: "হাজারো মানুষের পছন্দের গ্রীষ্মকালীন পণ্য" },
  "popular.viewDetails": { en: "View Details", bn: "বিস্তারিত দেখুন" },
  "popular.rating": { en: "Rating", bn: "রেটিং" },

  // Care Tips
  "tips.title": { en: "Summer Care Tips", bn: "গ্রীষ্মকালীন যত্নের টিপস" },
  "tips.subtitle": { en: "Stay healthy, hydrated, and glowing all season long", bn: "সারা মৌসুম সুস্থ, সতেজ ও উজ্জ্বল থাকুন" },
  "tips.tip1.title": { en: "Hydrate Always", bn: "সবসময় পানি পান করুন" },
  "tips.tip1.desc": { en: "Drink at least 8-10 glasses of water daily. Carry a reusable bottle everywhere you go.", bn: "প্রতিদিন কমপক্ষে ৮-১০ গ্লাস পানি পান করুন। সর্বদা পুনর্ব্যবহারযোগ্য বোতল সঙ্গে রাখুন।" },
  "tips.tip2.title": { en: "Apply Sunscreen", bn: "সানস্ক্রিন লাগান" },
  "tips.tip2.desc": { en: "Use SPF 30+ sunscreen 20 minutes before going out. Reapply every 2 hours in direct sunlight.", bn: "বের হওয়ার ২০ মিনিট আগে SPF 30+ সানস্ক্রিন লাগান। সরাসরি রোদে প্রতি ২ ঘণ্টায় আবার লাগান।" },
  "tips.tip3.title": { en: "Light Clothing", bn: "হালকা পোশাক পরুন" },
  "tips.tip3.desc": { en: "Opt for breathable fabrics like linen and cotton. Loose fits help air circulate and keep you cool.", bn: "লিনেন ও তুলার মতো শ্বাসযোগ্য কাপড় বেছে নিন। ঢিলেঢালা পোশাক বায়ু চলাচল করতে দেয়।" },
  "tips.tip4.title": { en: "Protect Your Eyes", bn: "চোখ রক্ষা করুন" },
  "tips.tip4.desc": { en: "Wear UV-blocking sunglasses every time you step outside. Your eyes need protection too!", bn: "বাইরে যাওয়ার সময় UV-প্রতিরোধী সানগ্লাস পরুন। আপনার চোখেরও সুরক্ষা দরকার!" },

  // Brands
  "brands.title": { en: "Top Brands", bn: "শীর্ষ ব্র্যান্ড" },
  "brands.subtitle": { en: "Trusted by summer lovers worldwide", bn: "বিশ্বজুড়ে গ্রীষ্মপ্রেমীদের বিশ্বস্ত" },

  // Products Page
  "products.title": { en: "All Products", bn: "সকল পণ্য" },
  "products.subtitle": { en: "Everything you need for the perfect summer", bn: "নিখুঁত গ্রীষ্মের জন্য আপনার প্রয়োজনীয় সব কিছু" },
  "products.filter": { en: "Filter by Category", bn: "ক্যাটাগরি অনুযায়ী ফিল্টার করুন" },
  "products.all": { en: "All", bn: "সব" },

  // Product Detail
  "detail.brand": { en: "Brand", bn: "ব্র্যান্ড" },
  "detail.category": { en: "Category", bn: "ক্যাটাগরি" },
  "detail.stock": { en: "In Stock", bn: "স্টকে আছে" },
  "detail.outStock": { en: "Out of Stock", bn: "স্টকে নেই" },
  "detail.addCart": { en: "Add to Cart", bn: "কার্টে যোগ করুন" },
  "detail.buyNow": { en: "Buy Now", bn: "এখনই কিনুন" },
  "detail.description": { en: "Description", bn: "বিবরণ" },
  "detail.back": { en: "Back to Products", bn: "পণ্যে ফিরে যান" },

  // Auth
  "auth.loginTitle": { en: "Welcome Back!", bn: "স্বাগতম!" },
  "auth.loginSub": { en: "Sign in to your SunCart account", bn: "আপনার সানকার্ট অ্যাকাউন্টে সাইন ইন করুন" },
  "auth.email": { en: "Email", bn: "ইমেইল" },
  "auth.password": { en: "Password", bn: "পাসওয়ার্ড" },
  "auth.login": { en: "Login", bn: "লগইন" },
  "auth.noAccount": { en: "Don't have an account?", bn: "অ্যাকাউন্ট নেই?" },
  "auth.registerLink": { en: "Register here", bn: "এখানে নিবন্ধন করুন" },
  "auth.orGoogle": { en: "Or continue with", bn: "অথবা চালিয়ে যান" },
  "auth.googleBtn": { en: "Continue with Google", bn: "Google দিয়ে চালিয়ে যান" },
  "auth.registerTitle": { en: "Create Account", bn: "অ্যাকাউন্ট তৈরি করুন" },
  "auth.registerSub": { en: "Join SunCart and shop the best of summer", bn: "সানকার্টে যোগ দিন ও গ্রীষ্মের সেরা পণ্য কিনুন" },
  "auth.name": { en: "Full Name", bn: "পুরো নাম" },
  "auth.photoUrl": { en: "Photo URL", bn: "ছবির URL" },
  "auth.register": { en: "Register", bn: "নিবন্ধন করুন" },
  "auth.hasAccount": { en: "Already have an account?", bn: "ইতিমধ্যে অ্যাকাউন্ট আছে?" },
  "auth.loginLink": { en: "Login here", bn: "এখানে লগইন করুন" },

  // Profile
  "profile.title": { en: "My Profile", bn: "আমার প্রোফাইল" },
  "profile.name": { en: "Name", bn: "নাম" },
  "profile.email": { en: "Email", bn: "ইমেইল" },
  "profile.update": { en: "Update Information", bn: "তথ্য আপডেট করুন" },
  "profile.updateTitle": { en: "Update Profile", bn: "প্রোফাইল আপডেট করুন" },
  "profile.updateBtn": { en: "Save Changes", bn: "পরিবর্তন সংরক্ষণ করুন" },

  // Footer
  "footer.tagline": { en: "Your summer, elevated.", bn: "আপনার গ্রীষ্ম, আরও সুন্দর।" },
  "footer.contact": { en: "Contact Us", bn: "যোগাযোগ করুন" },
  "footer.privacy": { en: "Privacy Policy", bn: "গোপনীয়তা নীতি" },
  "footer.rights": { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },
  "footer.social": { en: "Follow Us", bn: "আমাদের অনুসরণ করুন" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
