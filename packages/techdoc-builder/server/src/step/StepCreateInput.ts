import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class StepCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string | null;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  orderBy!: number;
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
  guide?: GuideWhereUniqueInput | null;
}
export { StepCreateInput };
