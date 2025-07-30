import { auth } from "./lib/auth";

export const middleware = auth;
export const config = {
  matcher: ["/account/:path*", "/favorites", "/cart", "/checkout"],
};
