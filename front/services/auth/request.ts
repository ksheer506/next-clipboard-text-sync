import { SignUpSchema } from "@/services/auth/schema";
import z from "zod";

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface SignInRequest {
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: number
  email: string
}