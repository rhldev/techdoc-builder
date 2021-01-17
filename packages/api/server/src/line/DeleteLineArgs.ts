import { ArgsType, Field } from "@nestjs/graphql";
import { LineWhereUniqueInput } from "./LineWhereUniqueInput";

@ArgsType()
class DeleteLineArgs {
  @Field(() => LineWhereUniqueInput, { nullable: false })
  where!: LineWhereUniqueInput;
}

export { DeleteLineArgs };
