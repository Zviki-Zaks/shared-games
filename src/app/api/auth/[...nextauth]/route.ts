import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { signJwtAccessToken } from "../../../../lib/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "אימייל",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "סיסמא",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const { email, password } = credentials;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });
          if (dbUser && (await bcrypt.compare(password, dbUser.password))) {
            const { password, ...dbUserWithoutPassword } = dbUser;
            return dbUserWithoutPassword;
          }
          return null;
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, user, token }) {
      return { ...session, token };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signin",
  },
  theme: {
    colorScheme: "dark",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
