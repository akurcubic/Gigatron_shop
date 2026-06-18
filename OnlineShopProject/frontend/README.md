# Gigatron Web Shop — Frontend

The React single-page application for the **Gigatron Web Shop Clone**, a replica of the
e-commerce site [Gigatron.rs](https://gigatron.rs). This package contains the user-facing
storefront: product browsing, filtering, a shopping cart, the checkout flow, and user login.

It talks to the project's Node.js/Express backend over a REST API (see the
[root README](../../README.md) for the full-stack overview).

---

## Tech Stack

- **React 18** — component-based UI, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- **React Router 7** (`react-router-dom`) — client-side routing.
- **Axios** — HTTP client for talking to the backend API (requests use `withCredentials` for session cookies).
- **Bootstrap 5** + per-component CSS files — styling.
- **Swiper** — product image carousels / sliders.
- **react-range** — the price-range filter slider.
- **react-modal** — dialogs (e.g. login).

### Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `Home` | Landing page |
| `/brands/categories/:brandId/:categoryId` | `Products` | Filtered product listing |
| `/products/:productId` | `ProductView` | Single product details |
| `/cart` | `CartView` | Shopping cart and ordering |
| `/profile` | `Profile` | User login / account |

## Features

- **Product display** — listings and a detailed product view with images, price, discounts, and specifications.
- **Search & filtering** — filter products by category, brand, price range, and specifications.
- **Cart & checkout** — add/remove items, see a live cart count in the header, view a total, and submit an order with delivery details.
- **User accounts** — login via the backend session API.

## Getting Started

From this `frontend` directory:

```bash
npm install   # install dependencies
npm start     # start the dev server
```

The app runs at [http://localhost:3000](http://localhost:3000) and reloads on changes.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode at `http://localhost:3000`. |
| `npm test` | Launch the test runner in interactive watch mode. |
| `npm run build` | Build an optimized production bundle into the `build/` folder. |
| `npm run eject` | Eject from Create React App (one-way operation). |

## Backend API

The frontend expects the backend to be reachable at `http://localhost:4000`. Key endpoints used:

- `GET  /api/categories` and `/api/categories/brands/:id` — navigation data.
- `GET  /api/products/single_product/:productId` — product details.
- `GET  /api/products/get_products_from_cart` — current cart.
- `POST /api/products/add_in_cart/:productId/:count` — add to cart.
- `DELETE /api/products/delete_in_cart/:productId` — remove from cart.
- `POST /api/products/make_order` — place an order.
- `POST /api/users/login` — user login.

