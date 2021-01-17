import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneApprovalsArgs,
  FindManyApprovalsArgs,
  ApprovalsCreateArgs,
  ApprovalsUpdateArgs,
  ApprovalsDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class ApprovalsService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyApprovalsArgs>(
    args: Subset<T, FindManyApprovalsArgs>
  ) {
    return this.prisma.approvals.findMany(args);
  }
  findOne<T extends FindOneApprovalsArgs>(
    args: Subset<T, FindOneApprovalsArgs>
  ) {
    return this.prisma.approvals.findOne(args);
  }
  create<T extends ApprovalsCreateArgs>(args: Subset<T, ApprovalsCreateArgs>) {
    return this.prisma.approvals.create<T>(args);
  }
  update<T extends ApprovalsUpdateArgs>(args: Subset<T, ApprovalsUpdateArgs>) {
    return this.prisma.approvals.update<T>(args);
  }
  delete<T extends ApprovalsDeleteArgs>(args: Subset<T, ApprovalsDeleteArgs>) {
    return this.prisma.approvals.delete(args);
  }
}
