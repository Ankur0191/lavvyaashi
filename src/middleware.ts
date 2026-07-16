import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Pass the request to Supabase to update the session
  const { response, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Protect checkout and account routes
  if (pathname.startsWith("/checkout") || pathname.startsWith("/account")) {
    if (!user) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Prevent logged-in users from accessing login/signup
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
