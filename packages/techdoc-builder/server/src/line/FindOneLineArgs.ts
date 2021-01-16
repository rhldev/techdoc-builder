import { ArgsType, Field } from "@nestjs/graphql";
import { LineWhereUniqueInput } from "./LineWhereUniqueInput";

@ArgsType()
class FindOneLineArgs {
  @Field(() => LineWhereUniqueInput, { nullable: false })
  where!: LineWhereUniqueInput;
}

export { FindOneLineArgs };
