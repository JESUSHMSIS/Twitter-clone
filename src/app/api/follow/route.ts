import { prisma } from "@/libs/prismadb";
import { serverAuth } from "@/libs/serverAuth";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();
    if (!userId || typeof userId !== "string") {
      throw new Error("Id invalido");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Id invalido");
    }
    const updatedFollowingIds = [...(user.followingId || []), userId];

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingId: updatedFollowingIds,
      },
    });
    return NextResponse.json(updateUser, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("hubo un error", { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();
    console.log(userId);
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedFollowingIds = (currentUser.followingId || []).filter(
      (followingId) => followingId !== userId,
    );

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingId: updatedFollowingIds },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/follow error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
