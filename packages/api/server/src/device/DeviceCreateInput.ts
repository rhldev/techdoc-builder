import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class DeviceCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
    type: CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @Field(() => CategoryWhereUniqueInput)
  category!: CategoryWhereUniqueInput;
}
export { DeviceCreateInput };
