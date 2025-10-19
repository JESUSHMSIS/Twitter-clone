import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, username, name } = body;

    if (!email || !password || !username || !name) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 },
    );
  }
}
