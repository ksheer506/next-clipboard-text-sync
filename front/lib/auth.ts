import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const DUMMY_USER_DATA = [
  {
    id: "1",
    email: "a@a.a",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
  },
  {
    id: "2",
    email: "sXK3o2@example.com",
    firstName: "Jane",
    lastName: "Doe",
    phone: "9876543210",
  }
] as const

const ACCESS_TOKEN = "access_token"

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
        const user = DUMMY_USER_DATA.find((user) => user.email === credentials.email)
        /* const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        }) */

        if (!user) {
          throw new Error("Invalid email or password.")
        }
        /* const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid email or password.")
        } */
        return { ...user, accessToken: ACCESS_TOKEN }
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
