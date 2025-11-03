import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token; // user session (JWT)
    const { pathname } = req.nextUrl;

    // console.log("🧠 Middleware running on:", pathname);
    console.log("🔑 Token present:", !!token);

    // ✅ If logged in → block access to login/register
    if (
      token &&
      (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
      // console.log("➡️ Logged-in user redirected to /public-feed");
      return NextResponse.redirect(new URL("/public-feed", req.url));
    }

    // ✅ If NOT logged in → block access to protected routes
    if (
      !token &&
      (pathname.startsWith("/public-feed") || pathname.startsWith("/profile"))
    ) {
      // console.log("⛔ Guest redirected to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Otherwise allow the request
    // console.log("✅ Access granted:", pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Always run middleware; we’ll handle the logic ourselves
    },
  }
);

export const config = {
  matcher: ["/login", "/register", "/profile", "/public-feed/:path*"],
};
