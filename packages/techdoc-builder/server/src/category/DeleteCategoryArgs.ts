import { ArgsType, Field } from "@nestjs/graphql";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";

@ArgsType()
class DeleteCategoryArgs {
  @Field(() => CategoryWhereUniqueInput, { nullable: false })
  where!: CategoryWhereUniqueInput;
}

export { DeleteCategoryArgs };
