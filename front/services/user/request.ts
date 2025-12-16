import { SignUpSchema } from "@/services/user/schema";
import z from "zod";

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface SignInRequest {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: number
  email: string
}