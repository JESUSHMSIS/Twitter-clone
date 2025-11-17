import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;
    if (!postId || typeof postId !== "string") {
      throw new Error("ID invalido");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json({ post }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("Hubo un error", { status: 400 });
  }
}
