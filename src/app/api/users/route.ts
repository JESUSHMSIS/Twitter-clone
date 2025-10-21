import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

type RawUser = {
  _id: { $oid: string };
  name: string;
  username: string;
  email: string;
  profileImage?: string | null;
  followingId: string | string[] | null;
};

export async function GET() {
  try {
    /* 1. Obtén los docs crudos */
    const raw = (await prisma.user.findRaw({
      filter: {},
      options: { sort: { createdAt: -1 } },
    })) as RawUser[];

    /* 2. Normaliza followingId y añade id */
    const fixed = raw.map((u) => {
      const id = u._id.$oid;

      /* arregla followingId */
      let following: string[] = [];
      if (typeof u.followingId === "string") following = [u.followingId];
      else if (Array.isArray(u.followingId)) following = u.followingId;

      /* devuelve objeto limpio */
      return {
        id,
        name: u.name,
        username: u.username,
        email: u.email,
        profileImage: u.profileImage ?? null,
        followingId: following,
      };
    });

    /* 3. Opcional: actualiza la BD solo una vez por usuario que tenga string */
    await Promise.all(
      raw
        .filter((u) => typeof u.followingId === "string")
        .map((u) =>
          prisma.user.update({
            where: { id: u._id.$oid },
            data: { followingId: [u.followingId] },
          }),
        ),
    );

    return NextResponse.json(fixed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
