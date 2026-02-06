import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "@/services/auth/AuthService";
import ServiceError from "@/services/@common/ServiceError";
import { getUserDeviceInfo } from "@/lib/device";
import DeviceService from "@/services/device/DeviceService";

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
        try {
          const res = await new AuthService().signIn({
            email: credentials.email as string,
            password: credentials.password as string,
          })
          const device = await new DeviceService().registerOrTouch(res.user.userId, getUserDeviceInfo())

          return { ...res.user, userId: res.user.userId, accessToken: res.accessToken, refreshToken: res.refreshToken }
        }
        catch (e) {
          if (ServiceError.isError(e)) {
            throw e
          }
          throw new Error("Login failed. Please try again.")
        }
      }
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

export const getAuthenticatedUser = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }
  return { id: session.user.userId, authority: session.user.authority }
}
