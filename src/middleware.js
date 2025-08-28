// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Get authentication tokens/flags from cookies.
  // IMPORTANT: Ensure your login API sets an 'isAdmin' cookie upon admin login.
  const authToken = req.cookies.get('authToken')?.value;
  const isAdminUser = req.cookies.get('isAdmin')?.value === 'true';

  // Define routes that should always be accessible without authentication
  // specifically for the admin auth flow.
  const publicAdminAuthPaths = [
    '/admin/login',
    '/admin/forgot-password', // Added to allow access without login
    '/admin/reset-password',  // Added to allow access without login
  ];

  // --- 1. Handle Admin Authentication Routes ---
  // These paths are part of the admin authentication flow and should be publicly accessible.
  // E.g., /admin/login, /admin/signup, /admin/forgot-password, /admin/reset-password.
  if (publicAdminAuthPaths.some(p => path.startsWith(p))) {
    // If an admin user is already logged in and tries to access login/signup,
    // redirect them to the admin dashboard.
    // We specifically exclude forgot-password and reset-password from this redirect,
    // allowing logged-in admins to potentially visit them if needed (though unlikely).
    if (authToken && isAdminUser && (path === '/admin/login' || path === '/admin/signup')) {
      return NextResponse.redirect(new URL('/admin', req.url)); // Redirect to admin dashboard.
    }
    return NextResponse.next(); // Allow unauthenticated users or non-admins to access these pages.
  }

  // --- 2. Protect Core Admin Pages ---
  // This applies to all other routes under '/admin' (e.g., /admin, /admin/dashboard, /admin/users).
  // These pages require an authenticated admin user.
  if (path.startsWith('/admin')) {
    // If no token OR the user is NOT an admin, redirect to admin login.
    if (!authToken || !isAdminUser) {
      console.log(`Middleware: Unauthorized access to admin route '${path}'. Redirecting to /admin/login.`);
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }


    // Verify the user's live status from the backend.
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const response = await fetch(`${backendUrl}/api/auth/profile`, {
        headers: {
          'x-auth-token': authToken,
        },
      });

      if (!response.ok) {
        // If the API call fails or the token is invalid, force logout.
        const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url));
        redirectResponse.cookies.delete('authToken');
        redirectResponse.cookies.delete('isAdmin');
        return redirectResponse;
      }

      const adminProfile = await response.json();
      
      // If the admin status is not active (1), force logout.
      if (adminProfile.status !== 1) {
        console.log(`Middleware: Admin account for '${adminProfile.email}' is inactive. Forcing logout.`);
        const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url));
        redirectResponse.cookies.delete('authToken');
        redirectResponse.cookies.delete('isAdmin');
        return redirectResponse;
      }

    } catch (error) {
      console.error('Middleware API check failed:', error);
      // On any API error, assume the worst and force logout.
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url));
      redirectResponse.cookies.delete('authToken');
      redirectResponse.cookies.delete('isAdmin');
      return redirectResponse;
    }










    // If authenticated as an admin, allow access.
    return NextResponse.next();
  }

  // --- 3. Handle Public/User Authentication Routes ---
  // These are paths like /login, /signup for regular users.
  if (path.startsWith('/login') || path.startsWith('/signup')) {
    // If a non-admin (regular) user is already logged in, redirect them from public login/signup pages.
    if (authToken && !isAdminUser) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to public homepage.
    }
    return NextResponse.next(); // Allow unauthenticated users or admin users to access public auth pages.
  }

  // --- 4. Protect Other Public/User Routes (Optional) ---
  // This section is commented out but provides a template for protecting regular user-specific routes.
  /*
  if (path.startsWith('/profile') || path.startsWith('/dashboard')) {
    // If not authenticated, or if an admin tries to access a regular user-only page.
    if (!authToken || isAdminUser) {
      console.log(`Middleware: Unauthorized access to user route '${path}'. Redirecting to /login.`);
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Allow authenticated regular users.
  }
  */

  // --- 5. Default Case: Allow all other requests to proceed ---
  // This applies to your public homepage ('/') and any other truly public pages
  // that don't fall into the protected categories above.
  return NextResponse.next();
}

// This matcher ensures the middleware only runs for page routes and not for
// internal Next.js files, API routes, or static assets.
export const config = {
  matcher: [
    // Match all request paths except for files with extensions (like .png, .css, .js),
    // API routes, and Next.js internal files.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};