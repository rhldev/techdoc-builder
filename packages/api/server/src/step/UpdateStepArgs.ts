import { ArgsType, Field } from "@nestjs/graphql";
import { StepWhereUniqueInput } from "./StepWhereUniqueInput";
import { StepUpdateInput } from "./StepUpdateInput";

@ArgsType()
class UpdateStepArgs {
  @Field(() => StepWhereUniqueInput, { nullable: false })
  where!: StepWhereUniqueInput;
  @Field(() => StepUpdateInput, { nullable: false })
  data!: StepUpdateInput;
}

export { UpdateStepArgs };
