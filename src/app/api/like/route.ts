import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
import { serverAuth } from "@/libs/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // ✅ Verificar que no esté ya en la lista antes de agregar
    const updatedLikedIds = [...(post.LikesIds || [])];

    if (!updatedLikedIds.includes(currentUser.id)) {
      updatedLikedIds.push(currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { LikesIds: updatedLikedIds },
    });

    console.log("Like agregado:", {
      postId,
      userId: currentUser.id,
      likedIds: updatedLikedIds,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("POST /api/like error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // ✅ Filtrar correctamente el userId
    const updatedLikedIds = (post.LikesIds || []).filter(
      (likedId) => likedId !== currentUser.id,
    );

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { LikesIds: updatedLikedIds },
    });

    console.log("Like removido:", {
      postId,
      userId: currentUser.id,
      likedIds: updatedLikedIds,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/like error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
