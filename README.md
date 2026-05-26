# Shape Up Fitness Website

A responsive website for Shape Up Fitness, a fitness center in Akure, Nigeria. Built with React, TypeScript, Tailwind CSS, and Convex.

**Live site:** [shapeupfitnessonline.com](https://shapeupfitnessonline.com)

---

## Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- Framer Motion (animations)
- Hugeicons (icon library)
- Radix UI primitives + shadcn/ui components
- goey-toast (notifications)
- Recharts (dashboard charts)

### Backend & Database
- Convex (realtime database, server functions, file storage)
- TinyPNG API (image compression)
- ImgBB API (image CDN hosting)

---

## Project Structure

```
src/
├── pages/              # Route page components
│   ├── Admin.tsx       # Admin shell (auth + layout)
│   ├── Gallery.tsx     # Public gallery
│   ├── Services.tsx    # Services page
│   └── About.tsx       # About + team
├── components/
│   ├── admin/          # Admin panel components
│   │   ├── AdminLogin.tsx / AdminSidebar.tsx
│   │   ├── DashboardTab.tsx / ProductsTab.tsx
│   │   ├── GalleryTab.tsx / SiteImagesTab.tsx
│   │   ├── LabeledImageManager.tsx / SectionImageManager.tsx
│   │   ├── ProductForm.tsx / ProductsTable.tsx
│   │   ├── CategoryManager.tsx / CategoryPanel.tsx
│   │   ├── ResponsiveModal.tsx / ConfirmModal.tsx
│   │   └── ImageDropZone.tsx / uploadFileToConvex.ts
│   ├── home/           # Home page sections
│   ├── shop/           # Shop components
│   └── ui/             # Reusable UI primitives
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── lib/                # Utilities
│   ├── images.ts       # Responsive image URL helper
│   ├── crypto.ts       # Cookie helpers (set/get/erase)
│   └── utils.ts        # Tailwind class merge utility
└── convex/             # Convex backend (database schema, queries, mutations, actions)
    ├── schema.ts       # Database schema
    ├── auth.ts         # Admin login, verify, logout
    ├── siteImages.ts   # Site images CRUD
    ├── products.ts     # Products CRUD
    ├── categories.ts   # Image categories
    ├── upload.ts       # Upload pipeline (TinyPNG → ImgBB)
    └── seed.ts         # Mock data seeder
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation & Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in your deployment URLs:

   ```bash
   cp .env.example .env.local
   ```

3. Start the Convex development backend:

   ```bash
   npx convex dev
   ```

4. Set the required environment variables in your Convex cloud environment:

   ```bash
   npx convex env set TINYPNG_API_KEY your_tinypng_api_key
   npx convex env set IMGBB_API_KEY your_imgbb_api_key
   npx convex env set ADMIN_PASSWORD your_admin_password
   ```

5. Start the Vite development server:

   ```bash
   npm run dev
   ```

6. (Optional) Seed the database with mock data:

   ```bash
   npx convex run seed:run
   ```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home page with hero, services, featured products, testimonials |
| `/about` | About us, mission, team members |
| `/services` | Services and training programs |
| `/pricing` | Membership pricing plans |
| `/gallery` | Filterable facility and workout gallery |
| `/contact` | Contact info, location, hours |
| `/shop` | Product listing |
| `/shop/:id` | Product detail with WhatsApp checkout |
| `/favorites` | Favorited products |
| `/admin` | Admin dashboard |
| `/admin/dashboard` | Admin dashboard (default) |
| `/admin/products` | Product management (CRUD, reorder) |
| `/admin/gallery` | Gallery image management |
| `/admin/site` | Site images (hero, about, team, services) |

---

## Image Upload Pipeline

1. Admin uploads an image (max 10MB)
2. Image stored temporarily in Convex storage
3. TinyPNG compresses and resizes the image
4. Compressed image uploaded to ImgBB CDN
5. Final URL stored in Convex database
6. Temporary storage cleaned up

---

## Admin Panel

The admin panel is at `/admin`. Each tab is a separate route:

| Tab | Purpose |
| :-- | :------ |
| Dashboard | Overview statistics, charts |
| Products | Create, edit, reorder products with multi-image upload |
| Gallery | Manage gallery images with category filters and reorder |
| Site Images | Manage hero, about, team, services, and philosophy images |
| (Categories) | Product and gallery category management (accessible within Products/Gallery tabs) |

---

## Production Build

```bash
npm run build
```

Output is written to `dist/`.
