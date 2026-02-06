import { v4 as uuidv4 } from "uuid";
import { UAParser } from "ua-parser-js";
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

const getDeviceFromUA = () => {
  const parser = new UAParser();
  const device = parser.getDevice();
  const browser = parser.getBrowser();

  return {
    type: device.type === "mobile" ? DeviceType.MOBILE : DeviceType.PC,
    name: ""
  }

}

export const getUserDeviceInfo = () => ({
  id: getDeviceId(),
  ...getDeviceFromUA(),
})