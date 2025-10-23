import { NextRequest, NextResponse } from "next/server";
import { serverAuth } from "@/libs/serverAuth";
import { prisma } from "@/libs/prismadb";
type UpdateBody = {
  name?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
};

export async function PATCH(req: NextRequest) {
  try {
    /* 2. Autenticación */
    const { currentUser } = await serverAuth();
    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    /* 3. Parsear el cuerpo */
    const body: UpdateBody = await req.json();

    /* 4. Validación mínima */
    const { name, username, bio, profileImage, coverImage } = body;
    if (!name || !username) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name y username" },
        { status: 400 },
      );
    }

    /* 5. Actualizar usuario */
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, username, bio, profileImage, coverImage },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
