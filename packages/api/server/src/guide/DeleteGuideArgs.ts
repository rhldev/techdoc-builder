import { ArgsType, Field } from "@nestjs/graphql";
import { GuideWhereUniqueInput } from "./GuideWhereUniqueInput";

@ArgsType()
class DeleteGuideArgs {
  @Field(() => GuideWhereUniqueInput, { nullable: false })
  where!: GuideWhereUniqueInput;
}

export { DeleteGuideArgs };
