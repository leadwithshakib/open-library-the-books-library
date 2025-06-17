import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;
  // Check for accessToken in query params
  const accessTokenFromQuery = searchParams.get("accessToken");
  if (accessTokenFromQuery) {
    // Set the access_token cookie and redirect to the same path without the query param
    const response = NextResponse.redirect(new URL(pathname, req.url));
    response.cookies.set("access_token", accessTokenFromQuery, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }
  const token = req.cookies.get("access_token")?.value;
  if (pathname === "/") {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static/).*)", "/auth/sign-in", "/auth/sign-up"],
};
