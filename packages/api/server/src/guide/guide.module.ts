import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { GuideService } from "./guide.service";
import { GuideController } from "./guide.controller";
import { GuideResolver } from "./guide.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [GuideController],
  providers: [GuideService, GuideResolver],
  exports: [GuideService],
})
export class GuideModule {}
