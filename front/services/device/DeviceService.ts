import { prisma } from "@/lib/prisma"
import { DEVICE_ERROR } from "@/services/@common/errorCodes"
import ServiceError from "@/services/@common/ServiceError"
import { handleService } from "@/services/@common/utils"
import { DeviceInfo } from "@/services/device/types"

class DeviceService {
  getContext(userId: number, deviceId: string) {
    return handleService({
      fn: async () => {
        const device = await prisma.device.findUnique({
          where: { deviceId_userId: { deviceId, userId } }
        })

        if (!device) {
          throw new ServiceError(DEVICE_ERROR.DEVICE_NOT_FOUND)
        }
        return device
      },
      unknownErrorMessage: "등록된 디바이스를 찾을 수 없습니다."
    })
  }

  registerOrTouch(userId: number, deviceInfo: DeviceInfo) {
    return handleService({
      fn: async () => {
        const device = await prisma.device.findUnique({
          where: { deviceId_userId: { deviceId: deviceInfo.id, userId } }
        })
        const commonData = { ...deviceInfo, lastSeenAt: new Date() }

        if (device) {
          await prisma.device.updateMany({
            where: { deviceId: deviceInfo.id, userId },
            data: commonData
          })
          return device
        }
        return await prisma.device.create({
          data: { ...commonData, deviceId: deviceInfo.id, userId, createdAt: new Date() }
        })
      }
    })
  }
}

export default DeviceService