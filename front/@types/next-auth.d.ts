import { ShareAuthority } from "@/generated/prisma/enums"
import { JWT } from "next-auth/jwt"

interface UserData {
  id: string
  userId: number
  authority: ShareAuthority
  email: string
  name: string
}

export declare module "next-auth" {
  interface User extends UserData {
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user?: JWT
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserData {
    accessToken: string
    refreshToken: string
  }
}
