# ITX Mobile Device Store - Frontend Test

A responsive SPA for browsing mobile devices, built with React 19, TypeScript and a feature-oriented architecture.

![Store Demo](./demo-store.gif)

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
- **Testing:** Jest + React Testing Library + Cypress

---

## What is implemented

- Product list page with responsive grid and rich card UI
- Product detail page with options, specs and add-to-cart flow
- Search with normalized multi-term matching across brand and model
- Cart state persisted in local storage so it survives reloads
- **Network Resilience:** Robust API repository layer with custom strict timeouts (`Promise.race`), automatic retries for network failures, and defensive programming against native `fetch` hanging bugs.
- Client-side cache for product data with TTL-based invalidation
- React Error Boundary at the root level to prevent app crashes and display fallback UI
- **Advanced UX Patterns:** Skeletons for loading states, auto ScrollToTop on navigation, and dynamic document titles for SEO.
- **Micro-interactions:** Usage of the experimental View Transitions API for fluid image animations between list and details pages.
- **Performance & Accessibility:** Native `loading="lazy"` on below-the-fold images, semantic HTML5 structure, and a highly optimized critical rendering path to ensure excellent Core Web Vitals.

---

## Testing

The project implements a comprehensive testing strategy covering the pyramid from unit to E2E:

### Unit & Integration Tests (Jest + RTL)
Current status: **8 test suites and 30+ tests** covering business logic and UI behavior.
- **Domain & App:** Use case tests, Mapper transformations.
- **Infrastructure:** API repository logic (timeouts, retries), Cache management.
- **Presentation:** Component rendering, Search filtering interactions.

### End-to-End Tests (Cypress)
A complete purchase flow is automated with Cypress, testing the critical path as a real user would:
1. Search and filter a device.
2. Select options (Color, Storage).
3. Add to cart and verify cart persistence.

Make sure the app is running (`npm start`) before executing the tests.
```bash
# Run tests headlessly
npm run test:e2e

# Open Cypress UI for visual debugging
npm run cypress:open
```

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
- **Error Handling & Network Edge Cases:** Instead of relying solely on the native `AbortController` (which can fail silently in certain browser configurations or under aggressive extensions), a defensive `withTimeout` wrapper using `Promise.race` was implemented. This guarantees that UI loading states never hang indefinitely and the retry policy is always respected.
- **State Management:** The global state (e.g., shopping cart) is managed using React Context.
- **Styling (CSS Modules):** CSS Modules were chosen over CSS-in-JS (like Styled Components) or utility-first frameworks (like Tailwind) to avoid extra dependencies, ensure local scope without class name collisions, and demonstrate proficiency with pure CSS.
- **Custom Build Setup (Webpack & Babel):** The project is built entirely from scratch to demonstrate a deep understanding of the modern JavaScript build pipeline, avoiding black-box configurations (like Create-React-App) and ensuring full control over optimization and bundling.
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
- **Image Optimization:** Serve WebP/AVIF thumbnails from the backend or an Image CDN to reduce network payload and improve LCP.
- Continue refining the visual system with more shared tokens and reusable UI patterns.
- Improve accessibility gradually with better keyboard support and contrast checks.

---

## Git Strategy & Versioning
- **Trunk-Based Development:** Given the scope and timeline of this technical test, a Trunk-Based approach was chosen, committing directly to `main` to maintain a fast and continuous iteration cycle.
- **Release Tagging:** The final version submitted for evaluation is marked with the `v1.0.0` tag.

