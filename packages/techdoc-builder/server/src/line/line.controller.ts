import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { LineService } from "./line.service";
import { LineCreateInput } from "./LineCreateInput";
import { LineWhereInput } from "./LineWhereInput";
import { LineWhereUniqueInput } from "./LineWhereUniqueInput";
import { LineUpdateInput } from "./LineUpdateInput";
import { Line } from "./Line";

@swagger.ApiBasicAuth()
@swagger.ApiTags("lines")
@common.Controller("lines")
export class LineController {
  constructor(
    private readonly service: LineService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Line })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: LineCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Line> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Line",
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
        `providing the properties: ${properties} on ${"Line"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        step: data.step
          ? {
              connect: data.step,
            }
          : undefined,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        text: true,
        bullet: true,
        level: true,
        orderBy: true,

        step: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Line] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: LineWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Line[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Line",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        text: true,
        bullet: true,
        level: true,
        orderBy: true,

        step: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Line",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Line })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: LineWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Line | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Line",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        text: true,
        bullet: true,
        level: true,
        orderBy: true,

        step: {
          select: {
            id: true,
          },
        },
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
    resource: "Line",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Line })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: LineWhereUniqueInput,
    @common.Body()
    data: LineUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Line | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Line",
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
        `providing the properties: ${properties} on ${"Line"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          step: data.step
            ? {
                connect: data.step,
              }
            : undefined,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          text: true,
          bullet: true,
          level: true,
          orderBy: true,

          step: {
            select: {
              id: true,
            },
          },
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
    resource: "Line",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Line })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: LineWhereUniqueInput
  ): Promise<Line | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          text: true,
          bullet: true,
          level: true,
          orderBy: true,

          step: {
            select: {
              id: true,
            },
          },
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
