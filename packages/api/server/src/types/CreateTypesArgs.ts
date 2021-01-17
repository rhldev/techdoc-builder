import { ArgsType, Field } from "@nestjs/graphql";
import { TypesCreateInput } from "./TypesCreateInput";

@ArgsType()
class CreateTypesArgs {
  @Field(() => TypesCreateInput, { nullable: false })
  data!: TypesCreateInput;
}

export { CreateTypesArgs };
