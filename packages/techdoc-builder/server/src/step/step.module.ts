import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { StepService } from "./step.service";
import { StepController } from "./step.controller";
import { StepResolver } from "./step.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [StepController],
  providers: [StepService, StepResolver],
  exports: [StepService],
})
export class StepModule {}
