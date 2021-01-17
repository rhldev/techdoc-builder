import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TypesService } from "./types.service";
import { TypesController } from "./types.controller";
import { TypesResolver } from "./types.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TypesController],
  providers: [TypesService, TypesResolver],
  exports: [TypesService],
})
export class TypesModule {}
