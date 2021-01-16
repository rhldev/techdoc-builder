import { ArgsType, Field } from "@nestjs/graphql";
import { ApprovalsWhereUniqueInput } from "./ApprovalsWhereUniqueInput";

@ArgsType()
class DeleteApprovalsArgs {
  @Field(() => ApprovalsWhereUniqueInput, { nullable: false })
  where!: ApprovalsWhereUniqueInput;
}

export { DeleteApprovalsArgs };
