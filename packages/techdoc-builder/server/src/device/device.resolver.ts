import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DeviceService } from "./device.service";
import { CreateDeviceArgs } from "./CreateDeviceArgs";
import { UpdateDeviceArgs } from "./UpdateDeviceArgs";
import { DeleteDeviceArgs } from "./DeleteDeviceArgs";
import { FindManyDeviceArgs } from "./FindManyDeviceArgs";
import { FindOneDeviceArgs } from "./FindOneDeviceArgs";
import { Device } from "./Device";
import { Category } from "../category/Category";

@graphql.Resolver(() => Device)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DeviceResolver {
  constructor(
    private readonly service: DeviceService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Device])
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "read",
    possession: "any",
  })
  async devices(
    @graphql.Args() args: FindManyDeviceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Device[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Device",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Device, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "read",
    possession: "own",
  })
  async device(
    @graphql.Args() args: FindOneDeviceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Device | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Device",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Device)
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "create",
    possession: "any",
  })
  async createDevice(
    @graphql.Args() args: CreateDeviceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Device> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Device",
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
        `providing the properties: ${properties} on ${"Device"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        category: {
          connect: args.data.category,
        },
      },
    });
  }

  @graphql.Mutation(() => Device)
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "update",
    possession: "any",
  })
  async updateDevice(
    @graphql.Args() args: UpdateDeviceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Device | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Device",
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
        `providing the properties: ${properties} on ${"Device"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          category: {
            connect: args.data.category,
          },
        },
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

  @graphql.Mutation(() => Device)
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "delete",
    possession: "any",
  })
  async deleteDevice(
    @graphql.Args() args: DeleteDeviceArgs
  ): Promise<Device | null> {
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

  @graphql.ResolveField(() => Category, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "read",
    possession: "any",
  })
  async category(
    @graphql.Parent() parent: Device,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Category | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Category",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .category();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
