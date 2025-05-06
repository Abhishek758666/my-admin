import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

export function middleware(request: any) {
  const cookies = parseCookies(request.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, "aew34juoqktderizbtp0a");
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
