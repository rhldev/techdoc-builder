import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TypesService } from "./types.service";
import { CreateTypesArgs } from "./CreateTypesArgs";
import { UpdateTypesArgs } from "./UpdateTypesArgs";
import { DeleteTypesArgs } from "./DeleteTypesArgs";
import { FindManyTypesArgs } from "./FindManyTypesArgs";
import { FindOneTypesArgs } from "./FindOneTypesArgs";
import { Types } from "./Types";

@graphql.Resolver(() => Types)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TypesResolver {
  constructor(
    private readonly service: TypesService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Types])
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "read",
    possession: "any",
  })
  async types(
    @graphql.Args() args: FindManyTypesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Types[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Types",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Types, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "read",
    possession: "own",
  })
  async types(
    @graphql.Args() args: FindOneTypesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Types | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Types",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Types)
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "create",
    possession: "any",
  })
  async createTypes(
    @graphql.Args() args: CreateTypesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Types> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Types",
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
        `providing the properties: ${properties} on ${"Types"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Types)
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "update",
    possession: "any",
  })
  async updateTypes(
    @graphql.Args() args: UpdateTypesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Types | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Types",
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
        `providing the properties: ${properties} on ${"Types"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Types)
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "delete",
    possession: "any",
  })
  async deleteTypes(
    @graphql.Args() args: DeleteTypesArgs
  ): Promise<Types | null> {
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
