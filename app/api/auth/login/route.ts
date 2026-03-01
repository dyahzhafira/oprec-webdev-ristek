import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usernya ga ketemu!" }, {status: 404});
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Ulang lagi! Passwordnya salah :(" }, {status: 401 });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {expiresIn: "1d"});

  const response = NextResponse.json({ message: "Login success" });
  
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}