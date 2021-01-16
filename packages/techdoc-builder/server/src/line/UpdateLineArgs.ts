import { ArgsType, Field } from "@nestjs/graphql";
import { LineWhereUniqueInput } from "./LineWhereUniqueInput";
import { LineUpdateInput } from "./LineUpdateInput";

@ArgsType()
class UpdateLineArgs {
  @Field(() => LineWhereUniqueInput, { nullable: false })
  where!: LineWhereUniqueInput;
  @Field(() => LineUpdateInput, { nullable: false })
  data!: LineUpdateInput;
}

export { UpdateLineArgs };
