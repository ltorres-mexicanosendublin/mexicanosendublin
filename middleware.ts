// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Si llega /es o /es/..., lo mandamos a /
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const newPath = pathname.replace(/^\/es/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  // Si llega /en o /en/..., lo mandamos a /
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const newPath = pathname.replace(/^\/en/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// MUY IMPORTANTE: no tocar api, _next, archivos
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
