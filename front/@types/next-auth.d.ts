import { JWT } from "next-auth/jwt"

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

export declare module "next-auth" {
  interface User extends UserData {
    accessToken: string
  }

  interface Session {
    user?: JWT
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserData {
    accessToken: string
  }
}
