import { ArgsType, Field } from "@nestjs/graphql";
import { DeviceWhereUniqueInput } from "./DeviceWhereUniqueInput";
import { DeviceUpdateInput } from "./DeviceUpdateInput";

@ArgsType()
class UpdateDeviceArgs {
  @Field(() => DeviceWhereUniqueInput, { nullable: false })
  where!: DeviceWhereUniqueInput;
  @Field(() => DeviceUpdateInput, { nullable: false })
  data!: DeviceUpdateInput;
}

export { UpdateDeviceArgs };
