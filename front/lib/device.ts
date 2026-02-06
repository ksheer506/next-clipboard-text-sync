import { v4 as uuidv4 } from "uuid";
import UAParser from "ua-parser-js";
import { DeviceType } from "@/generated/prisma/enums";

const DEVICE_ID_KEY = "SHARE_DEVICE_ID";

export const getDeviceId = () => {
  const deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    const newDeviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, newDeviceId);
    return newDeviceId;
  }
  return deviceId
}

export const getDeviceType = () => {
  return /Mobi|Android/i.test(navigator.userAgent) ? DeviceType.MOBILE : DeviceType.PC
}