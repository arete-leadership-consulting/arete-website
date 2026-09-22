import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const previewHostname = "arete-preview.lcypeakcreatives.com";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":", 1)[0].toLowerCase();

  if (hostname !== previewHostname) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, noimageindex",
  );

  return response;
}

export const config = {
  matcher: "/:path*",
};
