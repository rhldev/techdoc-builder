import { ArgsType, Field } from "@nestjs/graphql";
import { GuideCreateInput } from "./GuideCreateInput";

@ArgsType()
class CreateGuideArgs {
  @Field(() => GuideCreateInput, { nullable: false })
  data!: GuideCreateInput;
}

export { CreateGuideArgs };
