import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("🚀 ~ middleware ~ request:", request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
