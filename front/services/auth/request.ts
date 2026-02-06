import { SignUpSchema } from "@/services/auth/schema";
import { DeviceInfo } from "@/services/device/types";
import z from "zod";

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface SignInRequest {
  email: string;
  password: string;
  device: DeviceInfo;
}

export interface TokenPayload {
  userId: number
  email: string
}