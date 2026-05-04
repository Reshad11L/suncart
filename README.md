# ☀️ SunCart – Summer Essentials Store

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

## 🌟 Key Features

- **🌅 Hero Banner / Slider** — Auto-rotating promotional banners with summer deals
- **🛍️ Product Catalog** — 8 summer products with category filtering
- **🔒 Protected Product Details** — Detailed view only accessible after login
- **🔐 Authentication (BetterAuth)** — Email/password & Google OAuth sign-in
- **👤 User Profile** — View your profile info (name, photo, email)
- **✏️ Update Profile** — Update name and profile photo via BetterAuth `updateUser`
- **🌙 Dark Mode Toggle** — Seamless light/dark theme switching with DaisyUI
- **🌐 English/Bengali Language Toggle** — Full UI translation between EN and বাংলা
- **📱 Fully Responsive** — Mobile, tablet, and desktop layouts
- **💡 Summer Care Tips** — Skincare, hydration, and sun-protection tips
- **🏷️ Top Brands Section** — Showcasing 4 featured summer brands
- **🎞️ Lottie Animations** — Smooth animations using lottie-react

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + DaisyUI
- **Authentication:** BetterAuth
- **Database:** SQLite (via Prisma) for local / PostgreSQL for production
- **Animations:** Lottie React
- **Toasts:** React Hot Toast

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router |
| `better-auth` | Authentication (email + Google OAuth) |
| `lottie-react` | Lottie animations (bonus npm package) |
| `react-hot-toast` | Toast notifications |
| `daisyui` | Component library & theme system |
| `tailwindcss` | Utility-first CSS |
| `@prisma/client` | Database ORM for BetterAuth |
| `react-fast-marquee` | Scrolling brand ticker |



## 📁 Project Structure

```
suncart/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (Navbar + Footer)
│   ├── globals.css           # Global styles
│   ├── login/page.tsx        # Login page
│   ├── register/page.tsx     # Register page
│   ├── products/
│   │   ├── page.tsx          # Products listing
│   │   └── [id]/page.tsx     # Product detail (protected)
│   ├── my-profile/
│   │   ├── page.tsx          # Profile page
│   │   └── update-info/page.tsx  # Update profile
│   └── api/auth/[...all]/route.ts  # BetterAuth handler
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── data/
│   └── products.json         # Product data
├── lib/
│   ├── auth.ts               # BetterAuth server config
│   ├── auth-client.ts        # BetterAuth client config
│   └── language-context.tsx  # EN/BN language context
└── prisma/
    └── schema.prisma         # Database schema
```

Made with ☀️ by **[Md. Rakibul Islam Reshad]** | Assignment: SunCart – Category A8-Jackfruit
