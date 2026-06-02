# Conduit Backend API

A scalable RESTful backend API for a social blogging platform built with Node.js, Express.js, MongoDB, Redis, and JWT authentication.

## Features

- User Registration & Login
- JWT Authentication & Authorization
- Protected Routes
- Article CRUD Operations
- Comment Management System
- Redis Caching
- Redis Pub/Sub Messaging
- MongoDB Data Persistence
- RESTful API Design
- Layered MVC Architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JSON Web Token (JWT)
- bcrypt
- dotenv
- cors
- morgan

## Project Structure

```text
src/
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── authController.js
│   ├── articleController.js
│   └── commentController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── validationMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Article.js
│   └── Comment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── articleRoutes.js
│   └── commentRoutes.js
│
├── subscribers/
│   └── articleSubscriber.js
│
├── utils/
│   ├── generateToken.js
│   └── articlePublisher.js
│
└── app.js

server.js
.env
package.json
README.md
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd firstname_lastname_CCS6213
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/conduit

JWT_SECRET=your_jwt_secret

REDIS_URL=redis://127.0.0.1:6379
```

## Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Expected output:

```text
MongoDB Connected
Redis Connected
Server running on port 8000
```

## API Base URL

```text
http://127.0.0.1:8000
```

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

Protected routes require:

```http
Authorization: Bearer JWT_TOKEN
```

Use the token returned from the login endpoint.

## Article Endpoints

```http
POST   /api/articles
GET    /api/articles
GET    /api/articles/:slug
PUT    /api/articles/:slug
DELETE /api/articles/:slug
```

## Comment Endpoints

```http
POST   /api/articles/:slug/comments
GET    /api/articles/:slug/comments
DELETE /api/articles/comments/:id
```

## Redis Caching

Cached Endpoints:

```http
GET /api/articles
GET /api/articles/:slug
```

Cache invalidation occurs automatically when:

- An article is created
- An article is updated
- An article is deleted

TTL:

```text
60 seconds
```

## Redis Pub/Sub

Channel:

```text
article-created
```

Triggered when:

```text
A new article is created
```

Example Event:

```text
ARTICLE CREATED EVENT:

{
  title: "Redis PubSub Event Test",
  slug: "redis-pubsub-event-test",
  author: "...",
  createdAt: "..."
}
```

## Testing

The API can be tested using:

- Thunder Client
- Postman
- Insomnia
- cURL

## Assignment Requirements Covered

- Node.js & Express.js
- MongoDB Integration
- Async/Await Architecture
- JWT Authentication & Authorization
- RESTful API Design
- Article CRUD Operations
- Comment System
- Redis Caching
- Redis Pub/Sub Messaging
- Professional Git Workflow

## Author

CCS6213 Back-end Application Development Assignment
