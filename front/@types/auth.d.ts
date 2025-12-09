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
    user?: UserData
    accessToken: string
  }
}
export declare module "@auth/core/jwt" {
  interface DefaultJWT extends UserData {
    accessToken: string
  }
}