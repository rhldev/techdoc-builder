import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { GuideService } from "./guide.service";
import { CreateGuideArgs } from "./CreateGuideArgs";
import { UpdateGuideArgs } from "./UpdateGuideArgs";
import { DeleteGuideArgs } from "./DeleteGuideArgs";
import { FindManyGuideArgs } from "./FindManyGuideArgs";
import { FindOneGuideArgs } from "./FindOneGuideArgs";
import { Guide } from "./Guide";
import { Category } from "../category/Category";
import { User } from "../user/User";
import { Device } from "../device/Device";

@graphql.Resolver(() => Guide)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GuideResolver {
  constructor(
    private readonly service: GuideService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Guide])
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "read",
    possession: "any",
  })
  async guides(
    @graphql.Args() args: FindManyGuideArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Guide[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Guide",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Guide, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "read",
    possession: "own",
  })
  async guide(
    @graphql.Args() args: FindOneGuideArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Guide | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Guide",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Guide)
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "create",
    possession: "any",
  })
  async createGuide(
    @graphql.Args() args: CreateGuideArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Guide> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Guide",
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
        `providing the properties: ${properties} on ${"Guide"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        category: args.data.category
          ? {
              connect: args.data.category,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,

        device: args.data.device
          ? {
              connect: args.data.device,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Guide)
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "update",
    possession: "any",
  })
  async updateGuide(
    @graphql.Args() args: UpdateGuideArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Guide | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Guide",
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
        `providing the properties: ${properties} on ${"Guide"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          category: args.data.category
            ? {
                connect: args.data.category,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,

          device: args.data.device
            ? {
                connect: args.data.device,
              }
            : undefined,
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

  @graphql.Mutation(() => Guide)
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "delete",
    possession: "any",
  })
  async deleteGuide(
    @graphql.Args() args: DeleteGuideArgs
  ): Promise<Guide | null> {
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
    resource: "Guide",
    action: "read",
    possession: "any",
  })
  async category(
    @graphql.Parent() parent: Guide,
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

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Guide,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .user();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Device, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "read",
    possession: "any",
  })
  async device(
    @graphql.Parent() parent: Guide,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Device | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Device",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .device();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
