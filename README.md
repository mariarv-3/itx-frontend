# ITX Mobile Device Store - Frontend Test

A Single Page Application (SPA) for a mobile device store, developed as part of the ITX frontend technical challenge.

The main goal of the implementation is to keep the codebase maintainable and easy to evolve, applying a clear separation between business logic, data access and UI concerns.

---

## 🚀 Quick Start

### Requirements

* Node.js (v18 or higher recommended)
* npm

### Installation

```bash
npm install
```

### Run the application

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

### Run tests

```bash
npm test
```

### Production build

```bash
npm run build
```

The production bundle will be generated in the `dist` folder.

---

# 🏗️ Architecture

The project follows a feature-based structure inspired by **Hexagonal Architecture (Ports & Adapters)** and **Domain-Driven Design principles**.

The main idea is to keep external dependencies (React, API calls, browser storage) separated from the core application logic.

The codebase is organized into business features:

* `product`
* `cart`

Each feature contains its own layers:

### `domain/`

Contains the core models and repository contracts.

This layer does not depend on React or infrastructure details.

### `application/`

Contains the use cases that coordinate application flows.

Examples:

* `GetProductsUseCase`
* `GetProductUseCase`
* `AddToCartUseCase`

### `infrastructure/`

Contains implementations that interact with external systems:

* API repositories
* API response mappers
* LocalStorage cache implementation

### `presentation/`

Contains React-related code:

* Pages
* Components
* Custom hooks
* Contexts

The UI layer consumes use cases without knowing how data is retrieved.

---

# 📁 Project Structure

```text
src/
├── main.tsx
├── App.tsx
├── routes.tsx
│
├── features/
│   ├── cart/
│   │   ├── application/       # Cart use cases
│   │   ├── domain/            # Cart models and contracts
│   │   ├── infrastructure/    # Cart API repository
│   │   └── presentation/      # Cart context and UI logic
│   │
│   └── product/
│       ├── application/       # Product use cases
│       ├── domain/            # Product models and interfaces
│       ├── infrastructure/    # API repositories, mappers and cache
│       └── presentation/
│           ├── components/    # Reusable UI components
│           ├── hooks/         # Presentation hooks
│           └── pages/
│               ├── details/   # Product detail page
│               └── list/      # Product listing page
│
└── shared/
    ├── components/            # Shared UI components
    └── config/                # Global configuration
```

---

# 🛠️ Technical Stack

* **React + TypeScript**
* **React Router v6**
* **CSS Modules** for component-scoped styling
* **Jest** for unit testing
* **Webpack + Babel** configured manually

---

# ✨ Implemented Features

## Product listing

* Responsive product grid
* Search by brand and model
* API integration through repositories
* Cached API responses

## Product details

* Complete product information display
* Dynamic specifications section
* Color selection
* Storage selection
* Add to cart functionality

## Cart

* Product addition flow
* Cart counter in the header
* API integration when adding products

## API Cache

API responses are stored in `localStorage`.

Cache behaviour:

* Data is stored after successful API requests
* Cached data is reused for 1 hour
* Expired entries are automatically ignored and refreshed

## Error handling

API failures and unexpected errors are handled gracefully to avoid breaking the user experience.

---

# 🧪 Testing

Unit tests cover the main pieces of application logic:

* API response mappers
* LocalStorage cache behaviour
* Use cases

The goal is to verify business behaviour independently from the UI.

---

# 💡 Technical Decisions

### Why feature-based architecture?

The application is divided by business capability rather than technical type.

This makes it easier to add new features without creating a large shared folder with unrelated code.

### Why not Redux?

The current application state is limited mainly to the shopping cart.

React Context provides enough functionality without introducing unnecessary complexity.

### Why use repositories?

Repositories isolate API access from the rest of the application.

This allows replacing the data source in the future without changing the UI or business logic.

---

# 🔮 Possible Future Improvements

For a production-scale application, some improvements could be considered:

* Add end-to-end testing with Playwright or Cypress
* Introduce CI/CD checks for tests, linting and builds
* Add pagination or infinite scrolling for larger catalogues
* Improve offline capabilities with PWA features
* Consider a dedicated state management solution if application state grows significantly

---

## Final notes

The implementation focuses on keeping responsibilities separated, making the code easier to understand, test and maintain while staying aligned with the requirements of the challenge.
