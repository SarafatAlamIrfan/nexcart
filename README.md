# NexCart 🛒

**Discover Better. Shop Smarter.**

NexCart is a modern, premium e-commerce product discovery and management application built with Next.js App Router, Firebase Authentication, and Tailwind CSS.

---

## ✨ Features

- 🏠 **Landing Page** — Hero, Featured Products, Categories, Why NexCart, Testimonials, Footer
- 🔍 **Product Discovery** — Search, category & price filters with combined filtering
- 📦 **Product Details** — Full detail pages with specs, related products, and dynamic routing
- ➕ **Add Products** — Authenticated form to add products that persist across sessions
- ⚙️ **Manage Products** — View, and delete any product (seed or user-added) with confirmation
- 🔐 **Firebase Auth** — Email/password registration & login + Google Sign-In
- 🛡️ **Protected Routes** — Client-side route protection for authenticated-only pages
- 💾 **LocalStorage Persistence** — Products survive page refreshes
- 📱 **Responsive Design** — Works on 375px, 768px, 1024px, 1440px viewports
- 🎨 **Premium UI** — Inter font, Indigo accent, smooth animations, glassmorphism elements
- 🔔 **Toast Notifications** — Real-time feedback via Sonner
- ♿ **Accessible** — Semantic HTML, ARIA attributes, keyboard navigation

---

## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework & Routing |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| Firebase Auth | Authentication |
| React Context API | State Management |
| LocalStorage | Product Persistence |
| Lucide React | Icons |
| Sonner | Toast Notifications |
| Google Fonts (Inter) | Typography |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project (for authentication)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nexcart

# Install dependencies
npm install
```

### Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Firebase credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** The app works without Firebase credentials — all routes except auth will function normally. A configuration banner will be shown on login/register pages.

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Click **Add app** → **Web app** (</> icon)
4. Register the app and copy the configuration values
5. In the Firebase Console, go to **Authentication** → **Sign-in method**
6. Enable **Email/Password** provider
7. (Optional) Enable **Google** provider for Google Sign-In
8. Paste the config values into your `.env.local` file

---

## 📂 Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── items/
│   │   ├── [id]/       # Dynamic product detail
│   │   ├── add/        # Protected: Add product
│   │   └── manage/     # Protected: Manage products
│   │   └── page.tsx    # Products listing
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── not-found.tsx   # 404 page
│   └── page.tsx        # Landing page
├── components/
│   ├── ConfirmDialog.tsx
│   ├── EmptyState.tsx
│   ├── FirebaseConfigBanner.tsx
│   ├── Footer.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ProtectedRoute.tsx
├── context/
│   ├── AuthContext.tsx  # Firebase auth state
│   └── ProductsContext.tsx  # Product CRUD + LocalStorage
├── data/
│   └── products.ts     # 12 seed products
├── lib/
│   └── firebase.ts     # Firebase initialization
└── types/
    └── index.ts        # TypeScript interfaces
```

---

## 🗺 Route Summary

| Route | Protection | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/items` | Public | Product listing with filters |
| `/items/[id]` | Public | Product detail page |
| `/about` | Public | About NexCart |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/items/add` | 🔒 Protected | Add a product |
| `/items/manage` | 🔒 Protected | Manage all products |

---

## 💾 Product Persistence

Products are persisted in the browser's `localStorage` using two keys:

- `nexcart_user_products` — products added by the user
- `nexcart_deleted_ids` — IDs of products that have been deleted

The 12 seed products are always available in-memory. User-added products are stored in LocalStorage. Deleted product IDs are tracked so deletions persist on refresh.

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and import your GitHub repository
3. In the project settings, add all environment variables from `.env.local`
4. Deploy — Vercel automatically handles Next.js builds

> **Live Demo:** _Add your Vercel URL here after deployment_
> **GitHub:** _Add your GitHub repository URL here_

---

## 🔒 Route Protection Note

Route protection in NexCart is implemented **client-side** using React Context and `useEffect`. This means:

- Unauthenticated users are redirected to `/login` when they try to access protected routes
- The protected content is not rendered until authentication is confirmed
- **This is NOT server-side authorization.** For production applications with sensitive data, always implement server-side validation as well.

---

## 📝 License

MIT License — feel free to use this project as a template or learning resource.
