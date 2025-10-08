# Blog Application with Authentication & CRUD

A full-stack blog app with Node.js, Express, MongoDB (Mongoose), JWT auth, and a simple HTML/CSS/JS frontend.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT

## Prerequisites
- Node.js 18+
- MongoDB connection string

## Getting Started
```bash
npm install
```

Create `.env` in project root:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=mysecretkey
```

Run the server:
```bash
npm run dev    # development (nodemon)
# or
npm start      # production
```

The app serves static frontend from `public/` and APIs under `/api/*`.

## Project Structure
```
blog-app/
  server.js
  .env
  package.json
  config/
    db.js
  models/
    User.js
    Blog.js
  routes/
    authRoutes.js
    blogRoutes.js
  middleware/
    authMiddleware.js
  public/
    index.html
    login.html
    register.html
    create.html
    style.css
    uploads/
```

## API
Base URL: `http://localhost:PORT`

### Auth
- POST `/api/auth/register`
  - body: `{ name, email, password }`
  - response: `{ msg }`
- POST `/api/auth/login`
  - body: `{ email, password }`
  - response: `{ token, user: { id, name } }`

Use header `Authorization: Bearer <token>` for protected routes.

### Blogs
- GET `/api/blogs`
  - response: `Blog[]`
- POST `/api/blogs` (auth)
  - form-data fields: `title` (required), `subtitle`, `content` (required), `image` (file optional)
  - response: created `Blog`
- PUT `/api/blogs/:id` (auth)
  - body: partial blog fields to update
  - response: updated `Blog`
- DELETE `/api/blogs/:id` (auth)
  - response: `{ msg }`

## Frontend
- `public/index.html`: lists posts, allows edit/delete for author
- `public/login.html`: login and token storage (localStorage)
- `public/register.html`: signup, redirects to login
- `public/create.html`: create a post with optional image upload

## Notes
- Images are saved locally in `public/uploads/`.
- Ensure `MONGO_URI` and `JWT_SECRET` are set.
- For production, consider environment-specific configs, HTTPS, and a persistent file store (S3, etc.).
