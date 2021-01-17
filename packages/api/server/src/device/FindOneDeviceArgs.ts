import { ArgsType, Field } from "@nestjs/graphql";
import { DeviceWhereUniqueInput } from "./DeviceWhereUniqueInput";

@ArgsType()
class FindOneDeviceArgs {
  @Field(() => DeviceWhereUniqueInput, { nullable: false })
  where!: DeviceWhereUniqueInput;
}

export { FindOneDeviceArgs };
