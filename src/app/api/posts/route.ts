import { serverAuth } from "@/libs/serverAuth";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prismadb";
export async function POST(req: NextRequest) {
  const { currentUser } = await serverAuth(req);
  const { body } = await req.json();
  const post = await prisma.post.create({
    data: {
      body,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(post, { status: 200 });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  let posts;
  if (userId && typeof userId === "string") {
    posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return NextResponse.json(posts, { status: 200 });
}
