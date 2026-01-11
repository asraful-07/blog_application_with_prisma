# 📝 Blog Post & Comment API (Better Auth)

---

## 🚀 Features

### 🔐 Authentication (Better Auth)

- Email & Password Authentication
- JWT-based Secure Access Token
- Role-based Authorization (ADMIN, USER)
- Protected Routes

### 📰 Blog Post

- Create / Update / Delete Post (Admin Only)
- Publish / Draft / Archive Post
- Pagination, Search & Filter
- View Count Tracking

### 💬 Comment System

- Authenticated User Comment
- Comment Approve / Reject (Admin)
- Post-wise Comment Fetch

### 📊 Statistics

- Total Posts / Published / Draft / Archived
- Total Users (Admin / User Count)
- Total Comments (Approved / Rejected)
- Total Post Views

---

## 🛠 Tech Stack

| Layer     | Technology      |
| --------- | --------------- |
| Runtime   | Node.js         |
| Framework | Express.js      |
| Auth      | Better Auth     |
| ORM       | Prisma          |
| Database  | PostgreSQL      |
| Language  | TypeScript      |
| Security  | JWT, Middleware |

---

## 📁 Project Structure

```
src/
│── modules/
│   ├── auth/
│   ├── post/
│   ├── comment/
│   ├── stats/
│
│── middlewares/
│   ├── auth.ts
│
│── lib/
│   ├── prisma.ts
│   ├── auth.ts
│
│── routes/
│   ├── index.ts
│
│── app.ts
│── server.ts
```

---

## 📦 Installation & Setup

```bash
# Clone Repository
git clone https://github.com/yourusername/blog-api.git

# Install Dependencies
npm install

# Prisma Generate
npx prisma generate

# Database Migration
npx prisma migrate dev

# Run Development Server
npm run dev
```

---

## 🔑 Authentication Flow (Better Auth)

1. User Login / Register
2. Better Auth JWT Token Generate
3. Token `Authorization` Header

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/login    | User Login    |
| POST   | /api/auth/register | User Register |

### 📰 Post

| Method | Endpoint       | Access |
| ------ | -------------- | ------ |
| POST   | /api/posts     | Admin  |
| GET    | /api/posts     | Public |
| GET    | /api/posts/:id | Public |
| PATCH  | /api/posts/:id | Admin  |
| DELETE | /api/posts/:id | Admin  |

### 💬 Comment

| Method | Endpoint              | Access |
| ------ | --------------------- | ------ |
| POST   | /api/comments         | User   |
| GET    | /api/comments/:postId | Public |
| PATCH  | /api/comments/:id     | Admin  |

### 📊 Stats (Admin)

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /api/stats |

---

## 🧠 Prisma Schema (Sample)

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  status    PostStatus
  views     Int      @default(0)
  comments  Comment[]
  createdAt DateTime @default(now())
}
```

---

## 🛡 Security Best Practices

- JWT Expiry Enabled
- Role-based Route Protection
- Central Error Handling
- Prisma Validation

---

## ✅ Future Improvements

- Refresh Token System
- Comment Reply (Nested Comment)
- Redis Cache for Popular Posts
- Swagger API Documentation

---

## 👨‍💻 Author

**Rahat**
Backend Developer (Node.js, Prisma, PostgreSQL)

---

## 📜 License

This project is licensed under the **MIT License**.

---
