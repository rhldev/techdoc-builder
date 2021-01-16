import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypesModule } from "./types/types.module";
import { CategoryModule } from "./category/category.module";
import { ApprovalsModule } from "./approvals/approvals.module";
import { DeviceModule } from "./device/device.module";
import { GuideModule } from "./guide/guide.module";
import { LineModule } from "./line/line.module";
import { StepModule } from "./step/step.module";
import { NotificationModule } from "./notification/notification.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    TypesModule,
    CategoryModule,
    ApprovalsModule,
    DeviceModule,
    GuideModule,
    LineModule,
    StepModule,
    NotificationModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
