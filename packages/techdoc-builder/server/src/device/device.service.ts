import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDeviceArgs,
  FindManyDeviceArgs,
  DeviceCreateArgs,
  DeviceUpdateArgs,
  DeviceDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDeviceArgs>(args: Subset<T, FindManyDeviceArgs>) {
    return this.prisma.device.findMany(args);
  }
  findOne<T extends FindOneDeviceArgs>(args: Subset<T, FindOneDeviceArgs>) {
    return this.prisma.device.findOne(args);
  }
  create<T extends DeviceCreateArgs>(args: Subset<T, DeviceCreateArgs>) {
    return this.prisma.device.create<T>(args);
  }
  update<T extends DeviceUpdateArgs>(args: Subset<T, DeviceUpdateArgs>) {
    return this.prisma.device.update<T>(args);
  }
  delete<T extends DeviceDeleteArgs>(args: Subset<T, DeviceDeleteArgs>) {
    return this.prisma.device.delete(args);
  }
}
