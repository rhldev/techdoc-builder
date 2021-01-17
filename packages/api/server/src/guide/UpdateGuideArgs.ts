import { ArgsType, Field } from "@nestjs/graphql";
import { GuideWhereUniqueInput } from "./GuideWhereUniqueInput";
import { GuideUpdateInput } from "./GuideUpdateInput";

@ArgsType()
class UpdateGuideArgs {
  @Field(() => GuideWhereUniqueInput, { nullable: false })
  where!: GuideWhereUniqueInput;
  @Field(() => GuideUpdateInput, { nullable: false })
  data!: GuideUpdateInput;
}

export { UpdateGuideArgs };
