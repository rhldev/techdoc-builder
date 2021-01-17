import { ArgsType, Field } from "@nestjs/graphql";
import { ApprovalsWhereUniqueInput } from "./ApprovalsWhereUniqueInput";
import { ApprovalsUpdateInput } from "./ApprovalsUpdateInput";

@ArgsType()
class UpdateApprovalsArgs {
  @Field(() => ApprovalsWhereUniqueInput, { nullable: false })
  where!: ApprovalsWhereUniqueInput;
  @Field(() => ApprovalsUpdateInput, { nullable: false })
  data!: ApprovalsUpdateInput;
}

export { UpdateApprovalsArgs };
