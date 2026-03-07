import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getLabAccessCookieName } from "@/lib/lab-access";

const protectedRoutes: Array<{ prefix: string; key: Parameters<typeof getLabAccessCookieName>[0] }> = [
  { prefix: "/lab/template-builder", key: "template-builder" },
  { prefix: "/lab/generated", key: "template-builder" },
  { prefix: "/lab/heart-to-heart", key: "heart-to-heart" },
  { prefix: "/lab/festival-app", key: "festival-app" },
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const rule = protectedRoutes.find((item) => path.startsWith(item.prefix));

  if (!rule) {
    return NextResponse.next();
  }

  const cookieName = getLabAccessCookieName(rule.key);
  const isAllowed = request.cookies.get(cookieName)?.value === "1";

  if (isAllowed) {
    return NextResponse.next();
  }

  const redirectUrl = new URL(`/lab/access/${rule.key}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/lab/template-builder/:path*", "/lab/generated/:path*", "/lab/heart-to-heart/:path*", "/lab/festival-app/:path*"],
};
