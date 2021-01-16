import { ArgsType, Field } from "@nestjs/graphql";
import { LineWhereInput } from "./LineWhereInput";

@ArgsType()
class FindManyLineArgs {
  @Field(() => LineWhereInput, { nullable: true })
  where?: LineWhereInput;
}

export { FindManyLineArgs };
