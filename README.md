# 📰 Takusa Blog

A modern, full-stack blog platform built with **Next.js 15**, **MongoDB**, and **NextAuth**, featuring authentication, post management, commenting, and route protection — all styled with Tailwind for a sleek, minimal look.

---

## 🚀 Tech Stack

**Frontend**

- ⚡ Next.js 15 (App Router)
- 🎨 Tailwind CSS
- 🧭 Next Navigation (Client + Server components mix)
- 🔁 SWR for efficient data fetching
- ⚡ Optimistic UI updates for seamless user experience

**Backend**

- 🧩 Next.js API Routes / Server Actions
- 🗄️ MongoDB + Mongoose ORM
- 🔐 NextAuth.js for Authentication

---

## ✨ Features

- 👤 **User Authentication** (Signup, Login, Logout)
- ✍️ **Create, Edit, Delete Posts**
- 💬 **Comment System** with instant refresh
- 🚧 **Protected Routes** (via `middleware.js`)
- ⏱️ **Time-ago formatting** for post & comment timestamps
- 🧭 **Dynamic Routing** for posts and users
- 🧠 _(Upcoming)_: **AI Auto-Summarization** and **Smart Tagging**
- ⚙️ **Environment-aware Base URL** (for Vercel deployment)

---

## 📁 Folder Structure

```bash
├── app/
│ ├── api/
│ │ ├── posts/ → CRUD endpoints
│ │ ├── comments/ → Comment API
│ │ └── auth/ → NextAuth routes
│ ├── (auth)/
│ │ ├── login/
│ │ └── register/
│ ├── dashboard/
│ ├── profile/
│ └── page.js → Home page
│
├── components/ → UI components
├── lib/
│ ├── dbConnect.js → Mongo connection
│ ├── timeAgo.js → Date formatting helper
│ └── getBaseUrl.js → Handles local/prod URL
├── middleware.js → Route protection logic
└── models/
├── User.js
├── Post.js
└── Comment.js
```

---

## 🔒 Route Protection

Implemented via **`middleware.js`**, which runs on every request.
It checks for valid session tokens and guards restricted paths.

---

## ⚡ Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/takusa-blog.git
   cd takusa-blog
   npm install
   ```

---

2. **Setup Enviorment Variables**

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000

   ```

---

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

---

## 📦 Deployment

    Ready for seamless deployment on Vercel. Add the same environment variables
    in Vercel Project Settings → Environment Variables before deploying.

---

## 🧠 Upcoming Features

🤖 AI-generated post summaries

🏷️ Automatic tag suggestions

📱 Responsive dark mode

---
