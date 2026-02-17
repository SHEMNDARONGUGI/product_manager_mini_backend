# Product Mini Backend

> A small Express + MongoDB backend for managing products (CRUD) with simple API key auth and validation middleware.

## Features
- RESTful endpoints for products: list, get, create, update, delete
- MongoDB via Mongoose
- Request logging middleware
- Simple API key authentication (`x-api-key` header)
- Request validation for product create/update

## Prerequisites
- Node.js 18+ and a package manager (`pnpm`, `npm`, or `yarn`)
- A running MongoDB instance and connection URI

## Install
1. Clone or open this project folder.
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

## Environment
Create a `.env` file in the project root with the following variables:

```
MONGO_URI=your_mongo_connection_string
API_KEY=your_api_key_here
PORT=3000
```

- `MONGO_URI` — MongoDB connection string used by `config/db.js`.
- `API_KEY` — API key expected by `middlewares/authMiddleware.js`. If omitted, the default is `default-api-key`.
- `PORT` — server port (defaults to `3000`).

## Run

Start the app in development mode (uses `nodemon`):

```bash
pnpm dev
# or
npm run dev
```

The server listens on `http://localhost:<PORT>` and mounts the product API at `/api/products`.

## API Endpoints
All `/api/products` routes are protected by the API key. Include the header `x-api-key: <your_key>`.

- GET `/api/products` — list all products
- GET `/api/products/:id` — get a product by id
- POST `/api/products` — create a product
  - Body JSON (required):
    - `name` (string, required)
    - `price` (number, required, >= 0)
    - `description` (string, optional)
    - `category` (string, optional)
    - `inStock` (boolean, optional)
- PUT `/api/products/:id` — update a product (same body validation as POST)
- DELETE `/api/products/:id` — delete a product

Example `curl` (create):

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{"name":"Widget","price":19.99,"description":"A widget","category":"tools","inStock":true}'
```

## Project Structure

- `server.js` — application entry, middleware and routes mounting
- `config/db.js` — mongoose connection
- `routes/productRoutes.js` — product routes
- `controllers/productController.js` — route handlers
- `models/Product.js` — Mongoose product model
- `middlewares/` — `authMiddleware.js`, `validationMiddleware.js`, `loggerMiddleware.js`

## Notes & Next Steps
- This project uses a simple API-key based auth for demo purposes. For production use, replace with proper auth (JWT, OAuth, etc.).
- Add tests and rate-limiting for production readiness.




