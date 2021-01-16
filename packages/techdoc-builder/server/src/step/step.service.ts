import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneStepArgs,
  FindManyStepArgs,
  StepCreateArgs,
  StepUpdateArgs,
  StepDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class StepService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyStepArgs>(args: Subset<T, FindManyStepArgs>) {
    return this.prisma.step.findMany(args);
  }
  findOne<T extends FindOneStepArgs>(args: Subset<T, FindOneStepArgs>) {
    return this.prisma.step.findOne(args);
  }
  create<T extends StepCreateArgs>(args: Subset<T, StepCreateArgs>) {
    return this.prisma.step.create<T>(args);
  }
  update<T extends StepUpdateArgs>(args: Subset<T, StepUpdateArgs>) {
    return this.prisma.step.update<T>(args);
  }
  delete<T extends StepDeleteArgs>(args: Subset<T, StepDeleteArgs>) {
    return this.prisma.step.delete(args);
  }
}
