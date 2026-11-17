# CommerceOS — React e-commerce frontend

A React + Vite administration workspace intended to connect to a Spring Boot microservices e-commerce backend through a Spring Cloud API Gateway.

## Included modules

- Authentication: login, logout, JWT bearer token handling
- Authorization: role-aware navigation and protected routes (`ADMIN`, `SELLER`, `BUYER`)
- Buyers: list, search, create, update, delete
- Sellers: list, search, create, update, delete
- Products: catalogue list, search, create, update, delete
- Seller listings: seller-specific offer management
- Orders: order list and search
- Dashboard: marketplace KPI overview
- Access control: role and permission reference

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+
- Spring Boot API Gateway (for live backend integration)

## Run locally

```powershell
# 1. Extract the zip and open the project folder
cd ecommerce-react-frontend

# 2. Install dependencies
npm install

# 3. Create local environment file
Copy-Item .env.example .env

# 4. Start React
npm run dev
```

Open http://localhost:5173.

The project starts in demo mode (`VITE_USE_MOCK_DATA=true`). Demo login:
- `admin@commerce.local` — ADMIN
- `seller@commerce.local` — SELLER
- `buyer@commerce.local` — BUYER

Any password works in demo mode. Demo mode uses local sample data and does not call the backend.

## Connect your Spring Boot backend

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK_DATA=false
```

Update `src/config.js` so every API path matches the actual API Gateway route/controller mapping in your backend.

Default expected API contract:

| Module | Method | Path |
|---|---|---|
| Login | POST | `/api/v1/auth/login` |
| Register | POST | `/api/v1/auth/register` |
| Current user | GET | `/api/v1/users/me` |
| Buyers | GET/POST | `/api/v1/buyers` |
| Buyer update/delete | PUT/DELETE | `/api/v1/buyers/{id}` |
| Sellers | GET/POST | `/api/v1/sellers` |
| Seller update/delete | PUT/DELETE | `/api/v1/sellers/{id}` |
| Products | GET/POST | `/api/v1/products` |
| Product update/delete | PUT/DELETE | `/api/v1/products/{id}` |
| Seller listings | GET/POST | `/api/v1/seller/products` |
| Listing update/delete | PUT/DELETE | `/api/v1/seller/products/{id}` |
| Orders | GET | `/api/v1/orders` |

These are integration defaults, not a claim that your backend currently exposes every route. The frontend currently assumes a collection response as an array or a paginated object containing `content`, `data`, or `items`. Adapt `src/services/api.js` if your DTO envelope differs.

### Authentication response

The login service currently accepts either:

```json
{
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "roles": ["ADMIN"]
  }
}
```

or a response where the profile fields and token are at the top level. Adjust `AuthContext.jsx` if your auth service returns a different DTO. The token is sent on API calls as `Authorization: Bearer <token>`.

## Important security notes

- React route guards and hidden navigation are UX controls only.
- Enforce authorization on every backend endpoint using Spring Security.
- Validate JWT signature, issuer, expiry, audience (if applicable), roles and resource ownership on the server.
- Never put JWT signing secrets in the React app.
- For production, consider secure, HttpOnly, SameSite cookies or a carefully designed token refresh flow instead of long-lived tokens in browser storage.
- Configure CORS on the API Gateway for the frontend origin (for local development: `http://localhost:5173`).
- Replace demo data and demo login before deployment.

## Build

```powershell
npm run build
npm run preview
```

Build output is written to `dist/`.

## Suggested next integration step

Share the API Gateway routes and controller DTOs (or the backend repository) to align the API paths, request bodies, response mapping, pagination, seller approval workflow, listing lifecycle, and order status transitions exactly with your services.
