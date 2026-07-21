# ITX Mobile Device Store - Frontend Test

A responsive SPA for browsing mobile devices, built with React 19, TypeScript and a feature-oriented architecture.

---

## Quick start

### Requirements
- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

---

## Available scripts

- `npm start` — starts the webpack dev server.
- `npm run build` — builds the production bundle.
- `npm test` — runs the Jest test suite.
- `npm run lint` — runs ESLint over the source tree.

---

## Architecture

The app follows a layered, feature-based structure with clear separation between domain, application, infrastructure and presentation concerns.

```text
Presentation
  └─ React components, hooks, pages, styles
Application
  └─ use cases and orchestration logic
Domain
  └─ entities, repositories and core business rules
Infrastructure
  └─ API repositories, mappers, cache and local persistence
```

Core features are organized under `src/features/product` and `src/features/cart`.

---

## Project structure

A practical overview of the main folders:

```text
src/
├── App.tsx                # root app shell and route setup
├── index.css              # global theme tokens and base styles
├── main.tsx               # app bootstrap
├── routes.tsx             # route definitions
├── features/
│   ├── cart/              # cart domain, use case, API integration and context
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── product/           # product listing/details flow
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       │   ├── cache/
│       │   └── __tests__/
│       └── presentation/
│           ├── components/
│           ├── hooks/
│           ├── pages/
│           └── utils/
├── shared/                # shared UI, config, context and i18n
│   ├── components/
│   ├── config/
│   ├── context/
│   └── i18n/
```


---

## Technical stack

- React 19 + TypeScript
- React Router 7
- CSS Modules
- Webpack 5 + Babel
- Jest + React Testing Library

---

## What is implemented

- Product list page with responsive grid and rich card UI
- Product detail page with options, specs and add-to-cart flow
- Search with normalized multi-term matching across brand and model
- Cart state persisted in local storage so it survives reloads
- Robust repository layer with timeout/abort handling and retry support
- Improved empty/error/loading states and polished UX feedback
- Client-side cache for product data with TTL-based invalidation

---

## Testing

Current status: 8 test suites and 30+ tests covering use cases, repository logic, mapping, UI behavior and search filtering.

Examples:
- use case tests
- API repository and mapper tests
- cache tests
- component tests for search and product list behavior

---

## Run locally

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

## Technical Decisions & Trade-offs

During the development of this technical test, several architectural and technical decisions were made to balance clean code practices with pragmatism:

- **Architecture (Feature-Sliced Design):** The application is structured around domain features (`product`, `cart`). Within each feature, responsibilities are strictly separated into *Domain*, *Application*, *Infrastructure*, and *Presentation* layers. This ensures that UI components are decoupled from business logic and API contracts, making the app highly scalable and testable.
- **State Management:** The global state (e.g., shopping cart) is managed using React Context.
- **Styling (CSS Modules):** CSS Modules were chosen over CSS-in-JS (like Styled Components) or utility-first frameworks (like Tailwind) to avoid extra dependencies, ensure local scope without class name collisions, and demonstrate proficiency with pure CSS.
- **Custom Build Setup (Webpack & Babel):** The project is intentionally built from scratch using Webpack and Babel.
- **Zero-Dependency Approach:** The core logic is built using pure React (and `react-router-dom` for navigation) without relying on external libraries for fetching, data formatting, or complex UI components.
- **Testing Strategy:** Jest and React Testing Library were chosen to focus on testing behavior from the user's perspective rather than implementation details, ensuring the UI behaves correctly under different states.

---

## Assumptions

Due to the open nature of the requirements, the following assumptions were made:
- **Cart Persistence:** Since there are no specific API endpoints to manage the user's cart on the server, the cart state is persisted exclusively on the client side using `localStorage`.
- **Search Filtering:** The search functionality filters the data loaded in memory. It is assumed that the initial product list endpoint returns the entire catalog needed for a comprehensive client-side search across brand and model.

---

## Notes and next improvements

A few sensible follow-ups that fit this project well:
- Add pagination or infinite scroll if the catalog grows beyond the current demo size.
- Introduce lazy loading for product images and route-level splitting if performance becomes a concern.
- Continue refining the visual system with more shared tokens and reusable UI patterns.
- Improve accessibility gradually with better keyboard support and contrast checks.
- Add a bit more polish around loading and cart feedback to make the experience feel more complete.

---

