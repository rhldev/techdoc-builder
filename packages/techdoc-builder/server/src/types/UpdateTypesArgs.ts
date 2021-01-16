import { ArgsType, Field } from "@nestjs/graphql";
import { TypesWhereUniqueInput } from "./TypesWhereUniqueInput";
import { TypesUpdateInput } from "./TypesUpdateInput";

@ArgsType()
class UpdateTypesArgs {
  @Field(() => TypesWhereUniqueInput, { nullable: false })
  where!: TypesWhereUniqueInput;
  @Field(() => TypesUpdateInput, { nullable: false })
  data!: TypesUpdateInput;
}

export { UpdateTypesArgs };
