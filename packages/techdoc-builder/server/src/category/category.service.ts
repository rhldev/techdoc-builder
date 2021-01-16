import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneCategoryArgs,
  FindManyCategoryArgs,
  CategoryCreateArgs,
  CategoryUpdateArgs,
  CategoryDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyCategoryArgs>(
    args: Subset<T, FindManyCategoryArgs>
  ) {
    return this.prisma.category.findMany(args);
  }
  findOne<T extends FindOneCategoryArgs>(args: Subset<T, FindOneCategoryArgs>) {
    return this.prisma.category.findOne(args);
  }
  create<T extends CategoryCreateArgs>(args: Subset<T, CategoryCreateArgs>) {
    return this.prisma.category.create<T>(args);
  }
  update<T extends CategoryUpdateArgs>(args: Subset<T, CategoryUpdateArgs>) {
    return this.prisma.category.update<T>(args);
  }
  delete<T extends CategoryDeleteArgs>(args: Subset<T, CategoryDeleteArgs>) {
    return this.prisma.category.delete(args);
  }
}
