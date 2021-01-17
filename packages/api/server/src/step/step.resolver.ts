import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { StepService } from "./step.service";
import { CreateStepArgs } from "./CreateStepArgs";
import { UpdateStepArgs } from "./UpdateStepArgs";
import { DeleteStepArgs } from "./DeleteStepArgs";
import { FindManyStepArgs } from "./FindManyStepArgs";
import { FindOneStepArgs } from "./FindOneStepArgs";
import { Step } from "./Step";
import { Guide } from "../guide/Guide";

@graphql.Resolver(() => Step)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StepResolver {
  constructor(
    private readonly service: StepService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Step])
  @nestAccessControl.UseRoles({
    resource: "Step",
    action: "read",
    possession: "any",
  })
  async steps(
    @graphql.Args() args: FindManyStepArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Step[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Step",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Step, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Step",
    action: "read",
    possession: "own",
  })
  async step(
    @graphql.Args() args: FindOneStepArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Step | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Step",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Step)
  @nestAccessControl.UseRoles({
    resource: "Step",
    action: "create",
    possession: "any",
  })
  async createStep(
    @graphql.Args() args: CreateStepArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Step> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Step",
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
        `providing the properties: ${properties} on ${"Step"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        guide: args.data.guide
          ? {
              connect: args.data.guide,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Step)
  @nestAccessControl.UseRoles({
    resource: "Step",
    action: "update",
    possession: "any",
  })
  async updateStep(
    @graphql.Args() args: UpdateStepArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Step | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Step",
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
        `providing the properties: ${properties} on ${"Step"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          guide: args.data.guide
            ? {
                connect: args.data.guide,
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

  @graphql.Mutation(() => Step)
  @nestAccessControl.UseRoles({
    resource: "Step",
    action: "delete",
    possession: "any",
  })
  async deleteStep(@graphql.Args() args: DeleteStepArgs): Promise<Step | null> {
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
    resource: "Step",
    action: "read",
    possession: "any",
  })
  async guide(
    @graphql.Parent() parent: Step,
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
}
