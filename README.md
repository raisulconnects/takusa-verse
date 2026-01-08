# Takusa Blog

A modern, full-stack blogging platform built with Next.js 15, featuring user authentication, post management, commenting, and real-time interactions. Designed with a clean, minimal interface using Tailwind CSS.

## Tech Stack

**Frontend**

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- SWR for data fetching and caching
- Lucide React for icons

**Backend**

- Next.js API Routes
- MongoDB with Mongoose ODM
- NextAuth.js for authentication (JWT strategy)
- bcrypt for password hashing

**Services**

- Cloudinary for image storage and management

## Features

### Authentication & User Management

- User registration and login with secure password hashing
- Session management with NextAuth.js
- Protected routes via middleware
- User profiles with post history
- Role-based access control (admin/user)

### Post Management

- Create posts with optional titles
- Edit and delete posts (author-only)
- Image uploads with Cloudinary integration
- Like/unlike functionality with optimistic UI updates
- Real-time feed updates
- Individual post pages with dynamic routing

### Comment System

- Add comments to posts
- View all comments with user information
- Real-time comment updates
- Comment deletion functionality

### User Experience

- Responsive design for mobile and desktop
- Optimistic UI updates for instant feedback
- Time-ago formatting for timestamps
- Loading states and error handling
- Clean, modern UI with pink-themed design

## Project Structure

```
takusa-verse/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   │   ├── posts/                  # Post CRUD operations
│   │   │   ├── comments/               # Comment management
│   │   │   └── profilepost/            # User-specific posts
│   │   ├── Components/
│   │   │   ├── Post.jsx                # Post display component
│   │   │   ├── PostBox.jsx             # Post creation form
│   │   │   ├── CommentSection.jsx      # Comment interface
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   └── Footer.jsx              # Footer component
│   │   ├── Providers/
│   │   │   ├── SessionProvider.jsx     # NextAuth session context
│   │   │   └── FeedProvider.jsx        # Feed state management
│   │   ├── public-feed/                # Main feed page
│   │   ├── profile/                    # User profile page
│   │   ├── login/                      # Login page
│   │   ├── register/                   # Registration page
│   │   └── about/                      # About page
│   └── middleware.js                   # Route protection logic
├── models/
│   ├── User.js                         # User schema
│   ├── Post.js                         # Post schema
│   └── Comment.js                      # Comment schema
└── lib/
    ├── connectDB.js                    # MongoDB connection handler
    ├── authOptions.js                  # NextAuth configuration
    ├── timeAgo.js                      # Time formatting utility
    └── getBaseUrl.js                   # Environment-aware URL helper
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd takusa-verse
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth authentication handlers

### Posts

- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a single post
- `PUT /api/posts/[id]` - Update post (like/unlike)
- `PUT /api/posts/edit/[id]` - Edit post content
- `DELETE /api/posts/[id]` - Delete a post

### Comments

- `GET /api/comments?postId=[id]` - Get comments for a post
- `POST /api/comments` - Create a new comment
- `DELETE /api/comments/[id]` - Delete a comment

### Profile

- `GET /api/profilepost/[userId]` - Get posts by user ID

## Route Protection

The application uses Next.js middleware to protect routes:

- `/public-feed` - Requires authentication
- `/profile` - Requires authentication
- `/login` and `/register` - Redirects authenticated users to feed

## Database Models

### User

- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String)

### Post

- `user` (ObjectId, ref: User)
- `title` (String, optional)
- `post` (String, required)
- `likes` (Array of user IDs)
- `imageUrl` (String, optional)
- `comments` (Array of Comment ObjectIds)
- `createdAt` / `updatedAt` (timestamps)

### Comment

- `userId` (ObjectId, ref: User)
- `comment` (String, required)
- `postId` (ObjectId, ref: Post)
- `createdAt` / `updatedAt` (timestamps)

## Deployment

The application is configured for deployment on Vercel. Ensure all environment variables are set in your Vercel project settings before deploying.
