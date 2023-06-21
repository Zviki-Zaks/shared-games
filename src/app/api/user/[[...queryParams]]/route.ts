"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email, password: rawPassword } = await req.json();
  if (!name || !email || !rawPassword) {
    return NextResponse.json({ message: "אנא מלא את כל השדות" });
  }
  try {
    const dbUser = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(rawPassword, 10) },
    });
    const { password, ...dbUserWithoutPassword } = dbUser;
    return NextResponse.json(dbUserWithoutPassword);
  } catch (error) {
    console.error(error);
    NextResponse.error();
    return NextResponse.json({ message: "could not create user" });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { queryParams: string[] } }
) => {
  const { queryParams } = params;
  let [id, email]: (string | null)[] = queryParams ? queryParams : [];
  id = id === "null" || id === "undefined" || id === "" ? null : id;
  email =
    email === "null" || email === "undefined" || email === "" ? null : email;
  if (!id && !email) {
    return NextResponse.json(null);
  }
  try {
    const dbUser = await prisma.user.findUnique({
      where:
        (!!id && !!email && { id, email }) ||
        (!!id && { id }) ||
        (!!email && { email }) ||
        {},
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (dbUser) {
      return NextResponse.json(dbUser);
    }
    return NextResponse.json(null);
  } catch (error) {
    console.error(error);
    NextResponse.error();
    return NextResponse.json(null);
  }
};
