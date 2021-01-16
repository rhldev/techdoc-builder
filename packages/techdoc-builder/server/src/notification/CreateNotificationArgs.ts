import { ArgsType, Field } from "@nestjs/graphql";
import { NotificationCreateInput } from "./NotificationCreateInput";

@ArgsType()
class CreateNotificationArgs {
  @Field(() => NotificationCreateInput, { nullable: false })
  data!: NotificationCreateInput;
}

export { CreateNotificationArgs };
