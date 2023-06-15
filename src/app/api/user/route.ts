import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req: NextRequest) => {
  const { name, email, password: rawPassword } = await req.json();

  try {
    const dbUser = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(rawPassword, 10) },
    });
    const { password, ...dbUserWithoutPassword } = dbUser;
    return NextResponse.json(dbUserWithoutPassword);
  } catch (error) {
    console.error(error);
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id?: string; email?: string } }
) => {
  const { id, email } = params;
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: id || email },
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
    // TODO: handle error
  }
};
