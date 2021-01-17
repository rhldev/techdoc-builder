import { ArgsType, Field } from "@nestjs/graphql";
import { ApprovalsCreateInput } from "./ApprovalsCreateInput";

@ArgsType()
class CreateApprovalsArgs {
  @Field(() => ApprovalsCreateInput, { nullable: false })
  data!: ApprovalsCreateInput;
}

export { CreateApprovalsArgs };
