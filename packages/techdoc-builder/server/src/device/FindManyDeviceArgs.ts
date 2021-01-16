import { ArgsType, Field } from "@nestjs/graphql";
import { DeviceWhereInput } from "./DeviceWhereInput";

@ArgsType()
class FindManyDeviceArgs {
  @Field(() => DeviceWhereInput, { nullable: true })
  where?: DeviceWhereInput;
}

export { FindManyDeviceArgs };
