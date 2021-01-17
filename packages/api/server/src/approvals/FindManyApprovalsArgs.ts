import { ArgsType, Field } from "@nestjs/graphql";
import { ApprovalsWhereInput } from "./ApprovalsWhereInput";

@ArgsType()
class FindManyApprovalsArgs {
  @Field(() => ApprovalsWhereInput, { nullable: true })
  where?: ApprovalsWhereInput;
}

export { FindManyApprovalsArgs };
