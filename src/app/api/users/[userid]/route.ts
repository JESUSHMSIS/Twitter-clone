import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";
export async function GET(
  _: NextRequest,
  { params }: { params: { userid: string } },
) {
  try {
    const { userid } = await params;

    const user = await prisma.user.findUnique({
      where: { id: userid },
    });
    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const followersCount = await prisma.user.count({
      where: { followingId: { has: userid } },
    });

    return NextResponse.json({ ...user, followersCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
