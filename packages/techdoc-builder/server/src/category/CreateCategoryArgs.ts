import { ArgsType, Field } from "@nestjs/graphql";
import { CategoryCreateInput } from "./CategoryCreateInput";

@ArgsType()
class CreateCategoryArgs {
  @Field(() => CategoryCreateInput, { nullable: false })
  data!: CategoryCreateInput;
}

export { CreateCategoryArgs };
