import { ArgsType, Field } from "@nestjs/graphql";
import { DeviceCreateInput } from "./DeviceCreateInput";

@ArgsType()
class CreateDeviceArgs {
  @Field(() => DeviceCreateInput, { nullable: false })
  data!: DeviceCreateInput;
}

export { CreateDeviceArgs };
