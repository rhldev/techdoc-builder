import { ArgsType, Field } from "@nestjs/graphql";
import { TypesWhereUniqueInput } from "./TypesWhereUniqueInput";

@ArgsType()
class FindOneTypesArgs {
  @Field(() => TypesWhereUniqueInput, { nullable: false })
  where!: TypesWhereUniqueInput;
}

export { FindOneTypesArgs };
