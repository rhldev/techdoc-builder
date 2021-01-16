import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class ApprovalsUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  changeData?: string;
  @ApiProperty({
    required: false,
    type: GuideWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GuideWhereUniqueInput)
  @IsOptional()
  @Field(() => GuideWhereUniqueInput, {
    nullable: true,
  })
  guide?: GuideWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  originalData?: string;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  owner?: UserWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  requestor?: UserWhereUniqueInput;
}
export { ApprovalsUpdateInput };
