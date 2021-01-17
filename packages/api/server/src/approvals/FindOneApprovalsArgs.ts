import { ArgsType, Field } from "@nestjs/graphql";
import { ApprovalsWhereUniqueInput } from "./ApprovalsWhereUniqueInput";

@ArgsType()
class FindOneApprovalsArgs {
  @Field(() => ApprovalsWhereUniqueInput, { nullable: false })
  where!: ApprovalsWhereUniqueInput;
}

export { FindOneApprovalsArgs };
