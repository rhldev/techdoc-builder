import { ArgsType, Field } from "@nestjs/graphql";
import { GuideWhereInput } from "./GuideWhereInput";

@ArgsType()
class FindManyGuideArgs {
  @Field(() => GuideWhereInput, { nullable: true })
  where?: GuideWhereInput;
}

export { FindManyGuideArgs };
