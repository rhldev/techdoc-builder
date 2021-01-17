import { ArgsType, Field } from "@nestjs/graphql";
import { TypesWhereUniqueInput } from "./TypesWhereUniqueInput";

@ArgsType()
class DeleteTypesArgs {
  @Field(() => TypesWhereUniqueInput, { nullable: false })
  where!: TypesWhereUniqueInput;
}

export { DeleteTypesArgs };
