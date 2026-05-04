"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useLanguage } from "@/lib/language-context";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const { t, language, toggleLanguage } = useLanguage();
  const [theme, setTheme] = useState<"suncart_light" | "suncart_dark">("suncart_light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("suncart_theme") as "suncart_light" | "suncart_dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "suncart_light" ? "suncart_dark" : "suncart_light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("suncart_theme", newTheme);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
  };

  const navLinks = (
    <>
      <li><Link href="/" className="font-medium hover:text-primary transition-colors">{t("nav.home")}</Link></li>
      <li><Link href="/products" className="font-medium hover:text-primary transition-colors">{t("nav.products")}</Link></li>
      {session && (
        <li><Link href="/my-profile" className="font-medium hover:text-primary transition-colors">{t("nav.myProfile")}</Link></li>
      )}
    </>
  );

  return (
    <nav className={`navbar sticky top-0 z-50 px-4 lg:px-8 transition-all duration-300 ${
      scrolled
        ? "bg-base-100/95 backdrop-blur-md shadow-md"
        : "bg-base-100"
    }`}>
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile hamburger */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
            {navLinks}
          </ul>
        </div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl sun-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white text-lg font-black">S</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-xl text-gradient">SunCart</span>
            <p className="text-[10px] text-base-content/50 leading-none -mt-0.5">{t("nav.tagline")}</p>
          </div>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="btn btn-ghost btn-sm rounded-xl font-semibold text-xs border border-base-300 hover:border-primary hover:text-primary transition-all"
          title="Toggle Language"
        >
          {language === "en" ? "বাং" : "EN"}
        </button>

        {/* Dark Mode Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-sm btn-circle">
          <input type="checkbox" checked={theme === "suncart_dark"} onChange={toggleTheme} />
          {/* Sun icon */}
          <svg className="swap-off fill-current w-5 h-5 text-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          {/* Moon icon */}
          <svg className="swap-on fill-current w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>

        {/* Auth section */}
        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse" />
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name || "User"} width={36} height={36} className="rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full sun-gradient flex items-center justify-center text-white font-bold text-sm">
                    {(session.user.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
              <li className="menu-title text-xs px-3 pt-1 opacity-60">{session.user.email}</li>
              <li><Link href="/my-profile" className="hover:text-primary">{t("nav.myProfile")}</Link></li>
              <li>
                <button onClick={handleLogout} className="text-error hover:bg-error/10">
                  {t("nav.logout")}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm rounded-xl font-medium hidden sm:flex">
              {t("nav.login")}
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm rounded-xl font-medium text-white shadow-lg shadow-primary/30">
              {t("nav.register")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
