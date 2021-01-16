import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { TypesService } from "./types.service";
import { TypesCreateInput } from "./TypesCreateInput";
import { TypesWhereInput } from "./TypesWhereInput";
import { TypesWhereUniqueInput } from "./TypesWhereUniqueInput";
import { TypesUpdateInput } from "./TypesUpdateInput";
import { Types } from "./Types";

@swagger.ApiBasicAuth()
@swagger.ApiTags("types")
@common.Controller("types")
export class TypesController {
  constructor(
    private readonly service: TypesService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Types })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: TypesCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Types> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Types",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Types"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Types] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: TypesWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Types[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Types",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Types })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: TypesWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Types | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Types",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Types })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: TypesWhereUniqueInput,
    @common.Body()
    data: TypesUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Types | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Types",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Types"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Types",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Types })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: TypesWhereUniqueInput
  ): Promise<Types | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}