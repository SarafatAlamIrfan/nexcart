# NexCart 🛒

**Discover Better. Shop Smarter.**

NexCart is a modern, high-performance e-commerce product discovery and inventory management application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Firebase Authentication**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-ffca28?style=flat&logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

- 🏠 **Landing Page** — Hero section, Featured Products carousel, Category highlights, Value propositions, Customer testimonials, and Footer.
- 🔍 **Product Discovery (`/items`)** — Real-time search query matching, multi-category selection, price range filtering, and price/rating sorting.
- 📂 **Category Browsing (`/categories`)** — Dedicated category directory with visual highlights for Electronics, Fashion, Home & Living, and Accessories.
- 📦 **Dynamic Product Details (`/items/[id]`)** — Dynamic routing with metadata generation, product specifications, image fallback handling, and related product recommendations.
- ➕ **Add Products (`/items/add`)** — Form with input validation to create new products that persist across sessions.
- ⚙️ **Manage Products (`/items/manage`)** — Dashboard to review inventory, inspect details, and delete items (seed or user-added) with a confirmation dialog.
- 🔐 **Firebase Authentication** — Email/Password registration & login + Google Sign-In with persistent session state.
- 🛡️ **Protected Routes** — Client-side route guard automatically redirecting unauthenticated users to `/login`.
- 💾 **LocalStorage Persistence** — Keeps user-added and deleted product states across page refreshes without needing a backend database.
- 📱 **Fully Responsive** — Optimized across mobile (375px), tablet (768px), laptop (1024px), and desktop (1440px+).
- 🔔 **Toast Feedback** — Interactive notifications powered by Sonner for cart actions, auth status, and product operations.

---

## 🛠 Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components & Turbopack |
| **UI Library** | [React 19](https://react.dev/) | React Server Components & Client Hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type-safety across components and data |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern styling with `@tailwindcss/postcss` |
| **Authentication** | [Firebase SDK v13](https://firebase.google.com/) | Firebase Auth (Email/Password & Google OAuth) |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent modern SVG icons |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Smooth toast notification system |
| **Fonts** | Inter | Google Fonts via `next/font` |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `20.9.0` or higher (required by Next.js 16)
- **Package Manager**: `npm` (v10+ / v11) or `pnpm` / `yarn`
- **Firebase Account**: Required for authentication features (optional for browsing)

### 1. Clone the Repository

```bash
git clone https://github.com/SarafatAlamIrfan/nexcart.git
cd nexcart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Firebase credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** The application gracefully handles missing Firebase configuration. All browsing, searching, and filtering features function out-of-the-box. A setup banner will be shown on authentication pages until keys are provided.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
npm run build
npm run start
```

---

## 🔥 Firebase Setup Guide

1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g. `nexcart-app`).
3. Click **Add app** → **Web (</>)**.
4. Register the app and copy the `firebaseConfig` keys into your `.env.local`.
5. Under **Build** → **Authentication** in Firebase:
   - Click **Get Started**.
   - Under **Sign-in method**, enable **Email/Password**.
   - *(Optional)* Enable **Google** sign-in provider.
6. When deploying to production (e.g. Vercel), add your production domain under **Authentication** → **Settings** → **Authorized domains**.

---

## 📂 Project Structure

```
nexcart/
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # About NexCart page
│   │   ├── categories/     # Categories overview page
│   │   ├── items/
│   │   │   ├── [id]/       # Dynamic product detail page
│   │   │   ├── add/        # Protected: Add new product
│   │   │   ├── manage/     # Protected: Manage inventory
│   │   │   └── page.tsx    # All products discovery & filters
│   │   ├── login/          # User login page
│   │   ├── register/       # User registration page
│   │   ├── globals.css     # Tailwind CSS styles & design tokens
│   │   ├── layout.tsx      # Root layout (Navbar, Providers, Footer)
│   │   ├── not-found.tsx   # Custom 404 error page
│   │   └── page.tsx        # Homepage / Landing page
│   ├── components/         # Reusable UI components
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FirebaseConfigBanner.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx     # Firebase user state & auth helpers
│   │   └── ProductsContext.tsx # Product CRUD & LocalStorage sync
│   ├── data/
│   │   └── products.ts     # Initial seed product catalog
│   ├── lib/
│   │   └── firebase.ts     # Firebase client SDK initialization
│   └── types/
│       └── index.ts        # TypeScript data contracts & models
├── .env.example            # Environment variables template
├── eslint.config.mjs       # ESLint flat configuration
├── next.config.ts          # Next.js configuration (Remote image patterns)
├── package.json            # Project dependencies and build scripts
├── postcss.config.mjs      # PostCSS configuration for Tailwind v4
└── tsconfig.json           # TypeScript configuration
```

---

## 🗺 Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Homepage featuring hero banner, categories, and top products |
| `/items` | Public | Product catalog with real-time search, filters, and sorting |
| `/items/[id]` | Public | Dynamic product details with specs and related products |
| `/categories` | Public | Category gallery (Electronics, Fashion, Home, Accessories) |
| `/about` | Public | About the NexCart mission and features |
| `/login` | Public | Authentication page for existing users |
| `/register` | Public | Account registration page |
| `/items/add` | 🔒 Protected | Authenticated form to create new products |
| `/items/manage` | 🔒 Protected | Authenticated dashboard to manage and delete products |

---

## 💾 State & Persistence Strategy

- **Seed Catalog**: 12 diverse mock products loaded from `src/data/products.ts`.
- **User Products**: Stored under `nexcart_user_products` in browser `localStorage`.
- **Deleted Records**: Tracked under `nexcart_deleted_ids` in `localStorage` so deletion of seed and custom products persists across browser refreshes.
- **Client Cache**: Managed via `ProductsContext`, providing instant optimistic updates without page reloads.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **Add New…** → **Project**.
3. Import your **`nexcart`** repository.
4. In the **Environment Variables** section, add your Firebase keys:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Click **Deploy**. Vercel will build and assign your production URL.
6. **Important**: Add your assigned Vercel URL (e.g. `nexcart.vercel.app`) to your **Firebase Console → Authentication → Settings → Authorized Domains**.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
