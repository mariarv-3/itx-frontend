# Mobile Device Store - ITX Frontend Test

Technical challenge for building a mobile devices e-commerce application as a Single Page Application (SPA).

## 🚀 Getting Started

### Requirements

* Node.js v18 or higher
* npm v9 or higher

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Available Scripts

* `npm start` - Starts the development server at `http://localhost:3000`.
* `npm run build` - Creates a production build in the `dist` folder.
* `npm run test` - Runs unit tests with Jest.
* `npm run lint` - Runs ESLint checks.

---

## 🏗 Architecture & Technical Decisions

The project follows a **Hexagonal Architecture (Ports & Adapters)** approach combined with some **Domain-Driven Design (DDD)** principles, adapted for a frontend application.

The main goal is to keep business logic independent from the UI framework and external services.

### Layers

* **Domain (`domain`)**

  * Contains core models, repository interfaces (ports), and business definitions.
  * Has no dependencies on React or external libraries.

* **Application (`application`)**

  * Contains use cases that coordinate application flows between the presentation layer and infrastructure.

* **Infrastructure (`infrastructure`)**

  * Contains repository implementations, API communication (`fetch`) and client-side persistence.
  * Includes a localStorage-based cache system with a 1-hour expiration.

* **Presentation (`presentation`)**

  * Contains React components, hooks, contexts and UI-related logic.
  * Responsible only for displaying data and handling user interaction.

---

## 🛠 Tech Stack

* **React 19**
* **TypeScript** with strict configuration
* **Webpack 5 + Babel** custom setup
* **CSS Modules** for component-scoped styling
* **Jest** for unit testing
* **ESLint** for code quality

---

## 🌟 Implemented Features

### Product Listing (PLP)

* Responsive product grid layout.
* Real-time search by brand and model.
* Product data loaded from the provided API.

### Product Detail (PDP)

* Full product information display.
* Dynamic specification rendering.
* Color and storage selection.
* Add-to-cart flow connected to the API.

### API Integration

Implemented endpoints:

* `GET /api/product`

  * Retrieves the product catalogue.

* `GET /api/product/:id`

  * Retrieves product details.

* `POST /api/cart`

  * Adds a selected product configuration to the cart.

### Client-side Cache

* API responses are stored locally using `localStorage`.
* Cached data expires after 1 hour.
* Expired entries are automatically refreshed from the API.

### Error Handling

* API failures are handled through controlled errors.
* Loading and error states are displayed in the UI.

---

## 🧪 Testing

Unit tests cover:

* API mappers.
* Local storage cache behaviour.
* Use cases.
* Repository-related logic.

---

## 📝 Additional Notes

* Webpack is configured with `historyApiFallback` to support direct navigation to application routes.
* The application uses dependency injection through constructors to keep repositories and use cases easily testable.
* The codebase aims to keep responsibilities separated between UI, business logic and external integrations.
