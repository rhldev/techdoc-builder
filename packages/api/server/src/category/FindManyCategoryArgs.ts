import { ArgsType, Field } from "@nestjs/graphql";
import { CategoryWhereInput } from "./CategoryWhereInput";

@ArgsType()
class FindManyCategoryArgs {
  @Field(() => CategoryWhereInput, { nullable: true })
  where?: CategoryWhereInput;
}

export { FindManyCategoryArgs };
