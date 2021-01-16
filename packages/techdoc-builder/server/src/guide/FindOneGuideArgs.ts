import { ArgsType, Field } from "@nestjs/graphql";
import { GuideWhereUniqueInput } from "./GuideWhereUniqueInput";

@ArgsType()
class FindOneGuideArgs {
  @Field(() => GuideWhereUniqueInput, { nullable: false })
  where!: GuideWhereUniqueInput;
}

export { FindOneGuideArgs };
