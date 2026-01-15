import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // Create response
  // console.log({ session });
  const response = !session?.user
    ? (() => {
        const url = req.nextUrl.clone();
        url.pathname = "/signin";
        url.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(url);
      })()
    : NextResponse.next();

  // Enable bfcache by avoiding no-store for authenticated pages
  // Only set cache headers for public pages, not authenticated ones
  if (!session?.user) {
    response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  } else {
    // For authenticated pages, use a more bfcache-friendly approach
    response.headers.set(
      "Cache-Control",
      "private, max-age=0, must-revalidate"
    );
  }

  return response;
}

export const config = {
  matcher: ["/account", "/account/:path*", "/favorites", "/cart", "/checkout"],
};
