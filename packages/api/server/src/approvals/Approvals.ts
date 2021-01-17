import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@ObjectType()
class Approvals {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  changeData!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: GuideWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GuideWhereUniqueInput)
  guide!: GuideWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
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
  owner!: UserWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  requestor!: UserWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Approvals };
