# ITX Mobile Device Store - Frontend Test

A responsive Single Page Application (SPA) e-commerce for mobile devices, built with React 19 and TypeScript.

This README documents how to run the project and how the implementation maps to the original Front‑End Test specification.

---

## Quick Start

### Requirements
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation

```bash
npm install
```

---

## Available Scripts

- `npm start` — Start development server (webpack dev server).
- `npm run build` — Build production bundle.
- `npm test` — Run unit tests (Jest).
- `npm run lint` — Run ESLint against `src/`.

---

## Architecture: Ports & Adapters (Hexagonal)

The project follows a Hexagonal (Ports & Adapters) architecture to keep domain logic decoupled from UI and infra.

```text
[ Presentation Layer ]  --->  [ Application Layer ]  --->  [ Domain Layer ]
(React, Custom Hooks)          (Use Cases / Flow)         (Entities & Ports)
         │                                                        ▲
         └───────────────────>  [ Infrastructure ]  ──────────────┘
                              (API Fetch, LocalStorage)
```

Core features are split by domain (`product`, `cart`) and follow domain/application/infrastructure/presentation layering.

---

## Project Structure (full)

```text
babel.config.js
eslint.config.mjs
package.json
package-lock.json
tsconfig.json
webpack.config.js
public/
  └── index.html
dist/ (build output)

src/
├── main.tsx
├── App.tsx
├── routes.tsx
├── index.css
├── global.d.ts
├── __mocks__/styleMock.js
├── assets/
├── shared/
│   ├── components/
│   │   ├── EmptyState.module.css
│   │   ├── EmptyState.tsx
│   │   ├── Header.module.css
│   │   ├── Header.tsx
│   │   ├── Skeleton.module.css
│   │   └── Skeleton.tsx
│   ├── config/
│   │   └── api.ts
│   ├── context/
│   │   └── BreadcrumbContext.tsx
│   └── i18n/
│       └── en.ts
|
├── features/
│   ├── cart/
│   │   ├── application/
│   │   │   └── AddToCartUseCase.ts
│   │   ├── domain/
│   │   │   ├── CartItem.ts
│   │   │   └── CartRepository.ts
│   │   ├── infrastructure/
│   │   │   ├── CartApiRepository.ts
│   │   │   └── CartApiResponse.ts
│   │   └── presentation/
│   │       └── CartContext.tsx
│   |
│   └── product/
│       ├── application/
│       │   ├── GetProductsUseCase.ts
│       │   └── GetProductUseCase.ts
│       │   └── __tests__/
│       │       ├── GetProductsUseCase.test.ts
│       │       └── GetProductUseCase.test.ts
│       ├── domain/
│       │   ├── Product.ts
│       │   └── ProductRepository.ts
│       ├── infrastructure/
│       │   ├── ProductApiRepository.ts
│       │   ├── ProductApiResponse.ts
│       │   ├── ProductMapper.ts
│       │   └── cache/
│       │       └── LocalStorageCache.ts
│       │   └── __tests__/
│       │       ├── ProductMapper.test.ts
│       │       └── LocalStorageCache.test.ts
│       └── presentation/
│           ├── components/
│           │   ├── ProductItem.module.css
│           │   ├── ProductItem.tsx
│           │   ├── SearchBar.module.css
│           │   ├── SearchBar.tsx
│           │   └── details/
│           │       ├── ProductOptions.module.css
│           │       ├── ProductOptions.tsx
│           │       ├── ProductSpecs.module.css
│           │       └── ProductSpecs.tsx
│           ├── hooks/
│           │   ├── useProducts.ts
│           │   └── useProductDetail.ts
│           └── pages/
│               ├── list/
│               │   ├── ProductListPage.module.css
│               │   └── ProductListPage.tsx
│               └── details/
│                   ├── ProductDetailsPage.module.css
│                   └── ProductDetailsPage.tsx
```

---

## Technical Stack

- React 19 + TypeScript
- React Router v7
- CSS Modules
- Webpack 5 + Babel
- Jest + React Testing Library

---

## Key Features

- Client‑side caching (1‑hour TTL) via `LocalStorageCache`.
- Defensive API parsing with `ProductMapper`.
- Real‑time search (brand/model).
- Accessible basics (`aria-` attributes) and responsive layouts.

---

## Testing

Status: 5 test suites · 31 tests (see `src/**/__tests__`)

Unit tests focus on mappers, cache logic and use case coordination.

---

## Conformance to Front‑End Test

- PLP (Product List Page): Implemented — responsive grid, search and navigation to PDP.
- PDP (Product Details Page): Implemented — image + details/actions columns and back link.
- Search: Real‑time filtering by brand/model implemented.
- Cart API: `POST /api/cart` integrated; response `count` persisted and shown in header.
- Cache: Client cache with 1‑hour TTL implemented.
- SPA routing: Implemented with React Router.
- Required scripts: Present in `package.json`.

---

## How to run (local)

```bash
npm install
npm start
# Open http://localhost:3000
```

Run tests:

```bash
npm test
```

Lint:

```bash
npm run lint
```

---

## Limitations & Next Steps

- Add E2E tests (Playwright/Cypress).
- Add CI (GitHub Actions) to run lint/test/build on PRs.
- Add screenshots or a `docs/` folder with UX notes.

---

