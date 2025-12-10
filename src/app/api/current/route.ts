import { NextResponse } from "next/server";
import { serverAuth } from "@/libs/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.error("💢Error en /api/current:", error);
    return new NextResponse("Not authenticated", { status: 400 });
  }
}
