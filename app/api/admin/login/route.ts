import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// In einer Produktionsumgebung sollten Sie das Passwort in einer Umgebungsvariable speichern
const ADMIN_PASSWORD = "open-a-eyes-admin"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Setze einen sicheren Cookie mit dem Auth-Token
      const response = NextResponse.json({ success: true })
      response.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 Stunden
      })

      return response
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 