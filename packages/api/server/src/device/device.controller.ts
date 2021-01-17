import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { DeviceService } from "./device.service";
import { DeviceCreateInput } from "./DeviceCreateInput";
import { DeviceWhereInput } from "./DeviceWhereInput";
import { DeviceWhereUniqueInput } from "./DeviceWhereUniqueInput";
import { DeviceUpdateInput } from "./DeviceUpdateInput";
import { Device } from "./Device";

@swagger.ApiBasicAuth()
@swagger.ApiTags("devices")
@common.Controller("devices")
export class DeviceController {
  constructor(
    private readonly service: DeviceService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Device",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Device })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: DeviceCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Device> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Device",
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
        `providing the properties: ${properties} on ${"Device"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        category: {
          connect: data.category,
        },
      },
      select: {
        id: true,
        createdAt: true,
        name: true,
        updatedAt: true,

        category: {
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
    resource: "Device",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Device] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: DeviceWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Device[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Device",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        id: true,
        createdAt: true,
        name: true,
        updatedAt: true,

        category: {
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
    resource: "Device",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Device })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: DeviceWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Device | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Device",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        id: true,
        createdAt: true,
        name: true,
        updatedAt: true,

        category: {
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
    resource: "Device",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Device })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: DeviceWhereUniqueInput,
    @common.Body()
    data: DeviceUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Device | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Device",
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
        `providing the properties: ${properties} on ${"Device"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          category: {
            connect: data.category,
          },
        },
        select: {
          id: true,
          createdAt: true,
          name: true,
          updatedAt: true,

          category: {
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
    resource: "Device",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Device })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: DeviceWhereUniqueInput
  ): Promise<Device | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          id: true,
          createdAt: true,
          name: true,
          updatedAt: true,

          category: {
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
