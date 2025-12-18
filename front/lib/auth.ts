import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "@/services/auth/AuthService";

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update
} = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.")
        }
        /** TODO:ksh: ServiceError 처리 - 2025.12.16 */
        const res = await new AuthService().signIn({
          email: credentials.email as string,
          password: credentials.password as string
        })

        if (!res) {
          throw new Error("Invalid email or password.")
        }
        return { ...res.user, id: res.user.id.toString(), accessToken: res.accessToken, refreshToken: res.refreshToken }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, ...user, accessToken: user.accessToken }
      }
      return token
    },
    session: async ({ session, token }) => {
      return { ...session, user: { ...session.user, ...token, accessToken: token.accessToken } }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "",
})
