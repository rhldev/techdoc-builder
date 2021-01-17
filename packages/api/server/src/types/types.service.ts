import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTypesArgs,
  FindManyTypesArgs,
  TypesCreateArgs,
  TypesUpdateArgs,
  TypesDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TypesService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTypesArgs>(args: Subset<T, FindManyTypesArgs>) {
    return this.prisma.types.findMany(args);
  }
  findOne<T extends FindOneTypesArgs>(args: Subset<T, FindOneTypesArgs>) {
    return this.prisma.types.findOne(args);
  }
  create<T extends TypesCreateArgs>(args: Subset<T, TypesCreateArgs>) {
    return this.prisma.types.create<T>(args);
  }
  update<T extends TypesUpdateArgs>(args: Subset<T, TypesUpdateArgs>) {
    return this.prisma.types.update<T>(args);
  }
  delete<T extends TypesDeleteArgs>(args: Subset<T, TypesDeleteArgs>) {
    return this.prisma.types.delete(args);
  }
}
