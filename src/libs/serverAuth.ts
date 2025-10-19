import { auth } from "@/auth";
import { prisma } from "@/libs/prismadb";

export const serverAuth = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};
