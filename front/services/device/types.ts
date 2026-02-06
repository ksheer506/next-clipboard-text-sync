import { DeviceType } from "@/generated/prisma/enums";

export interface DeviceInfo {
  id: string;
  name: string;
  type: DeviceType;
}