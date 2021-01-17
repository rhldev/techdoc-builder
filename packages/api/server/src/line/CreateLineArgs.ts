import { ArgsType, Field } from "@nestjs/graphql";
import { LineCreateInput } from "./LineCreateInput";

@ArgsType()
class CreateLineArgs {
  @Field(() => LineCreateInput, { nullable: false })
  data!: LineCreateInput;
}

export { CreateLineArgs };
