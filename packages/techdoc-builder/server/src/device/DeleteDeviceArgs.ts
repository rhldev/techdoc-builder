import { ArgsType, Field } from "@nestjs/graphql";
import { DeviceWhereUniqueInput } from "./DeviceWhereUniqueInput";

@ArgsType()
class DeleteDeviceArgs {
  @Field(() => DeviceWhereUniqueInput, { nullable: false })
  where!: DeviceWhereUniqueInput;
}

export { DeleteDeviceArgs };
