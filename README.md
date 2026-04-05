# FoodieHub 🍴

A modern recipe discovery web app built with React, TypeScript, and Tailwind CSS. Browse, search, filter, and save recipes from around the world — then process your order with a beautiful thank-you flow.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Routing | Wouter |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` |
| Animations | Framer Motion |
| State Management | Zustand (persisted to localStorage) |
| Server State | TanStack React Query |
| Toasts | Sonner |
| Icons | Lucide React |
| Build Tool | Vite 8 |
| Data Source | [DummyJSON Recipes API](https://dummyjson.com/recipes) |

---

## Features

- **Home page** — hero carousel with fade animation, featured recipes slider, recipe grid
- **Recipes page** — full listing with search, filter (cuisine, difficulty, meal type), sort, and pagination
- **Recipe Detail** — ingredients, step-by-step instructions, related recipes, add to cart / process to cook
- **Favourites** — save and manage favourite recipes with persistent state
- **Cart** — manage recipe quantities, order summary, proceed to cook
- **Thank You page** — animated order confirmation with cooking progress steps
- **Toast notifications** — for all add/remove/cart/cook actions via Sonner
- **Privacy Policy & Terms of Service** pages
- Fully responsive across mobile, tablet, and desktop

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/foodiehub.git
cd foodiehub
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://dummyjson.com/recipes
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

### Type Check

```bash
npm run typecheck
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Fixed navbar with scroll shadow
│   │   ├── Footer.tsx       # Footer with links and contact info
│   │   └── Logo.tsx         # Brand logo component
│   ├── shared/
│   │   └── RecipeCard.tsx   # Reusable recipe card with favourite/cart actions
│   └── ui/                  # shadcn/ui components
├── hooks/
│   └── use-recipes.ts       # React Query hooks for DummyJSON API
├── pages/
│   ├── Home.tsx             # Hero + featured slider + recipe grid
│   ├── Recipes.tsx          # Full recipe listing with filters and pagination
│   ├── RecipeDetail.tsx     # Individual recipe page
│   ├── Favourites.tsx       # Saved favourites
│   ├── Cart.tsx             # Cart management
│   ├── ThankYou.tsx         # Order confirmation page
│   ├── PrivacyPolicy.tsx    # Privacy policy
│   ├── Terms.tsx            # Terms of service
│   └── not-found.tsx        # 404 page
├── store/
│   └── useStore.ts          # Zustand store (cart + favourites)
├── types/
│   └── recipe.ts            # Zod schemas and TypeScript types
├── lib/
│   └── utils.ts             # cn() utility
├── App.tsx                  # Router and providers
├── main.tsx                 # Entry point
└── index.css                # Global styles + Tailwind v4 theme
```

---

## API

All recipe data is sourced from the free [DummyJSON API](https://dummyjson.com/recipes).

| Endpoint | Description |
|---|---|
| `GET /recipes?limit=N&skip=N` | Paginated recipe list |
| `GET /recipes/search?q=QUERY` | Search recipes |
| `GET /recipes/:id` | Single recipe detail |
| `GET /recipes/tag/:tag` | Recipes by tag |

