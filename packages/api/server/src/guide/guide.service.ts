import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneGuideArgs,
  FindManyGuideArgs,
  GuideCreateArgs,
  GuideUpdateArgs,
  GuideDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class GuideService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyGuideArgs>(args: Subset<T, FindManyGuideArgs>) {
    return this.prisma.guide.findMany(args);
  }
  findOne<T extends FindOneGuideArgs>(args: Subset<T, FindOneGuideArgs>) {
    return this.prisma.guide.findOne(args);
  }
  create<T extends GuideCreateArgs>(args: Subset<T, GuideCreateArgs>) {
    return this.prisma.guide.create<T>(args);
  }
  update<T extends GuideUpdateArgs>(args: Subset<T, GuideUpdateArgs>) {
    return this.prisma.guide.update<T>(args);
  }
  delete<T extends GuideDeleteArgs>(args: Subset<T, GuideDeleteArgs>) {
    return this.prisma.guide.delete(args);
  }
}
