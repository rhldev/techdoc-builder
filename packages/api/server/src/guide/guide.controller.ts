import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { GuideService } from "./guide.service";
import { GuideCreateInput } from "./GuideCreateInput";
import { GuideWhereInput } from "./GuideWhereInput";
import { GuideWhereUniqueInput } from "./GuideWhereUniqueInput";
import { GuideUpdateInput } from "./GuideUpdateInput";
import { Guide } from "./Guide";

@swagger.ApiBasicAuth()
@swagger.ApiTags("guides")
@common.Controller("guides")
export class GuideController {
  constructor(
    private readonly service: GuideService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Guide",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Guide })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: GuideCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Guide> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Guide",
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
        `providing the properties: ${properties} on ${"Guide"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        category: data.category
          ? {
              connect: data.category,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,

        device: data.device
          ? {
              connect: data.device,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        obsolete: true,
        title: true,
        conclusion: true,
        publishedOn: true,
        introduction: true,
        type: true,

        category: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },

        device: {
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
    resource: "Guide",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Guide] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: GuideWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Guide[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Guide",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        obsolete: true,
        title: true,
        conclusion: true,
        publishedOn: true,
        introduction: true,
        type: true,

        category: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },

        device: {
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
    resource: "Guide",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Guide })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: GuideWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Guide | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Guide",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        obsolete: true,
        title: true,
        conclusion: true,
        publishedOn: true,
        introduction: true,
        type: true,

        category: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },

        device: {
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
    resource: "Guide",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Guide })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: GuideWhereUniqueInput,
    @common.Body()
    data: GuideUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Guide | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Guide",
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
        `providing the properties: ${properties} on ${"Guide"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          category: data.category
            ? {
                connect: data.category,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,

          device: data.device
            ? {
                connect: data.device,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
          obsolete: true,
          title: true,
          conclusion: true,
          publishedOn: true,
          introduction: true,
          type: true,

          category: {
            select: {
              id: true,
            },
          },

          user: {
            select: {
              id: true,
            },
          },

          device: {
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
    resource: "Guide",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Guide })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: GuideWhereUniqueInput
  ): Promise<Guide | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
          obsolete: true,
          title: true,
          conclusion: true,
          publishedOn: true,
          introduction: true,
          type: true,

          category: {
            select: {
              id: true,
            },
          },

          user: {
            select: {
              id: true,
            },
          },

          device: {
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
