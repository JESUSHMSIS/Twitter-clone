// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"; // 1️⃣ sin "Provider"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/libs/prismadb";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET, // 2️⃣ renombrado en v5
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // 3️⃣ Type assertion
        const { email, password } = (credentials ?? {}) as {
          email?: string;
          password?: string;
        };

        if (!email || !password) {
          throw new Error("Credenciales inválidas");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.hashedPassword) {
          throw new Error("Usuario no encontrado o sin contraseña");
        }

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        // 4️⃣ Devuelve solo lo que necesitas para el JWT
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
