import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Si llega /es o /es/...
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const newPath = pathname.replace(/^\/es/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
