// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments the `Request` with the user's token.
  function middleware(req) {
    // Log the user's token for debugging purposes
    console.log("Middleware Token:", req.nextauth.token);
    console.log("Request URL:", req.nextUrl.pathname);

    // Define the protected routes that require authentication
    const protectedRoutes = [
      "/admin/addnewart",
      "/admin/listofartworks"
    ];

    // Check if the current path is one of the protected routes
    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    // If the user is trying to access a protected route AND they are NOT authenticated
    if (isProtectedRoute && !req.nextauth.token) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // If the user is trying to access the login page while already authenticated, redirect them to a homepage to prevent re-logging in.
    if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin/addnewart", req.url)); 
    }

    return NextResponse.next();
  },
  {
    // Define callbacks for `withAuth`
    callbacks: {
      // This callback is called before `middleware` function above.
      // It determines if the token exists. If it returns true, `req.nextauth.token` will be populated.
      // If it returns false, `req.nextauth.token` will be null, and the `middleware` function will handle the redirect.
      authorized: ({ token }) => {
        // Return true if a token exists, meaning the user is authenticated.
        // You can add more complex authorization logic here (e.g., check user roles)
        // For now, we simply check if a token exists.
        return !!token;
      },
    },
    // Define the pages where NextAuth.js should redirect unauthenticated users
    // This is often redundant if you handle redirects manually in the middleware,
    // but it's good practice to have it configured for NextAuth.js itself.
    pages: {
      signIn: "/admin/login", // Specify your login page path
    },
  }
);

// Define the matcher to specify which paths the middleware should run on.
// This is crucial for performance, as it prevents the middleware from running on every request.
export const config = {
  matcher: [
    "/admin/:path*", // Protects all paths under /admin/
  ],
};
