import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { DeviceResolver } from "./device.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceResolver],
  exports: [DeviceService],
})
export class DeviceModule {}
