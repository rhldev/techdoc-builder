import { ArgsType, Field } from "@nestjs/graphql";
import { StepWhereInput } from "./StepWhereInput";

@ArgsType()
class FindManyStepArgs {
  @Field(() => StepWhereInput, { nullable: true })
  where?: StepWhereInput;
}

export { FindManyStepArgs };
