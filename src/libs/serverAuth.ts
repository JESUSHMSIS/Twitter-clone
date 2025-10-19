import { prisma } from "./prismadb";
import { auth } from "./auth";

export const serverAuth = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("no estas autenticado");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  if (!currentUser) {
    throw new Error("no estas autenticado");
  }

  return { currentUser };
};
