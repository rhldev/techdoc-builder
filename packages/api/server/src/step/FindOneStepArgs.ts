import { ArgsType, Field } from "@nestjs/graphql";
import { StepWhereUniqueInput } from "./StepWhereUniqueInput";

@ArgsType()
class FindOneStepArgs {
  @Field(() => StepWhereUniqueInput, { nullable: false })
  where!: StepWhereUniqueInput;
}

export { FindOneStepArgs };
