import { ArgsType, Field } from "@nestjs/graphql";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";

@ArgsType()
class FindOneCategoryArgs {
  @Field(() => CategoryWhereUniqueInput, { nullable: false })
  where!: CategoryWhereUniqueInput;
}

export { FindOneCategoryArgs };
