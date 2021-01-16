import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneLineArgs,
  FindManyLineArgs,
  LineCreateArgs,
  LineUpdateArgs,
  LineDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class LineService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyLineArgs>(args: Subset<T, FindManyLineArgs>) {
    return this.prisma.line.findMany(args);
  }
  findOne<T extends FindOneLineArgs>(args: Subset<T, FindOneLineArgs>) {
    return this.prisma.line.findOne(args);
  }
  create<T extends LineCreateArgs>(args: Subset<T, LineCreateArgs>) {
    return this.prisma.line.create<T>(args);
  }
  update<T extends LineUpdateArgs>(args: Subset<T, LineUpdateArgs>) {
    return this.prisma.line.update<T>(args);
  }
  delete<T extends LineDeleteArgs>(args: Subset<T, LineDeleteArgs>) {
    return this.prisma.line.delete(args);
  }
}
