import { prisma } from "@/lib/prisma"
import { DEVICE_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { withServiceError } from "@/services/@common/utils"
import { DeviceInfo } from "@/services/device/types"

class DeviceService {
  getContext(userId: number, deviceId: string) {
    return withServiceError(async () => {
      const device = await prisma.device.findUnique({
        where: { deviceId_userId: { deviceId, userId } }
      })

      if (!device) {
        throw new ServiceError(DEVICE_ERROR.DEVICE_NOT_FOUND)
      }
      return device
    })
  }

  registerOrTouch(userId: number, deviceInfo: DeviceInfo) {
    return withServiceError(async () => {
      const { id, ...rest } = deviceInfo
      const device = await prisma.device.findUnique({
        where: { deviceId_userId: { deviceId: id, userId } }
      })
      const commonData = { ...rest, lastSeenAt: new Date() }

      if (device) {
        await prisma.device.updateMany({
          where: { deviceId: id, userId },
          data: commonData
        })
        return device
      }
      return await prisma.device.create({
        data: { ...commonData, deviceId: id, userId, createdAt: new Date() }
      })
    })
  }
}

export default DeviceService