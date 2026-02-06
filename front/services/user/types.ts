import { ShareAuthority } from "@/generated/prisma/enums";

export interface UserContext {
  id: number
  authority: ShareAuthority
}