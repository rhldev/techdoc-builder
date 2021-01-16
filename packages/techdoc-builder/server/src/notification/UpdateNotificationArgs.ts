import { ArgsType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";
import { NotificationUpdateInput } from "./NotificationUpdateInput";

@ArgsType()
class UpdateNotificationArgs {
  @Field(() => NotificationWhereUniqueInput, { nullable: false })
  where!: NotificationWhereUniqueInput;
  @Field(() => NotificationUpdateInput, { nullable: false })
  data!: NotificationUpdateInput;
}

export { UpdateNotificationArgs };
