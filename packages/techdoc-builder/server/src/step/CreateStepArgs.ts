import { ArgsType, Field } from "@nestjs/graphql";
import { StepCreateInput } from "./StepCreateInput";

@ArgsType()
class CreateStepArgs {
  @Field(() => StepCreateInput, { nullable: false })
  data!: StepCreateInput;
}

export { CreateStepArgs };
