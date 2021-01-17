import { ArgsType, Field } from "@nestjs/graphql";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";
import { CategoryUpdateInput } from "./CategoryUpdateInput";

@ArgsType()
class UpdateCategoryArgs {
  @Field(() => CategoryWhereUniqueInput, { nullable: false })
  where!: CategoryWhereUniqueInput;
  @Field(() => CategoryUpdateInput, { nullable: false })
  data!: CategoryUpdateInput;
}

export { UpdateCategoryArgs };
