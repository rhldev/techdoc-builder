import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { LineService } from "./line.service";
import { CreateLineArgs } from "./CreateLineArgs";
import { UpdateLineArgs } from "./UpdateLineArgs";
import { DeleteLineArgs } from "./DeleteLineArgs";
import { FindManyLineArgs } from "./FindManyLineArgs";
import { FindOneLineArgs } from "./FindOneLineArgs";
import { Line } from "./Line";
import { Step } from "../step/Step";

@graphql.Resolver(() => Line)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LineResolver {
  constructor(
    private readonly service: LineService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Line])
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "read",
    possession: "any",
  })
  async lines(
    @graphql.Args() args: FindManyLineArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Line[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Line",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Line, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "read",
    possession: "own",
  })
  async line(
    @graphql.Args() args: FindOneLineArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Line | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Line",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Line)
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "create",
    possession: "any",
  })
  async createLine(
    @graphql.Args() args: CreateLineArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Line> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Line",
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
        `providing the properties: ${properties} on ${"Line"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        step: args.data.step
          ? {
              connect: args.data.step,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Line)
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "update",
    possession: "any",
  })
  async updateLine(
    @graphql.Args() args: UpdateLineArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Line | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Line",
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
        `providing the properties: ${properties} on ${"Line"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          step: args.data.step
            ? {
                connect: args.data.step,
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

  @graphql.Mutation(() => Line)
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "delete",
    possession: "any",
  })
  async deleteLine(@graphql.Args() args: DeleteLineArgs): Promise<Line | null> {
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

  @graphql.ResolveField(() => Step, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "read",
    possession: "any",
  })
  async step(
    @graphql.Parent() parent: Line,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Step | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Step",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .step();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
