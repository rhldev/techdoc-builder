import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { LineService } from "./line.service";
import { LineController } from "./line.controller";
import { LineResolver } from "./line.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [LineController],
  providers: [LineService, LineResolver],
  exports: [LineService],
})
export class LineModule {}
