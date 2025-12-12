import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // 1. Get token (Securely)
  // We pass 'req' directly. NextAuth handles the type internaly.
  // If TS complains here, we cast it specifically to 'any' only inside the function argument 
  // to satisfy the library, but keep 'req' typed correctly elsewhere.
  const token = await getToken({ req } as any);
  
  const isAuthenticated = !!token;
  const url = req.nextUrl;
  const path = url.pathname;

  // -----------------------------
  // PUBLIC ROUTES: /login, /register
  // -----------------------------
  if (path.startsWith("/login") || path.startsWith("/register")) {
    if (isAuthenticated) {
      // Logic: If they are logged in, they shouldn't be on login page.
      
      // If onboarding not completed → force onboarding
      if (!token?.onboardingCompleted) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      // Otherwise → go to templates
      return NextResponse.redirect(new URL("/templates", req.url));
    }
    // Allow access to login/register if not authenticated
    return NextResponse.next();
  }

  // -----------------------------
  // PROTECTED ROUTES
  // -----------------------------
  const PROTECTED_PATHS = [
    "/templates",
    "/onboarding",
    "/api/protected",
  ];

  const isProtected = PROTECTED_PATHS.some((p) => path.startsWith(p));

  if (isProtected) {
    // 1. Not signed in → go to login
    if (!isAuthenticated) {
      // Smart Redirect: Save where they were trying to go
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Onboarding Flow Enforcement
    
    // Scenario A: Trying to access Dashboard, but NOT onboarded
    if (path.startsWith("/templates") && !token?.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Scenario B: Trying to access Onboarding, but ALREADY onboarded
    if (path.startsWith("/onboarding") && token?.onboardingCompleted) {
       return NextResponse.redirect(new URL("/templates", req.url));
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

// Configure which paths the middleware runs on to save performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images (svg, png, etc)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};