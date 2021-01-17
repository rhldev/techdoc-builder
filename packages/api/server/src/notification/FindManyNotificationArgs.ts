import { ArgsType, Field } from "@nestjs/graphql";
import { NotificationWhereInput } from "./NotificationWhereInput";

@ArgsType()
class FindManyNotificationArgs {
  @Field(() => NotificationWhereInput, { nullable: true })
  where?: NotificationWhereInput;
}

export { FindManyNotificationArgs };
