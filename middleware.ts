import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Prüfe, ob es sich um eine Admin-Route handelt
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Überspringe die Login-Seite
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Prüfe den Admin-Token
    const adminToken = request.cookies.get("admin_token")

    if (!adminToken || adminToken.value !== "authenticated") {
      // Redirect zur Login-Seite, wenn nicht authentifiziert
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
} 