import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneNotificationArgs,
  FindManyNotificationArgs,
  NotificationCreateArgs,
  NotificationUpdateArgs,
  NotificationDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyNotificationArgs>(
    args: Subset<T, FindManyNotificationArgs>
  ) {
    return this.prisma.notification.findMany(args);
  }
  findOne<T extends FindOneNotificationArgs>(
    args: Subset<T, FindOneNotificationArgs>
  ) {
    return this.prisma.notification.findOne(args);
  }
  create<T extends NotificationCreateArgs>(
    args: Subset<T, NotificationCreateArgs>
  ) {
    return this.prisma.notification.create<T>(args);
  }
  update<T extends NotificationUpdateArgs>(
    args: Subset<T, NotificationUpdateArgs>
  ) {
    return this.prisma.notification.update<T>(args);
  }
  delete<T extends NotificationDeleteArgs>(
    args: Subset<T, NotificationDeleteArgs>
  ) {
    return this.prisma.notification.delete(args);
  }
}
