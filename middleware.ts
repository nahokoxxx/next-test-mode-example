import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function check() {
  const response = await fetch("http://my-db/check");
  const data = await response.json();
  return data as { result: "ok" | "ng" };
}

export async function middleware(request: NextRequest) {
  if (request.url.startsWith("http://localhost:3000/success")) {
    return NextResponse.next();
  }
  const {result} = await check();
  if (result === "ok") {
    return NextResponse.redirect(new URL("http://localhost:3000/success"));
  } 
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
