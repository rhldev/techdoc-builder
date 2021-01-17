import { ArgsType, Field } from "@nestjs/graphql";
import { TypesWhereInput } from "./TypesWhereInput";

@ArgsType()
class FindManyTypesArgs {
  @Field(() => TypesWhereInput, { nullable: true })
  where?: TypesWhereInput;
}

export { FindManyTypesArgs };
