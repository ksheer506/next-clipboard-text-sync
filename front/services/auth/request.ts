import { DeviceType } from "@/generated/prisma/enums";
import { SignUpSchema } from "@/services/auth/schema";
import z from "zod";

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface UserDeviceInfo {
  id: string;
  name: string;
  type: DeviceType;
}

export interface SignInRequest {
  email: string;
  password: string;
  device: UserDeviceInfo;
}

export interface TokenPayload {
  userId: number
  email: string
}