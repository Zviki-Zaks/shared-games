"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  try {
    const dbUser = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    if (dbUser) {
      return NextResponse.json(dbUser);
    } else {
      NextResponse.error();
      return NextResponse.json({ message: "could not sign in" });
    }
  } catch (error) {
    console.error(error);
    NextResponse.error();
    return NextResponse.json({ message: "could not sign in" });
  }
}
