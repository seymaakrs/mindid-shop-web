import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_LOCALES = ["tr", "en"] as const;
const DEFAULT_LOCALE = "tr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin panelini atla
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Statik dosyaları atla
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // .ico, .png, .jpg, .txt vb.
  ) {
    return NextResponse.next();
  }

  // /en/* istekleri → dil cookie'si ayarla ve /en prefix'ini kaldır
  if (pathname.startsWith("/en")) {
    const newPath = pathname.replace(/^\/en/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = newPath;

    const response = NextResponse.rewrite(url);
    response.cookies.set("lang", "en", { path: "/", maxAge: 365 * 24 * 60 * 60 });
    return response;
  }

  // /tr/* istekleri → prefix'i kaldır (varsayılan dil)
  if (pathname.startsWith("/tr")) {
    const newPath = pathname.replace(/^\/tr/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = newPath;

    const response = NextResponse.rewrite(url);
    response.cookies.set("lang", "tr", { path: "/", maxAge: 365 * 24 * 60 * 60 });
    return response;
  }

  // Dil tespiti: cookie → Accept-Language header → varsayılan
  const langCookie = request.cookies.get("lang")?.value;
  if (langCookie && PUBLIC_LOCALES.includes(langCookie as typeof PUBLIC_LOCALES[number])) {
    // Cookie zaten var, devam et
    return NextResponse.next();
  }

  // Accept-Language'dan dil algıla
  const acceptLang = request.headers.get("accept-language") || "";
  const detectedLang = acceptLang.includes("tr") ? "tr" : "en";

  const response = NextResponse.next();
  response.cookies.set("lang", detectedLang, { path: "/", maxAge: 365 * 24 * 60 * 60 });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
