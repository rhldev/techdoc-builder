import { ArgsType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";

@ArgsType()
class FindOneNotificationArgs {
  @Field(() => NotificationWhereUniqueInput, { nullable: false })
  where!: NotificationWhereUniqueInput;
}

export { FindOneNotificationArgs };
