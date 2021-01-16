import { ArgsType, Field } from "@nestjs/graphql";
import { StepWhereUniqueInput } from "./StepWhereUniqueInput";

@ArgsType()
class DeleteStepArgs {
  @Field(() => StepWhereUniqueInput, { nullable: false })
  where!: StepWhereUniqueInput;
}

export { DeleteStepArgs };
