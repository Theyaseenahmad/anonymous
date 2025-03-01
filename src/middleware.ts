import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
    const token = await getToken({ req: request });
   
 
  if (
    token &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/signin" ||
      request.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(!token && request.nextUrl.pathname.startsWith('/dashboard')){
   
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/sign-up", "/verify", "/dashboard/:path*"],
};
