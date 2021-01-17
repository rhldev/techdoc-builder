import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { ApprovalsService } from "./approvals.service";
import { CreateApprovalsArgs } from "./CreateApprovalsArgs";
import { UpdateApprovalsArgs } from "./UpdateApprovalsArgs";
import { DeleteApprovalsArgs } from "./DeleteApprovalsArgs";
import { FindManyApprovalsArgs } from "./FindManyApprovalsArgs";
import { FindOneApprovalsArgs } from "./FindOneApprovalsArgs";
import { Approvals } from "./Approvals";
import { Guide } from "../guide/Guide";
import { User } from "../user/User";

@graphql.Resolver(() => Approvals)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ApprovalsResolver {
  constructor(
    private readonly service: ApprovalsService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Approvals])
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "read",
    possession: "any",
  })
  async approvals(
    @graphql.Args() args: FindManyApprovalsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Approvals[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Approvals",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Approvals, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "read",
    possession: "own",
  })
  async approvals(
    @graphql.Args() args: FindOneApprovalsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Approvals | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Approvals",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Approvals)
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "create",
    possession: "any",
  })
  async createApprovals(
    @graphql.Args() args: CreateApprovalsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Approvals> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Approvals",
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
        `providing the properties: ${properties} on ${"Approvals"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        guide: {
          connect: args.data.guide,
        },

        owner: {
          connect: args.data.owner,
        },

        requestor: {
          connect: args.data.requestor,
        },
      },
    });
  }

  @graphql.Mutation(() => Approvals)
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "update",
    possession: "any",
  })
  async updateApprovals(
    @graphql.Args() args: UpdateApprovalsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Approvals | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Approvals",
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
        `providing the properties: ${properties} on ${"Approvals"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          guide: {
            connect: args.data.guide,
          },

          owner: {
            connect: args.data.owner,
          },

          requestor: {
            connect: args.data.requestor,
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

  @graphql.Mutation(() => Approvals)
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "delete",
    possession: "any",
  })
  async deleteApprovals(
    @graphql.Args() args: DeleteApprovalsArgs
  ): Promise<Approvals | null> {
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

  @graphql.ResolveField(() => Guide, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "read",
    possession: "any",
  })
  async guide(
    @graphql.Parent() parent: Approvals,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Guide | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Guide",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .guide();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Approvals,
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
      .owner();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Approvals",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Approvals,
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
      .requestor();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
