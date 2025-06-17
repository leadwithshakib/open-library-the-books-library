import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("access_token")?.value;
  return Response.json({ message: "GET request received", token: token });
}

export async function POST(req) {
  const { access_token } = await req.json();
  const response = NextResponse.redirect(new URL("/", req.url));
  response.cookies.set("access_token", access_token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
  return response;
}

export async function DELETE(req) {
  const response = NextResponse.redirect(new URL("/auth/sign-in", req.url));
  response.cookies.delete("access_token");
  return response;
}