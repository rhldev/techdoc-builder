import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { NotificationService } from "./notification.service";
import { CreateNotificationArgs } from "./CreateNotificationArgs";
import { UpdateNotificationArgs } from "./UpdateNotificationArgs";
import { DeleteNotificationArgs } from "./DeleteNotificationArgs";
import { FindManyNotificationArgs } from "./FindManyNotificationArgs";
import { FindOneNotificationArgs } from "./FindOneNotificationArgs";
import { Notification } from "./Notification";

@graphql.Resolver(() => Notification)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class NotificationResolver {
  constructor(
    private readonly service: NotificationService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Notification])
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async notifications(
    @graphql.Args() args: FindManyNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Notification, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "own",
  })
  async notification(
    @graphql.Args() args: FindOneNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Notification",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "create",
    possession: "any",
  })
  async createNotification(
    @graphql.Args() args: CreateNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Notification",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Notification"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "update",
    possession: "any",
  })
  async updateNotification(
    @graphql.Args() args: UpdateNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Notification",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Notification"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "delete",
    possession: "any",
  })
  async deleteNotification(
    @graphql.Args() args: DeleteNotificationArgs
  ): Promise<Notification | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
