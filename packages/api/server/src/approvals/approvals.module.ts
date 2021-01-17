import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { ApprovalsService } from "./approvals.service";
import { ApprovalsController } from "./approvals.controller";
import { ApprovalsResolver } from "./approvals.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [ApprovalsController],
  providers: [ApprovalsService, ApprovalsResolver],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}
