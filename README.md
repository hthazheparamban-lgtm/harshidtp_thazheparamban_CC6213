# Conduit Backend API

A scalable RESTful backend API for a social blogging platform built with Node.js, Express.js, MongoDB, Redis, and JWT authentication.

## Features

- User Registration & Login
- JWT Authentication & Authorization
- Protected Routes
- Article CRUD Operations
- Comment Management System
- Social Following System
- Redis Caching
- Redis Cache Invalidation
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
│   ├── commentController.js
│   └── profileController.js
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
│   ├── commentRoutes.js
│   └── profileRoutes.js
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
package.json
README.md
```

## Installation

```bash
git clone <repository-url>
cd Hashid_Thazheparamban_CCS6213

npm install
```

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/conduit

JWT_SECRET=your_secret_key

REDIS_URL=redis://127.0.0.1:6379
```

## Running the Application

```bash
npm run dev
```

Expected startup output:

```text
MongoDB Connected
Redis Connected
Server running on port 8000
```

## API Base URL

```text
http://127.0.0.1:8000
```

## Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

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

## Profile Endpoints

```http
GET    /api/profiles/:id
POST   /api/profiles/:id/follow
DELETE /api/profiles/:id/follow
```

## Redis Caching

The application caches frequently accessed article data.

Cached endpoints:

```http
GET /api/articles
GET /api/articles/:slug
```

Cache invalidation occurs automatically when:

- An article is created
- An article is updated
- An article is deleted

## Redis Pub/Sub

Channel:

```text
article-created
```

Event Trigger:

```text
New article creation
```

Subscriber:

```text
articleSubscriber.js
```

The subscriber receives article creation events asynchronously and processes them independently of the request lifecycle.

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
- Social Following System
- Redis Caching
- Redis Pub/Sub Messaging
- Professional Git Workflow

## Author

CCS6213 – Back-end Application Development Assignment - Harshid Thazheparamban
