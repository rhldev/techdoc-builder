import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class ApprovalsCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  changeData!: string;
  @ApiProperty({
    required: true,
    type: GuideWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GuideWhereUniqueInput)
  @Field(() => GuideWhereUniqueInput)
  guide!: GuideWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  originalData!: string;
  @ApiProperty({
    required: true,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput)
  owner!: UserWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput)
  requestor!: UserWhereUniqueInput;
}
export { ApprovalsCreateInput };
